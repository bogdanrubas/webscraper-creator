from scrapy import Item, Field
from scrapy.loader.processors import Join, MapCompose, TakeFirst

def clear(x):
    return x.strip()

class CategoryNSNSNUItem(Item):
    itemId = Field(
        input_processor=MapCompose(),
        output_processor=TakeFirst(),
    )
    category = Field(
        input_processor=MapCompose(clear),
        output_processor=Join(),
    )
    s1Category = Field(
        input_processor=MapCompose(clear),
        output_processor=Join(),
    )
    s2Category = Field(
        input_processor=MapCompose(clear),
        output_processor=Join(),
    )
    url = Field(
        input_processor=MapCompose(clear),
        output_processor=Join(),
    )