import React, { createContext, useState } from "react";
import Alert from "layout/Alert";
import GlobalStyle from "../config/globalStyles";

interface Alerts {
  deleteAlert(id: number): any;
  addAlert(text: string, Component: React.Component): any;
  setAlerts: any;
  alerts: any;
}
// @ts-ignore
export const AlertsContext = createContext<Alerts>();
const alertID = 0;

const Layout = (props: any) => 
  // const [alerts, setAlerts] = useState([]);

  // function addAlert(text: string, time: number, Component?: any) {
  //   setAlerts([...alerts, { id: alertID++, text, time, component: Component }]);
  // }
  // const deleteAlert = id =>
  //   setAlerts(alerts => alerts.filter(m => m.id !== id));

  // let alertContext = {
  //   alerts,
  //   setAlerts,
  //   addAlert,
  //   deleteAlert
  // };

   (
    <>
      {/* <AlertsContext.Provider value={alertContext}> */}
      <GlobalStyle />
      {props.children}
      {/* {alerts.map(a => (
          <div>
            <Alert key={a.id} {...a} deleteAlert={deleteAlert} time={a.time}>
              {a.component}
            </Alert>
          </div>
        ))} */}
      {/* </AlertsContext.Provider> */}
    </>
  )
;

export default Layout;
