import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./infrastructure/azure/azureB2cConfig";
import store from "./store"
import LocalServiceWorkerRegister from "./serviceWorkerRegistration"

const msalInstance = new PublicClientApplication(msalConfig);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App instance={msalInstance}/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
//serviceWorker.unregister()

//serviceWorker.register()
LocalServiceWorkerRegister();

const Logout = () => {
  msalInstance.logoutRedirect();
    return;
}


/* if ("serviceWorker" in navigator) {
  window.addEventListener('load',() => {
    navigator.serviceWorker.register('/serviceWorker.js');
  });
} */


/* if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
       console.log('SW registered: ', registration);
       }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
       });
     });
   } */

     export {msalInstance,Logout} ;