import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./state/reducer/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "artist", "userChoice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = [thunk];
const initialState = {};

// export const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleWare))
// );
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export const persistor = persistStore(store);
