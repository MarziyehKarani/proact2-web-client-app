import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./azureB2cConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export {msalInstance} ;