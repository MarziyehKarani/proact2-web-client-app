import { LogLevel } from "@azure/msal-browser";

/* const devEnvironment = {
    clientId: "71123e8a-6249-4c52-85c1-4eab1a0dc5bd",
    signinUserFlow: "B2C_1_sign_in",
    domain: "devproactb2c.b2clogin.com",
    loginEndpoint: "https://devproactb2c.b2clogin.com/devproactb2c.onmicrosoft.com/B2C_1_sign_in",
    scopes: ["https://devproactb2c.onmicrosoft.com/api/access_as_user"]
} */
//AZURE ENGITEL
const devEnvironment = {
    clientId: "48cab400-3b9c-4b41-8db9-af142afeece2",
    signinUserFlow: "B2C_1_EngitelDevProact",
    domain: "devetproactb2c.b2clogin.com",
    loginEndpoint: "https://devetproactb2c.b2clogin.com/devetproactb2c.onmicrosoft.com/B2C_1_EngitelDevProact",
    scopes: ["https://devetproactb2c.onmicrosoft.com/5640d05e-b6cb-4aac-a235-611db24fd6f3/Api.Scope"]
}


const prodEnvironment = {
    clientId: "40776ba4-353d-4a81-8900-0ef562a40039",
    signinUserFlow: "B2C_1_signin",
    domain: "proact2.b2clogin.com",
    loginEndpoint: "https://proact2.b2clogin.com/proact2.onmicrosoft.com/B2C_1_signin",
    scopes: ["https://proact2.onmicrosoft.com/api/access_as_user"]
}

export const b2cPolicies = {
    names: {
        signUpSignIn: process.env.signinUserFlow
    },
    authorities: {
        signUpSignIn: {
            authority: process.env.loginEndpoint
        }
    },
    authorityDomain: process.env.domain
}


export const msalConfig = {
    auth: {
        clientId: process.env.clientId,
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
        scopes: process.env.scopes
    },
}

export const loginRequest = {
    scopes: [...protectedResources.api.scopes]
};

export const authRequest = {
    ...loginRequest
};