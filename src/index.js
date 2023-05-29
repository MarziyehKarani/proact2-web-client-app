import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./infrastructure/azure/azureB2cConfig";
import store from "./store"

const msalInstance = new PublicClientApplication(msalConfig);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App instance={msalInstance}/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
