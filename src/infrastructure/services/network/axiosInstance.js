import axios from "axios";
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import {msalInstance} from "../../../index";
import languages from '../../../common/languages';
import { protectedResources } from "../../azure/azureB2cConfig";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_APIENDPOINT}/${languages.en.tag}/`,
})

axiosInstance.interceptors.request.use(async (request) => {
    const instance = msalInstance
    const accounts = msalInstance.getAllAccounts()

    const accessTokenRequest = {
        scopes: protectedResources.api.scopes,
        account: accounts[0],
    }

    // Silently acquires an access token which is then attached to a request
    try {
        const { accessToken } = await instance.acquireTokenSilent(
            accessTokenRequest
        )
        
        if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`
    } catch (error) {
        // Should not be used according to MS documentation
        // if (error instanceof InteractionRequiredAuthError) {
        //    instance.acquireTokenRedirect(accessTokenRequest)
        // }
        console.log(error)
    }

    return request
})

export default axiosInstance;