import { useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "./azureB2cConfig";
// import { msalInstance } from "./msalInstance";

import { setApiAuthToken } from "../services/network/networkApiConfig";

export const aquireAccessToken = (onTokenAquiredCallBack) => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

   // console.log("aquireAccessToken: first" );
   // console.log("aquireAccessToken: account" +  JSON.stringify(account) );
    
    function accessTokenAquireHandler(accessToken) {
        setApiAuthToken(accessToken);
        onTokenAquiredCallBack(account);
    }

    useEffect(() => {

        console.log("aquireAccessToken: useEffect" );
        instance.acquireTokenSilent({
                        scopes: protectedResources.api.scopes,
                        account: account
                    }).then((response) => {
                        console.log("acquireTokenSilent" );
                        console.log(response);
                        accessTokenAquireHandler(response.accessToken);
        
                    }).catch((error) => {
                        // in case if silent token acquisition fails, fallback to an interactive method
                        if (error instanceof InteractionRequiredAuthError) {
                            // if (account && inProgress === "none") {
                                instance.acquireTokenPopup({
                                    scopes: protectedResources.api.scopes,
                                }).then((response) => {
        
                                    accessTokenAquireHandler(response.accessToken);
        
                                }).catch(error => console.log(error));
                            // }
                        }
                    });
    }, [instance, accounts, inProgress]);

    // useEffect(() => {
    //     console.log("aquireAccessToken: useEffect,inprogress:" + inProgress);
    //     if (account && inProgress === "none") {
    //         instance.acquireTokenSilent({
    //             scopes: protectedResources.api.scopes,
    //             account: account
    //         }).then((response) => {

    //             accessTokenAquireHandler(response.accessToken);

    //         }).catch((error) => {
    //             // in case if silent token acquisition fails, fallback to an interactive method
    //             if (error instanceof InteractionRequiredAuthError) {
    //                 if (account && inProgress === "none") {
    //                     instance.acquireTokenPopup({
    //                         scopes: protectedResources.api.scopes,
    //                     }).then((response) => {

    //                         accessTokenAquireHandler(response.accessToken);

    //                     }).catch(error => console.log(error));
    //                 }
    //             }
    //         });
    //     }

    // }, [account, inProgress, instance]);
}