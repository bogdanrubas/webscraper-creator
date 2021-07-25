def createUrlsTable(spider):
    spider.cursor.execute('''DROP TABLE IF EXISTS urls''')
    spider.cursor.execute('''CREATE TABLE urls(
      id int,
      depthId int,
      url text
    )''')


def createTables(spider):
    createUrlsTable(spider)
