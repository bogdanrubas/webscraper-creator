def createCategoriesNSNSNU(spider):
    spider.cursor.execute('''DROP TABLE IF EXISTS categoriesNSNSNU''')
    spider.cursor.execute('''CREATE TABLE categoriesNSNSNU(
      id int,
      depthId int,
      category text,
      s1Category text,
      s2Category text,
      url text
    )''')


def createTables(spider):
    createCategoriesNSNSNU(spider)
