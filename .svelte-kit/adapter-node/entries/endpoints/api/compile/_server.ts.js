import { exec } from "child_process";
import { mkdtemp, writeFile, readFile, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { promisify } from "util";
import { json } from "@sveltejs/kit";
const execAsync = promisify(exec);
const POST = async ({ request }) => {
  let source;
  try {
    ({ source } = await request.json());
  } catch {
    return json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (typeof source !== "string" || !source.trim()) {
    return json({ error: "source is required" }, { status: 400 });
  }
  try {
    await execAsync("which pdflatex");
  } catch {
    return json(
      {
        error: "pdflatex is not installed on this server. Install TeX Live (e.g. `brew install --cask mactex` on macOS) to enable PDF export."
      },
      { status: 503 }
    );
  }
  let workDir = null;
  try {
    workDir = await mkdtemp(join(tmpdir(), "resume-"));
    const texFile = join(workDir, "resume.tex");
    const pdfFile = join(workDir, "resume.pdf");
    await writeFile(texFile, source, "utf8");
    const cmd = `pdflatex -interaction=nonstopmode -output-directory="${workDir}" "${texFile}"`;
    await execAsync(cmd);
    await execAsync(cmd);
    const pdfBytes = await readFile(pdfFile);
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"'
      }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const match = msg.match(/l\.\d+.*|! .+/g);
    const detail = match ? match.slice(0, 5).join("\n") : msg;
    return json({ error: `Compilation failed:
${detail}` }, { status: 422 });
  } finally {
    if (workDir) {
      await rm(workDir, { recursive: true, force: true }).catch(() => {
      });
    }
  }
};
export {
  POST
};
