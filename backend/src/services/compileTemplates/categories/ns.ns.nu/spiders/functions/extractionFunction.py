import os


# categoriesList: [{
# - name: string
# - subCategories: [
# - - name: string
# - - subCategories: [
# - - - name: string
# - - - url: string (ex. /subSubCategory-url)
# - - ]
# - ]
# }]


def @functionName(
    response,
    errorsList,
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
):
    categoriesList = []
    categories = response.@categoriesSelectorType(categoriesSelector)

    if categories == []:
        errorsList.append(f'categories not found')
    else:
        for i in range(len(categories)):
            s1CategoriesList = []
            category = categories[i]

            categoryName = category.@categoryNameSelectorType(categoryNameSelector).get()
            if categoryName == None:
                errorsList.append(
                    f'({i}): categoryName not found')
            s1Categories = category.@s1CategoriesSelectorType(s1CategoriesSelector)
            if s1Categories == []:
                errorsList.append(
                    f'({i}): s1Categories not found')
            else:
                for j in range(len(s1Categories)):
                    s2CategoriesList = []
                    s1Category = s1Categories[j]

                    s1CategoryName = s1Category.@s1CategoryNameSelectorType(
                        s1CategoryNameSelector).get()
                    if s1CategoryName == None:
                        errorsList.append(
                            f'({i})({j}): s1CategoryName not found')
                    s2Categories = s1Category.@s2CategoriesSelectorType(s2CategoriesSelector)
                    if s2Categories == []:
                        errorsList.append(
                            f'({i})({j}): s2Categories not found')
                    else:
                        for k in range(len(s2Categories)):
                            s2Category = s2Categories[k]

                            s2CategoryName = s2Category.@s2CategoryNameSelectorType(
                                s2CategoryNameSelector).get()
                            if s2CategoryName == None:
                                errorsList.append(
                                    f'({i})({j})({k}): s2CategoryName not found')
                            s2CategoryUrl = s2Category.@s2CategoryUrlSelectorType(
                                s2CategoryUrlSelector).get()
                            if s2CategoryUrl == None:
                                errorsList.append(
                                    f'({i})({j})({k}): s2CategoryUrl not found')

                            if s2CategoryName == None:
                                s2CategoriesList.append({
                                    'name': s2CategoryName,
                                    'url': s2CategoryUrl
                                })
                            else:
                                name = s2CategoryName.strip()
                                if len(s2CategoryNameAcceptable) != 0:
                                    if (name in s2CategoryNameAcceptable
                                            and name not in s2CategoryNameException):
                                        s2CategoriesList.append({
                                            'name': s2CategoryName,
                                            'url': s2CategoryUrl
                                        })
                                else:
                                    if (name not in s2CategoryNameException):
                                        s2CategoriesList.append({
                                            'name': s2CategoryName,
                                            'url': s2CategoryUrl
                                        })

                        if s1CategoryName == None:
                            s1CategoriesList.append({
                                'name': s1CategoryName,
                                'subCategories': s2CategoriesList
                            })
                        else:
                            name = s1CategoryName.strip()
                            if (len(s1CategoryNameAcceptable) != 0):
                                if (name in s1CategoryNameAcceptable and name not in s1CategoryNameException):
                                    s1CategoriesList.append({
                                        'name': name,
                                        'subCategories': s2CategoriesList
                                    })
                            else:
                                if (name not in s1CategoryNameException):
                                    s1CategoriesList.append({
                                        'name': name,
                                        'subCategories': s2CategoriesList
                                    })

            if categoryName == None:
                categoriesList.append({
                    'name': categoryName,
                    'subCategories': s1CategoriesList
                })
            else:
                if len(categoryNameAcceptable) != 0:
                    name = categoryName.strip()
                    if (name in categoryNameAcceptable and name not in categoryNameException):
                        categoriesList.append({
                            'name': name,
                            'subCategories': s1CategoriesList
                        })
    return(categoriesList)
