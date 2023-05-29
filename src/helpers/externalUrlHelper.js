
const devAnalystConsoleBaseUrl = "https://delightful-desert-01c344803.2.azurestaticapps.net";
const prodAnalystConsoleBaseUrl = "https://proact2-analystconsole.eu/";
const devCPanelUrl = "https://devproactcpanel.azurewebsites.net/";
const prodCPanelUrl = "https://proact2-controlpanel.eu/";

const getControlPanelBaseUrl = () => {
    return `${prodCPanelUrl}`;
}

const getAnalystConsoleBaseUrl = () => {
    return `${prodAnalystConsoleBaseUrl}`;
}

const generateAnalysisPageUrl = (projectId, userId, messageId) => {
    return `${getAnalystConsoleBaseUrl()}/${projectId}/messages/userId/${userId}/messageId/${messageId}`;
}

export  {
    getControlPanelBaseUrl,
    generateAnalysisPageUrl, 
    getAnalystConsoleBaseUrl
};