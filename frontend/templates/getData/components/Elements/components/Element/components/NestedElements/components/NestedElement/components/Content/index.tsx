import React from "react";
import { ContentWrapper } from "./styles";
import { FakeGridArea } from "templates/styles";
import Radio from "layout/Radio";
import Checkbox from "layout/Checkbox";
import Input from "layout/Input";
// import Dropdown from "layout/Dropdown";
import { useFormContext } from "react-hook-form";

// const inputProcessorData = [
//   {
//     text: "Map Compose",
//     id: "mapCompose",
//   },
//   {
//     text: "Take First",
//     id: "takeFirst",
//   },
// ];

// const outputProcessorData = [
//   {
//     text: "Join",
//     id: "join",
//   },
//   {
//     text: "Take First",
//     id: "takeFirst",
//   },
// ];

interface ContentProps {}

const Content: React.FunctionComponent<ContentProps> = () => {
  const { watch } = useFormContext();
  return (
    <ContentWrapper>
      <FakeGridArea gridArea="element">
        <Input
          onMountAlert
          label="elementName"
          shadow="container"
          type="topLabel"
          name="elementName"
          placeholder="ex. productName"
        />

        <small>validatorType</small>
        <Radio
          onMountAlert
          shadow="container"
          name="validatorType"
          text="str"
        />
        <Radio
          onMountAlert
          shadow="container"
          name="validatorType"
          text="int"
        />
        <Radio
          onMountAlert
          shadow="container"
          name="validatorType"
          text="float"
        />
        <Radio
          onMountAlert
          shadow="container"
          name="validatorType"
          text="bool"
        />
        <Radio
          onMountAlert
          shadow="container"
          name="validatorType"
          text="url"
        />
        <Checkbox
          style={{ margin: 0 }}
          name="validatorTypeRequired"
          text="required"
        />
      </FakeGridArea>

      {watch("validatorType") !== undefined && watch("validatorType") !== "" ? (
        <FakeGridArea gridArea="value">
          <small>valueType</small>
          <Radio onMountAlert shadow="container" name="valueType" text="css" />
          <Radio
            onMountAlert
            shadow="container"
            name="valueType"
            text="xpath"
          />
          <Radio
            onMountAlert
            style={
              watch("validatorType") === "list" ? { display: "none" } : null
            }
            shadow="container"
            name="valueType"
            text="value"
          />
          <Radio
            onMountAlert
            style={
              watch("validatorType") === "list" ? { display: "none" } : null
            }
            shadow="container"
            name="valueType"
            text="if"
          />

          {watch("valueType") !== "if" &&
          watch("valueType") !== undefined &&
          watch("valueType") !== "" ? (
            <>
              <Input
                onMountAlert
                shadow="container"
                type="topLabel"
                name="value"
                placeholder={
                  watch("valueType") === "css"
                    ? "ex. .description"
                    : watch("valueType") === "xpath"
                    ? "TODO"
                    : "ex. response.url"
                }
              />
            </>
          ) : null}

          {watch("valueType") === "if" ? (
            <>
              <Input
                onMountAlert
                style={{ marginTop: 5 }}
                label="ifFunction"
                shadow="container"
                type="topLabel"
                name="ifFunction"
                placeholder=""
              />
              <small>valueIfTrue</small>
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfTrue"
                text="css"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfTrue"
                text="xpath"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfTrue"
                text="value"
              />

              {watch("valueTypeIfTrue") !== "" &&
              watch("valueTypeIfTrue") !== undefined ? (
                <Input
                  onMountAlert
                  shadow="container"
                  type="topLabel"
                  name="valueIfTrue"
                  placeholder={
                    watch("valueTypeIfTrue") === "css"
                      ? "ex. .description"
                      : watch("valueTypeIfTrue") === "xpath"
                      ? "TODO"
                      : "ex. response.url"
                  }
                />
              ) : null}

              <small>valueIfFalse</small>
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfFalse"
                text="css"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfFalse"
                text="xpath"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="valueTypeIfFalse"
                text="value"
              />

              {watch("valueTypeIfFalse") !== "" &&
              watch("valueTypeIfFalse") !== undefined ? (
                <Input
                  onMountAlert
                  shadow="container"
                  type="topLabel"
                  name="valueIfFalse"
                  placeholder={
                    watch("valueTypeIfFalse") === "css"
                      ? "ex. .description"
                      : watch("valueTypeIfFalse") === "xpath"
                      ? "TODO"
                      : "ex. response.url"
                  }
                />
              ) : null}
            </>
          ) : null}
        </FakeGridArea>
      ) : null}
    </ContentWrapper>
  );
};
export default Content;
