from .validation import validationData


def addUrl(item, spider):
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
        # errorFields: ...
        pass
    else:
        print("####################################################")
        spider.cursor.execute('''INSERT INTO urls VALUES (%s, %s, %s)''', (
            item['itemId'],
            0,
            item['url']
        ))
        spider.connection.commit()
        # !!!!! DANE MUSZA TRAFIAC DO Depth + 1 > StartUrls
        # !!!!! TUTAJ trzeba znaleźć 'StartUrl' w bazie danych i zmienić
        # crawled: True
        # hasErrors: False
        # errorsDescription: ...
        pass
