"""unique_constraint_documents_name

Revision ID: 91ceec320e94
Revises: 
Create Date: 2026-05-26 20:10:10.885393

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '91ceec320e94'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Delete older duplicates, keeping the most recently updated row per name.
    op.execute("""
        DELETE FROM documents
        WHERE id NOT IN (
            SELECT DISTINCT ON (name) id
            FROM documents
            ORDER BY name, updated_at DESC
        )
    """)
    op.create_unique_constraint('uq_documents_name', 'documents', ['name'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint('uq_documents_name', 'documents', type_='unique')
