import React from "react";
import { ContentWrapper } from "./styles";
import { FakeGridArea } from "templates/styles";
import Radio from "layout/Radio";
import Checkbox from "layout/Checkbox";
import Input from "layout/Input";
import { useFormContext } from "react-hook-form";

interface ContentProps {}

const Content: React.FunctionComponent<ContentProps> = () => {
  const { watch } = useFormContext();
  return (
    <>
      {/* {JSON.stringify(watch(), null, 2)} */}
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
          <Radio
            onMountAlert
            shadow="container"
            name="validatorType"
            text="list"
          />
          <Checkbox
            style={{ margin: 0 }}
            name="validatorTypeRequired"
            text="required"
          />
        </FakeGridArea>

        {watch("validatorType") !== undefined &&
        watch("validatorType") !== "" ? (
          <FakeGridArea gridArea="value">
            <small>valueType</small>
            <Radio
              onMountAlert
              shadow="container"
              name="valueType"
              text="css"
            />
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

        <FakeGridArea gridArea="processors">
          {watch("valueType") !== "" && watch("valueType") !== undefined ? (
            <>
              <small>inputProcessor</small>
              <Radio
                onMountAlert
                shadow="container"
                name="inputProcessor"
                text="Map Compose"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="inputProcessor"
                text="Take First"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="inputProcessor"
                text="Join"
              />
              {watch("inputProcessor") === "Map Compose" ? (
                <>
                  <Checkbox name="inputRemoveTags" text="remove_tags" />
                  <Checkbox
                    name="inputStripHtml5"
                    text="strip_html5_whitespace"
                  />
                  <Checkbox name="inputReplace" text="replace" />
                  {watch("inputReplace") === true ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: 15,
                        marginTop: 15,
                      }}
                    >
                      <Input
                        style={{ margin: 0 }}
                        onMountAlert
                        label="inputOldValue"
                        shadow="container"
                        type="topLabel"
                        name="inputOldValue"
                        placeholder="TODO"
                      />
                      <Input
                        style={{ marginBottom: 0 }}
                        onMountAlert
                        label="inputNewValue"
                        shadow="container"
                        type="topLabel"
                        name="inputNewValue"
                        placeholder="TODO"
                      />
                    </div>
                  ) : null}
                </>
              ) : null}

              <small style={{ marginTop: 20 }}>outputProcessor</small>
              <Radio
                onMountAlert
                shadow="container"
                name="outputProcessor"
                text="Take First"
              />
              <Radio
                onMountAlert
                shadow="container"
                name="outputProcessor"
                text="Join"
              />
            </>
          ) : null}
        </FakeGridArea>
      </ContentWrapper>
    </>
  );
};
export default Content;
