import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { alertReducerInterface } from "./../../state/reducer/alertReducer";

const Alerts = () => {
  const alerts = useSelector<
    alertReducerInterface,
    alertReducerInterface["alerts"]
  >((state) => state.alerts);
  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle" />
            {alert.msg}
          </div>
        ))}
    </Fragment>
  );
};
export default Alerts;
