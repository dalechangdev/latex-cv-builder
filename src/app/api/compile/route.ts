import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { mkdtemp, writeFile, readFile, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  let { source } = await req.json().catch(() => ({}));

  if (typeof source !== "string" || !source.trim()) {
    return NextResponse.json({ error: "source is required" }, { status: 400 });
  }

  // Sanity-check: block shell-injection attempts in filenames/paths
  // (the LaTeX source itself is written to a temp file, not interpolated into a shell string)

  // Check pdflatex is available
  try {
    await execAsync("which pdflatex");
  } catch {
    return NextResponse.json(
      {
        error:
          "pdflatex is not installed on this server. " +
          "Install TeX Live (e.g. `brew install --cask mactex` on macOS) to enable PDF export.",
      },
      { status: 503 }
    );
  }

  // Write source to a temp directory and compile
  let workDir: string | null = null;
  try {
    workDir = await mkdtemp(join(tmpdir(), "resume-"));
    const texFile = join(workDir, "resume.tex");
    const pdfFile = join(workDir, "resume.pdf");

    await writeFile(texFile, source, "utf8");

    // Run pdflatex twice so cross-references resolve
    const cmd = `pdflatex -interaction=nonstopmode -output-directory="${workDir}" "${texFile}"`;
    await execAsync(cmd);
    await execAsync(cmd); // second pass

    const pdfBytes = await readFile(pdfFile);

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Extract the most useful part of the pdflatex log
    const match = msg.match(/l\.\d+.*|! .+/g);
    const detail = match ? match.slice(0, 5).join("\n") : msg;
    return NextResponse.json(
      { error: `Compilation failed:\n${detail}` },
      { status: 422 }
    );
  } finally {
    if (workDir) {
      await rm(workDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
