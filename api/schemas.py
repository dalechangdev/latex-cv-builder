from datetime import datetime
from pydantic import BaseModel


class DocumentCreate(BaseModel):
    name: str
    source: str


class DocumentUpdate(BaseModel):
    name: str | None = None
    source: str | None = None


class DocumentOut(BaseModel):
    id: str
    name: str
    source: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class SnippetCreate(BaseModel):
    name: str
    content: str
    description: str | None = None


class SnippetUpdate(BaseModel):
    name: str | None = None
    content: str | None = None
    description: str | None = None


class SnippetOut(BaseModel):
    id: str
    name: str
    content: str
    description: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
