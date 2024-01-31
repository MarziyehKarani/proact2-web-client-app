
const devAnalystConsoleBaseUrl = "https://lemon-meadow-02b88a503.4.azurestaticapps.net";
const prodAnalystConsoleBaseUrl = "https://proact2-analystconsole.eu/";
const devCPanelUrl = "https://devetproactcpanel.azurewebsites.net/";
const prodCPanelUrl = "https://proact2-controlpanel.eu/";

const getControlPanelBaseUrl = () => {
    return `${devCPanelUrl}`;
}

const getAnalystConsoleBaseUrl = () => {
    return `${devAnalystConsoleBaseUrl}`;
}

const generateAnalysisPageUrl = (projectId, userId, messageId) => {
    return `${getAnalystConsoleBaseUrl()}/${projectId}/messages/userId/${userId}/messageId/${messageId}`;
}

export  {
    getControlPanelBaseUrl,
    generateAnalysisPageUrl, 
    getAnalystConsoleBaseUrl
};