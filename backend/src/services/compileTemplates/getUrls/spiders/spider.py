from scrapy import Spider
from scrapy.loader import ItemLoader
from scrapy import signals
import mysql.connector

from ..sql.addToDatabase.items import UrlItem
from ..sql.createTables import createTables


class @spiderName(Spider):
    name = "@spiderName"
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        passwd='ae321321',
        database='bots',
        buffered=True
    )
    cursor = connection.cursor()

    startUrls = [
        'http://sklep.dublon.pl/category/produkty',
    ]
    requestType = '@requestType'
    depth = 0

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(@spiderName, cls).from_crawler(
            crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_opened,
                                signal=signals.spider_opened)
        return spider

    def spider_opened(self):
        createTables(self)

    def callback(self, response):
        urlsSelector = '@urlsSelector'
        urlSelector = '@urlSelector'
        urls = response.@urlsSelectorType(urlsSelector)

        if urls == []:
            self.selectorErrors.append('urls: not found')
        itemIndex = -1
        for url in urls:
            itemIndex += 1
            l = ItemLoader(item=UrlItem(), response=response)
            l.add_value('itemId', itemIndex)
            l.add_value('url', url.@urlSelectorType(urlSelector).get())
            yield l.load_item()

        self.spiderStatus(response)
