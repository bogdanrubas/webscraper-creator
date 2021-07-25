from scrapy import Spider
from scrapy.loader import ItemLoader
from scrapy import signals
import mysql.connector

from ..sql.addToDatabase.items import UrlItem
from ..sql.createTables import createTables

# ! zmienne w pliku:
# ? @spiderName
# ? @requestType
# ? @metaSelector
# ? @metaSelectorType
# ? @urlSuffix
# ? @metaValue



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
        pagesList = []
        metaSelector = '@metaSelector'
        urlSuffix = '@urlSuffix'

        meta = response.@metaSelectorType(metaSelector).get()

        if (meta == None):
            # TODO: trzeba zrobic walidacje
            # addError('', metaDataCss, logs, filePath, actualUrl)
            pass
        else:
            jsonData = json.loads(meta)
            if (jsonData['@metaValue'] != 0):
                itemIndex = -1
                for i in range(1, jsonData['@metaValue'] + 1):
                    itemIndex += 1
                    l = ItemLoader(item=UrlItem(), response=response)
                    l.add_value('itemId', itemIndex)
                    l.add_value('url', f'{response.url}{urlSuffix}{i}')
                    yield l.load_item()

        self.spiderStatus(response)
