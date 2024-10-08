"""empty message

Revision ID: 01739dd96348
Revises: d9f14a47a0fa
Create Date: 2024-09-06 13:16:46.994825

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '01739dd96348'
down_revision = 'd9f14a47a0fa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('role',
               existing_type=postgresql.ENUM('admin', 'usuario', name='role'),
               type_=sa.String(length=100),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('role',
               existing_type=sa.String(length=100),
               type_=postgresql.ENUM('admin', 'usuario', name='role'),
               existing_nullable=True)

    # ### end Alembic commands ###
