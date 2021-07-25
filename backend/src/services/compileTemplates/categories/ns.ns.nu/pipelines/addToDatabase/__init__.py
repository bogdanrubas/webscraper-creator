from .validation import validationData


def addCategoryNSNSNU(item, spider):
    itemHasErrors = False
    errorsDescription = []
    errorFields = []

    # ? Jeśli jakiś 'field' nie spełnia wymogów określonych w validators.py
    # ? to do 'item' jest przekazywany '_validation':
    if '_validation' in item:
        itemHasErrors = True
        # ? Funkcja przetwarzająca error'y w _validation,
        # ? zapełnia 'errorsDescription' oraz 'errorFields'
        validationData(item, errorFields, errorsDescription)

    if itemHasErrors:
        spider.itemErrors[item['itemId']] = errorsDescription
        # !!!!! TUTAJ trzeba znaleźć 'StartUrl' w bazie danych i zmienić
        # crawled: True
        # hasErrors: True
        # errorsDescription: ...
        pass
    else:
        spider.cursor.execute('''INSERT INTO categoriesNSNSNU VALUES (%s, %s, %s, %s, %s, %s)''', (
            item['itemId'],
            spider.depth,
            item['category'],
            item['s1Category'],
            item['s2Category'],
            item['url'],
        ))
        spider.connection.commit()
        pass
        # !!!!! TUTAJ trzeba znaleźć 'StartUrl' w bazie danych i zmienić
        # crawled: True
        # hasErrors: False
        # errorsDescription: ...
