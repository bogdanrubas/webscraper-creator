from schematics.models import Model
from schematics.types import PolyModelType, FloatType, ModelType, URLType, StringType, UnionType, DictType, ListType, BaseType, UUIDType, IntType

# ? docs: https://schematics.readthedocs.io/en/latest/


class CategoryNSNSNUItem(Model):
    itemId = IntType(required=True)
    category = StringType(required=True)
    s1Category = StringType(required=True)
    s2Category = StringType(required=True)
    url = StringType(required=True)