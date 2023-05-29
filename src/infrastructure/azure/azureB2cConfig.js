import { LogLevel } from "@azure/msal-browser";

const devEnvironment = {
    clientId: "",
    signinUserFlow: "",
    domain: "",
    loginEndpoint: "",
    scopes: [""]
}

const prodEnvironment = {
    clientId: "",
    signinUserFlow: "",
    domain: "",
    loginEndpoint: "",
    scopes: [""]
}

export const b2cPolicies = {
    names: {
        signUpSignIn: prodEnvironment.signinUserFlow
    },
    authorities: {
        signUpSignIn: {
            authority: prodEnvironment.loginEndpoint
        }
    },
    authorityDomain: prodEnvironment.domain
}


export const msalConfig = {
    auth: {
        clientId: prodEnvironment.clientId,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const protectedResources = {
    api: {
        scopes: prodEnvironment.scopes
    },
}

export const loginRequest = {
    scopes: [...protectedResources.api.scopes]
};

export const authRequest = {
    ...loginRequest
};
