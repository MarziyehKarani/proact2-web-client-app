import PropTypes from 'prop-types';
import React from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import HorizontalLayout from "./components/HorizontalLayout/";

// Azure
import { MsalProvider, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { authRequest } from "./infrastructure/azure/azureB2cConfig";

// Api service
import { setupApiConfiguration } from './infrastructure/services/network/networkApiConfig';
import languages from './common/languages';

import { ReactSession } from 'react-client-session';

// Import scss
import "./assets/scss/theme.scss";

// OneSignal
import OneSignal from 'react-onesignal';
import { useEffect ,useState } from 'react';

setupApiConfiguration(languages.en.tag);
ReactSession.setStoreType("localStorage");


const App = ({ instance }) => {

 // const [isInitialized, setIsInitialized] = useState(false);

/*      useEffect(() => {
      if(!isInitialized){
      OneSignal.init({ appId: 'ebb1244f-a56b-4c7e-a7b0-8e947b008075',  notificationClickHandlerMatch: "URL",
                allowLocalhostAsSecureOrigin: true}).then(() => {
        OneSignal.Slidedown.promptPush();
        setIsInitialized(true);
        })
      }
    }, []);  */

  function getLayout() {
    let layoutCls = HorizontalLayout;
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <MsalProvider instance={instance}>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
          >
            <Switch>
              {userRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
                  exact
                />
              ))}
            </Switch>
          </MsalAuthenticationTemplate>
        </MsalProvider>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
