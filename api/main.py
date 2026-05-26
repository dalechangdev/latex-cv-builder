from contextlib import asynccontextmanager
from datetime import timezone

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, init_db
import models
from schemas import (
    DocumentCreate, DocumentUpdate, DocumentOut,
    SnippetCreate, SnippetUpdate, SnippetOut,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="LaTeX Resume API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Documents ─────────────────────────────────────────────────────────────────

@app.get("/documents", response_model=list[DocumentOut])
async def list_documents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Document).order_by(models.Document.updated_at.desc()))
    return result.scalars().all()


@app.post("/documents", response_model=DocumentOut, status_code=201)
async def create_document(body: DocumentCreate, db: AsyncSession = Depends(get_db)):
    doc = models.Document(name=body.name, source=body.source)
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return doc


@app.get("/documents/{doc_id}", response_model=DocumentOut)
async def get_document(doc_id: str, db: AsyncSession = Depends(get_db)):
    doc = await db.get(models.Document, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc


@app.patch("/documents/{doc_id}", response_model=DocumentOut)
async def update_document(doc_id: str, body: DocumentUpdate, db: AsyncSession = Depends(get_db)):
    doc = await db.get(models.Document, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    if body.name is not None:
        doc.name = body.name
    if body.source is not None:
        doc.source = body.source
    from datetime import datetime
    doc.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(doc)
    return doc


@app.delete("/documents/{doc_id}", status_code=204)
async def delete_document(doc_id: str, db: AsyncSession = Depends(get_db)):
    doc = await db.get(models.Document, doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    await db.delete(doc)
    await db.commit()


# ── Snippets ──────────────────────────────────────────────────────────────────

@app.get("/snippets", response_model=list[SnippetOut])
async def list_snippets(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Snippet).order_by(models.Snippet.updated_at.desc()))
    return result.scalars().all()


@app.post("/snippets", response_model=SnippetOut, status_code=201)
async def create_snippet(body: SnippetCreate, db: AsyncSession = Depends(get_db)):
    snippet = models.Snippet(name=body.name, content=body.content, description=body.description)
    db.add(snippet)
    await db.commit()
    await db.refresh(snippet)
    return snippet


@app.get("/snippets/{snippet_id}", response_model=SnippetOut)
async def get_snippet(snippet_id: str, db: AsyncSession = Depends(get_db)):
    snippet = await db.get(models.Snippet, snippet_id)
    if not snippet:
        raise HTTPException(status_code=404, detail="Snippet not found")
    return snippet


@app.patch("/snippets/{snippet_id}", response_model=SnippetOut)
async def update_snippet(snippet_id: str, body: SnippetUpdate, db: AsyncSession = Depends(get_db)):
    snippet = await db.get(models.Snippet, snippet_id)
    if not snippet:
        raise HTTPException(status_code=404, detail="Snippet not found")
    if body.name is not None:
        snippet.name = body.name
    if body.content is not None:
        snippet.content = body.content
    if body.description is not None:
        snippet.description = body.description
    from datetime import datetime
    snippet.updated_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(snippet)
    return snippet


@app.delete("/snippets/{snippet_id}", status_code=204)
async def delete_snippet(snippet_id: str, db: AsyncSession = Depends(get_db)):
    snippet = await db.get(models.Snippet, snippet_id)
    if not snippet:
        raise HTTPException(status_code=404, detail="Snippet not found")
    await db.delete(snippet)
    await db.commit()
