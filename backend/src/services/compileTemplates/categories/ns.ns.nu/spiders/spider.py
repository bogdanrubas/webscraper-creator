from scrapy import Spider
from scrapy.loader import ItemLoader
from scrapy import signals
import mysql.connector

from ..sql.createTables import createTables
from ..sql.addToDatabase.items import CategoryNSNSNUItem
from .functions.@spiderName import @ spiderName


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
        'https://www.topsecret.pl/',
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
        categoriesSelector = '@categoriesSelector'
        categoryNameSelector = '@categoryNameSelector'
        categoryNameAcceptable = @categoryNameAcceptableList
        categoryNameException = @categoryNameExceptionList
        s1CategoriesSelector = '@s1CategoriesSelector'
        s1CategoryNameSelector = '@s1CategoryNameSelector'
        s1CategoryNameAcceptable = @s1CategoryNameAcceptableList
        s1CategoryNameException = @s1CategoryNameExceptionList
        s2CategoriesSelector = '@s2CategoriesSelector'
        s2CategoryNameSelector = '@s2CategoryNameSelector'
        s2CategoryNameAcceptable = @s2CategoryNameAcceptableList
        s2CategoryNameException = @s2CategoryNameExceptionList
        s2CategoryUrlSelector = '@s2CategoryUrlSelector'

        categories = @spiderName(
            response,
            self.selectorErrors,
            categoriesSelector,
            categoryNameSelector,
            categoryNameAcceptable,
            categoryNameException,
            s1CategoriesSelector,
            s1CategoryNameSelector,
            s1CategoryNameAcceptable,
            s1CategoryNameException,
            s2CategoriesSelector,
            s2CategoryNameSelector,
            s2CategoryNameAcceptable,
            s2CategoryNameException,
            s2CategoryUrlSelector
        )

        itemIndex = -1
        for category in categories:
            categoryName = category['name']
            for s1Category in category['subCategories']:
                s1CategoryName = s1Category['name']
                for s2Category in s1Category['subCategories']:
                    itemIndex = itemIndex + 1
                    s2CategoryName = s2Category['name']
                    s2CategoryUrl = s2Category['url']

                    l = ItemLoader(item=CategoryNSNSNUItem(),
                                   response=response)
                    l.add_value('itemId', int(itemIndex))
                    l.add_value('category', categoryName)
                    l.add_value('s1Category', s1CategoryName)
                    l.add_value('s2Category', s2CategoryName)
                    l.add_value('url', s2CategoryUrl)

                    yield l.load_item()
        self.spiderStatus(response)
