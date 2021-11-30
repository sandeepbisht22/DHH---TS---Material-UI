import { SET_ALERT, REMOVE_ALERT } from "../types";

export interface alertReducerInterface {
  alerts: { msg: string; type: string; id: string }[];
}

export type AlertAction =
  | { type: "SET_ALERT"; payload: { msg: string; type: string; id: string } }
  | { type: "REMOVE_ALERT"; payload: string };

const initialState = {
  alerts: [],
};

export default (
  state: alertReducerInterface = initialState,
  action: AlertAction
) => {
  switch (action.type) {
    case SET_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    }
    case REMOVE_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
