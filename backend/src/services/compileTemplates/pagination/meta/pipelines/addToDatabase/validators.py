from schematics.models import Model
from schematics.types import PolyModelType, FloatType, ModelType, URLType, StringType, UnionType, DictType, ListType, BaseType, UUIDType, IntType

# ? docs: https://schematics.readthedocs.io/en/latest/

class UrlItem(Model):
    itemId = IntType(required=True)
    url = URLType(required=True)