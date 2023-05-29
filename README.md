# PROACT 2.0 Web Client App
React web application

## First Local installation

npm install --save --legacy-peer-deps

## Configuration

1. Open `networkApiConfig.js`
2. Put Your api production and development URL in getProdEnvironment and getDevEvironment functions.
3. Open `azureB2cConfig.js`
4. Put your `AzureAdB2C` info and scope (follow *[PROACT 2.0 Azure AD B2C Documentation](https://docs.google.com/document/d/1_49bVIjXpugXBPZOqmD4EyNlIzRrh7FQMA7NftG7ulY/edit?usp=sharing)*)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


