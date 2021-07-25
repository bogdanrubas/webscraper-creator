import React, { useState, useEffect, useRef, useContext } from "react";
import { CategoriesNSNSNUWrapper } from "./styles";
import Input from "layout/Input";
import InputList from "layout/InputList";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import Radio from "layout/Radio";
import { Line, FakeGridArea } from "templates/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { DepthContext } from "pages/account-crawler/Depths/ctx/depthContext";
import { FormsContext } from "pages/account-crawler/ctx/formsContext";

interface CategoriesNSNSNUProps { }

const CategoriesNSNSNU: React.FunctionComponent<CategoriesNSNSNUProps> = () => {
  const formRef: any = useRef(null),
    schema = yup.object().shape({
      categoriesSelectorType: yup.string().required(),
      categoriesSelector: yup.string().required(),
      categoryNameSelectorType: yup.string().required(),
      categoryNameSelector: yup.string().required(),
      categoryNameAcceptableList: yup.array().nullable(),
      categoryNameExceptionList: yup.array().nullable(),

      s1CategoriesSelectorType: yup.string().required(),
      s1CategoriesSelector: yup.string().required(),
      s1CategoryNameSelectorType: yup.string().required(),
      s1CategoryNameSelector: yup.string().required(),
      s1CategoryNameAcceptableList: yup.array().nullable(),
      s1CategoryNameExceptionList: yup.array().nullable(),

      s2CategoriesSelectorType: yup.string().required(),
      s2CategoriesSelector: yup.string().required(),
      s2CategoryNameSelectorType: yup.string().required(),
      s2CategoryNameSelector: yup.string().required(),
      s2CategoryNameAcceptableList: yup.array().nullable(),
      s2CategoryNameExceptionList: yup.array().nullable(),
      s2CategoryUrlSelectorType: yup.string().required(),
      s2CategoryUrlSelector: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur"
    }),
    { depth } = useContext(DepthContext),
    { addFormToCtx, addValuesToFormCtx } = useContext(FormsContext),
    [categoryNameAcceptableList, setCategoryNameAcceptableList] = useState([]),
    [categoryNameExceptionList, setCategoryNameExceptionList] = useState([]),
    [s1CategoryNameAcceptableList, sets1CategoryNameAcceptableList] = useState([]),
    [s1CategoryNameExceptionList, sets1CategoryNameExceptionList,] = useState([]),
    [s2CategoryNameAcceptableList, sets2CategoryNameAcceptableList] = useState([]),
    [s2CategoryNameExceptionList, sets2CategoryNameExceptionList] = useState([]);

  // <1>
  // dodanie Acceptable i Exception do fake input'ów, aby
  // w pages/spider/addArgumentsToDepths() dodać je do useState:"depths"
  useEffect(() => {
    if (categoryNameAcceptableList.length === 0) {
      methods.setValue("categoryNameAcceptableList", JSON.stringify([]));
    } else {
      methods.setValue(
        "categoryNameAcceptableList",
        JSON.stringify(categoryNameAcceptableList)
      );
    }
  }, [categoryNameAcceptableList]);

  useEffect(() => {
    if (categoryNameExceptionList.length === 0) {
      methods.setValue("categoryNameExceptionList", JSON.stringify([]));
    } else {
      methods.setValue(
        "categoryNameExceptionList",
        JSON.stringify(categoryNameExceptionList)
      );
    }
  }, [categoryNameExceptionList]);

  useEffect(() => {
    if (s1CategoryNameAcceptableList.length === 0) {
      methods.setValue("s1CategoryNameAcceptableList", JSON.stringify([]));
    } else {
      methods.setValue(
        "s1CategoryNameAcceptableList",
        JSON.stringify(s1CategoryNameAcceptableList)
      );
    }
  }, [s1CategoryNameAcceptableList]);

  useEffect(() => {
    if (s1CategoryNameExceptionList.length === 0) {
      methods.setValue("s1CategoryNameExceptionList", JSON.stringify([]));
    } else {
      methods.setValue(
        "s1CategoryNameExceptionList",
        JSON.stringify(s1CategoryNameExceptionList)
      );
    }
  }, [s1CategoryNameExceptionList]);

  useEffect(() => {
    if (s2CategoryNameAcceptableList.length === 0) {
      methods.setValue("s2CategoryNameAcceptableList", JSON.stringify([]));
    } else {
      methods.setValue(
        "s2CategoryNameAcceptableList",
        JSON.stringify(s2CategoryNameAcceptableList)
      );
    }
  }, [s2CategoryNameAcceptableList]);

  useEffect(() => {
    if (s2CategoryNameExceptionList.length === 0) {
      methods.setValue("s2CategoryNameExceptionList", JSON.stringify([]));
    } else {
      methods.setValue(
        "s2CategoryNameExceptionList",
        JSON.stringify(s2CategoryNameExceptionList)
      );
    }
  }, [s2CategoryNameExceptionList]);
  // </1>

  useEffect(() => {
    addFormToCtx(formRef, methods, "categoriesNSNSNU", depth.id + "template");
  }, []);

  const onSubmit = async (values: any) => {
    addValuesToFormCtx(depth.id + "template", values);
  };

  return (
    <>
      <div style={{ whiteSpace: "pre-wrap", fontSize: 10 }}>
        {`
      categories: [{
        name: string;
        subCategories: [
          name: string;
          subCategories: [
            name: string;
            url: string (ex. /subbSubCategory-url)
          ]
        ]
      }]`}
      </div>
      <FormProvider {...methods}>
        <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>
          {/* {JSON.stringify(methods.watch(), null, 2)} */}
          <CategoriesNSNSNUWrapper>
            {/* lines */}
            <Line gridArea="line1" />
            <Line gridArea="line2" />
            {/* tips */}
            <FakeGridArea gridArea="selectorsTip" tip>
              <b>Selektory</b>
              <small>
                Za pomocą CSS lub XPath wskaż element.
                <br />
                (s1 = sub, s2 = subSub)
              </small>
            </FakeGridArea>

            <FakeGridArea gridArea="filtrTip" tip>
              <b>Filtr</b>
              <small>
                Za pomocą Exception można wywalić niechciane kategorie. Za
                pomocą Acceptable można wybrać tylko interesujące nas kategorie.
              </small>
            </FakeGridArea>

            {/* s0 */}
            <FakeGridArea gridArea="categoriesSelector">
              <small>categories</small>
              <Radio
                shadow="container"
                name="categoriesSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="categoriesSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="categoriesSelector"
                placeholder={
                  methods.watch("categoriesSelectorType") === "css"
                    ? "np. #left_menu .bold"
                    : methods.watch("categoriesSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="categoryNameSelector">
              <small>categoryName</small>
              <Radio
                shadow="container"
                name="categoryNameSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="categoryNameSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="categoryNameSelector"
                placeholder={
                  methods.watch("categoryNameSelectorType") === "css"
                    ? "np. .categoryLink::text"
                    : methods.watch("categoryNameSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <InputList
              shadow="container"
              gridArea="categoryNameAcceptableList"
              list={categoryNameAcceptableList}
              setList={setCategoryNameAcceptableList}
              inputLabel="categoryNameAcceptable"
              inputName="categoryNameAcceptable"
              listName="categoryNameAcceptableList"
              inputPlaceholder="np. Outlet"
              iconName="plus"
            />

            <InputList
              shadow="container"
              gridArea="categoryNameExceptionList"
              list={categoryNameExceptionList}
              setList={setCategoryNameExceptionList}
              inputLabel="categoryNameException"
              inputName="categoryNameException"
              listName="categoryNameExceptionList"
              inputPlaceholder="np. Kupony -15%"
              iconName="plus"
            />

            {/* s1 */}

            <FakeGridArea gridArea="s1CategoriesSelector">
              <small>s1Categories</small>
              <Radio
                shadow="container"
                name="s1CategoriesSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="s1CategoriesSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="s1CategoriesSelector"
                placeholder={
                  methods.watch("s1CategoriesSelectorType") === "css"
                    ? "np. ul.s1 > li"
                    : methods.watch("s1CategoriesSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="s1CategoryNameSelector">
              <small>s1CategoryName</small>
              <Radio
                shadow="container"
                name="s1CategoryNameSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="s1CategoryNameSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="s1CategoryNameSelector"
                placeholder={
                  methods.watch("s1CategoryNameSelectorType") === "css"
                    ? "np. .s1CategoryLink::text"
                    : methods.watch("s1CategoryNameSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <InputList
              shadow="container"
              gridArea="s1CategoryNameAcceptableList"
              list={s1CategoryNameAcceptableList}
              setList={sets1CategoryNameAcceptableList}
              inputLabel="s1CategoryNameAcceptable"
              inputName="s1CategoryNameAcceptable"
              listName="s1CategoryNameAcceptableList"
              inputPlaceholder="np. Akcesoria"
              iconName="plus"
            />

            <InputList
              shadow="container"
              gridArea="s1CategoryNameExceptionList"
              list={s1CategoryNameExceptionList}
              setList={sets1CategoryNameExceptionList}
              inputLabel="s1CategoryNameException"
              inputName="s1CategoryNameException"
              listName="s1CategoryNameExceptionList"
              inputPlaceholder="np. Kategoria bez produktów"
              iconName="plus"
            />

            {/* s2 */}

            <FakeGridArea gridArea="s2CategoriesSelector">
              <small>s2Categories</small>
              <Radio
                shadow="container"
                name="s2CategoriesSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="s2CategoriesSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="s2CategoriesSelector"
                placeholder={
                  methods.watch("s2CategoriesSelectorType") === "css"
                    ? "np. ul.s2 > li"
                    : methods.watch("s2CategoriesSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="s2CategoryNameSelector">
              <small>s2CategoryName</small>
              <Radio
                shadow="container"
                name="s2CategoryNameSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="s2CategoryNameSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="s2CategoryNameSelector"
                placeholder={
                  methods.watch("s2CategoryNameSelectorType") === "css"
                    ? "np. a::text"
                    : methods.watch("s2CategoryNameSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <FakeGridArea gridArea="s2CategoryUrlSelector">
              <small>s2CategoryUrl</small>
              <Radio
                shadow="container"
                name="s2CategoryUrlSelectorType"
                text="css"
              />
              <Radio
                shadow="container"
                name="s2CategoryUrlSelectorType"
                text="xpath"
              />
              <Input
                shadow="container"
                type="topLabel"
                name="s2CategoryUrlSelector"
                placeholder={
                  methods.watch("s2CategoryUrlSelectorType") === "css"
                    ? "np. a::attr(href)"
                    : methods.watch("s2CategoryUrlSelectorType") === "xpath"
                      ? "TODO"
                      : "Wybierz typ selektora"
                }
              />
            </FakeGridArea>

            <InputList
              shadow="container"
              gridArea="s2CategoryNameAcceptableList"
              list={s2CategoryNameAcceptableList}
              setList={sets2CategoryNameAcceptableList}
              inputLabel="s2CategoryNameAcceptable"
              inputName="s2CategoryNameAcceptable"
              listName="s2CategoryNameAcceptableList"
              inputPlaceholder="np. Odzież damska"
              iconName="plus"
            />

            <InputList
              shadow="container"
              gridArea="s2CategoryNameExceptionList"
              list={s2CategoryNameExceptionList}
              setList={sets2CategoryNameExceptionList}
              inputLabel="s2CategoryNameException"
              inputName="s2CategoryNameException"
              listName="s2CategoryNameExceptionList"
              inputPlaceholder="np. Niedostępne"
              iconName="plus"
            />
          </CategoriesNSNSNUWrapper>
        </form>
      </FormProvider>
    </>
  );
};

export default CategoriesNSNSNU;
