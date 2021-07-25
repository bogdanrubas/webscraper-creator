from scrapy import Item, Field
from scrapy.loader.processors import Join, MapCompose, TakeFirst

def addWebsite(x):
    # if x.find("/25488-broszka.html") == -1 and x.find("/25047-naszyjnik.html") == -1:
    #     return "http://sklep.dublon.pl" + x
    if x.find("http://sklep.dublon.pl") == -1:
        return "http://sklep.dublon.pl" + x
    else:
        return x

class UrlItem(Item):
    itemId = Field(
        input_processor=MapCompose(),
        output_processor=TakeFirst(),
    )
    url = Field(
        input_processor=MapCompose(),
        output_processor=Join(),
    )