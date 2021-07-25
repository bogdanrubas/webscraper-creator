import React from "react";
import ElementsProvider from "./context/elementsContext/provider";
import Elements from "./components/Elements";
import { ModalsContextProvider } from "./ctx/modalsContext";
import { UiContextProvider } from "./ctx/uiContext";
import DeleteElementModal from "./components/DeleteElementModal";

interface GetDataProps { }

interface IElement {
  name: string;
  validatorType: "string" | "int" | "float" | "boolean" | "url" | "list";
  validatorRequired: boolean;
  // <0.1>
  // ? if validatorType === "list":
  // ? - valueType: "css" | "xpath"
  // ? else:
  // ? - valueType: "css" | "xpath" | "value" | "if"
  valueType: "css" | "xpath" | "value" | "if";
  // </0.1>
  // <0.2>
  // ? inputProcessor oraz outputProcessor są dostępne, gdy:
  // ? validationType !== "list"
  inputProcessor?: "MapCompose" | "Take First";
  outputProcessor?: "TakeFirst" | "Join";
  // </0.2>
  // <0.3>
  // ? dostępne, gdy validationType === "list"
  elements?: IElement[];
  // </0.3>
}

const GetData: React.FunctionComponent<GetDataProps> = () => {
  // const formRef: any = useRef(null);
  // const schema = yup.object().shape({
  //   categoriesSelectorType: yup.string().required(),
  // });
  // const form = useForm({
  //   validationSchema: schema,
  //   mode: "onBlur",
  // });

  // dodaje "form" do kontekstu, aby dane z formów były dostępne globalnie
  // const addForm = useAddFormToContext();
  // useEffect(() => {
  //   addForm(formRef, form, "getData", depthId + "template");
  // }, []);

  // const addValuesToFormContext = useAddValuesToFormContext();
  // const onSubmit = async (values: any) => {
  //   addValuesToFormContext(depthId + "template", values);

  //   // console.log("success depth options");
  //   // console.log(formsList);
  // };

  return (
    <>
      {/* {JSON.stringify(form.watch(), null, 2)} */}
      <ElementsProvider>
        <ModalsContextProvider>
          <UiContextProvider>
            <DeleteElementModal />
            {/* <AddElement /> */}
            <Elements />
            {/* <FormContext {...form}>
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}></form>
            </FormContext> */}

          </UiContextProvider>
        </ModalsContextProvider>
      </ElementsProvider>
    </>
  );
};

export default GetData;
