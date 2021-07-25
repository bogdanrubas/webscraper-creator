def listToString(s):
    str1 = " "
    return (str1.join(s))


def validationData(item, errorFields, errorsDescription):
    validationErrors = item['_validation']

    for field in validationErrors:
        errorText = validationErrors[field]
        # ? Jeśli field ma zagniezdzenie ex. colors.0.imgUrl
        if field.find('.') != -1:
            errorsDescription.append(f'{field}: {errorText[0]}')
            errorFields.append(f'{field}')
        # ? Jeśli field nie ma zagniezdzen ex. productName
        else:
            errorsDescription.append(f'{field}: {listToString(errorText)}')
            errorFields.append(field)
