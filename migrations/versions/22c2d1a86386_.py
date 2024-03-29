"""empty message

Revision ID: 22c2d1a86386
Revises: 12da2c00226d
Create Date: 2024-03-09 11:32:35.331368

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22c2d1a86386'
down_revision = '12da2c00226d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('user_avatar_url_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_unique_constraint('user_avatar_url_key', ['avatar_url'])

    # ### end Alembic commands ###
