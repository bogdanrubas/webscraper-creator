from scrapy import Item, Field
from scrapy.loader.processors import Join, MapCompose, TakeFirst

# ? zmienne:
# ? @inputProcessor


def addWebsite(x):
    if x.find("http://topsecret.pl") == -1:
        return "http://topsecret.pl" + x
    else:
        return x

def removeWebsite(x):
    if x.find("http://topsecret.pl") != -1:
        return x.replace("http://topsecret.pl", "")
    else:
        return x

class UrlItem(Item):
    itemId = Field(
        input_processor=MapCompose(@inputProcessor),
        output_processor=TakeFirst(),
    )
    url = Field(
        input_processor=MapCompose(),
        output_processor=Join(),
    )