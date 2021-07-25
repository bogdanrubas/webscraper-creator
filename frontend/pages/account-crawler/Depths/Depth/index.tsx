import React, { useState, useEffect, useRef, useContext } from "react";
import {
  DepthWrapper,
  Head,
  Wrapper,
  Rotate,
  Icons,
  Body,
  Options,
} from "./styles";
import Icon from "layout/Icon";
import Dropdown from "layout/Dropdown";
import { FormProvider, useForm } from "react-hook-form";
import TemplateContainer from "./TemplateContainer";
import Input from "layout/Input";
import * as yup from "yup";
// import { useUpdateDepthCtx } from "../ctx/depth/provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { UiContext } from "pages/account-crawler/ctx/uiContext";
import { FormsContext } from "pages/account-crawler/ctx/formsContext";
import { DepthContext } from "../ctx/depthContext";
import { DepthsContext } from "pages/account-crawler/ctx/depthsContext";
import { theme } from "config/theme";

interface DepthProps {
  i: number;
  id: string;
}

const requestTypeDropdownData = [
  {
    text: "http",
    id: "http",
  },
  {
    text: "waitForSelector",
    id: "waitForSelector",
  },
];

const templateDropdownData = [
  // {
  //   text: "Categories: nu",
  //   id: "categories.nu",
  // },
  {
    text: "Categories: ns>ns>nu",
    id: "categories/ns.ns.nu",
  },
  // {
  //   text: "Categories: ns>nu",
  //   id: "categories.ns.nu",
  // },
  // {
  //   text: "Custom code",
  //   id: "customCode",
  // },
  {
    text: "Get data",
    id: "getData",
  },
  {
    text: "Get urls",
    id: "getUrls",
  },
];

const Depth: React.FunctionComponent<DepthProps> = ({ i, id }) => {
  const formRef: any = useRef(null),
    depthOptionsSchema = yup.object().shape({
      depthName: yup.string().required(),
      depthRequestType: yup.string().required(),
      depthTemplateName: yup.string().required(),
    }),
    methods = useForm({
      resolver: yupResolver(depthOptionsSchema),
      mode: "onBlur"
    }),
    { changeUiContext } = useContext(UiContext),
    { addValuesToFormCtx, addFormToCtx } = useContext(FormsContext),
    { updateDepthCtx } = useContext(DepthContext),
    { deleteDepth } = useContext(DepthsContext);

  function onSubmit(values: any) {
    console.log(addValuesToFormCtx);

    addValuesToFormCtx(id, values);
  }
  // ref ktory jest potrzebny do zapisania w formsContext,
  // aby pozniej zrobic walidacje dla wszystkich "forms" na stronie
  useEffect(() => {
    addFormToCtx(formRef, methods, "depthOptionsForm", id);
    updateDepthCtx("id", id);
  }, []);

  const titleRef: any = useRef();
  const [expand, setExpand] = useState(true);

  let templateDropdownName = "depthTemplateName",
    chosenTemplateId = methods.watch(templateDropdownName),
    isTemplateChosen =
      methods.watch(templateDropdownName) === "" ||
        methods.watch(templateDropdownName) === undefined
        ? false
        : true;

  // <1>
  // zmiana tytułu, przy zmianie Template w Dropdown:
  useEffect(() => {
    if (chosenTemplateId === "") {
      titleRef.current.innerText = "";
    }

    for (let i = 0; i < templateDropdownData.length; i++) {
      let el = templateDropdownData[i];
      if (el.id === chosenTemplateId) {
        titleRef.current.innerText = el.text;
      }
    }

    if (chosenTemplateId !== "") {
      setExpand(true);
    }
  }, [chosenTemplateId]);
  // </1>

  return (
    <DepthWrapper
      isTemplateChosen={isTemplateChosen}
      pose={expand ? "expand" : "close"}
      id={id}
    >
      <Wrapper>
        <Head>
          <b>
            <small>Depth: {i}</small>
          </b>
          <Icons>
            {isTemplateChosen ? (
              <Rotate pose={expand ? "expand" : "close"}>
                <Icon
                  title="Expand/Hide"
                  name="chevron"
                  size={20}
                  color={theme.colors.text.accent}
                  strokeWidth={50}
                  onClick={() => setExpand(!expand)}
                />
              </Rotate>
            ) : null}
            <Icon
              name="close"
              title="Usuń"
              size={20}
              color={theme.colors.text.accent}
              strokeWidth={60}
              onClick={() => deleteDepth(id)}
            />
          </Icons>
        </Head>

        <Body isTemplateChosen={isTemplateChosen}>
          <FormProvider {...methods}>
            <form
              ref={formRef}
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Options>
                <Input
                  shadow="container"
                  type="topLabel"
                  label="Name"
                  name="depthName"
                  placeholder="ex. getCategories"
                />

                <Dropdown
                  shadow="container"
                  label="Request type"
                  name={`depthRequestType`}
                  type="selectSearch"
                  title=""
                  data={requestTypeDropdownData}
                />

                {methods.watch("depthRequestType") ===
                  "waitForSelector" ? (
                  <Input
                    shadow="container"
                    type="topLabel"
                    label="Wait for (css selector)"
                    name="cssSelector"
                    placeholder="ex. .categories > ul"
                  />
                ) : null}

                <Dropdown
                  shadow="container"
                  label="Template"
                  name={templateDropdownName}
                  type="selectSearch"
                  title=""
                  data={templateDropdownData}
                />
              </Options>
            </form>
          </FormProvider>

          <b ref={titleRef}></b>

          {isTemplateChosen ? (
            <TemplateContainer chosenTemplateId={chosenTemplateId} />
          ) : null}
        </Body>
        {/* {JSON.stringify(watch(templateDropdownName), null, 2)} */}
      </Wrapper>
    </DepthWrapper>
  );
};

export default Depth;
