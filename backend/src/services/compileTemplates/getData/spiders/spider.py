from scrapy import Spider
from scrapy.loader import ItemLoader
from scrapy import signals
import mysql.connector
import uuid

from ..pipelines.addToDatabase.data.items import DataItem
from ..sql.createTables import createTables
# # Logi

# ? Aby log pojawił się w Graylog'u oraz w konsoli
# ? trzeba uzyc komendy:
# self.log("message")


# # Requests:

# ? http(url, callback, meta)
# ? zwykły request, najszybszy ze wszystkich
# self.http('http://example.com', self.callback, { 'category': category})

# # waitForSelector(url, callback, cssSelector, meta)
# ? gdy MAMY PEWNOŚĆ, ze cssSelector pojawi się na stronie
# self.waitForSelector('http://example.com', self.callback, '.products', { 'category': category})


class @spiderName(Spider):
    name = "@spiderName"
    custom_settings = {
        'DOWNLOAD_TIMEOUT': 3,
        'RETRY_TIMES': 0,
    }
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        passwd='ae321321',
        database='bots',
        buffered=True
    )
    cursor = connection.cursor()

    startUrls = []
    # ? jeśli requestType = 'waitForSelector', to
    # ? potrzebny jest atrybut 'cssSelector':
    # cssSelector = 'div'
    requestType = '@requestType'
    # ? zbiera response z callback'a
    # ? aby później mieć dostęp do niego w "addToDatabase > def logs()"

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super(@spiderName, cls).from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider.spider_opened,
                                signal=signals.spider_opened)
        return spider

    def spider_opened(self):
        createTables(self)

    def callback(self, response):
        l = ItemLoader(item=DataItem(), response=response)
        l.add_value('itemId', 0)
        l.add_value('url', response.url)

        @elements
        yield l.load_item()
        self.spiderStatus(response)
