# mobx-cognito
An NPM module to allow AWS Cognito calls using a MobX app store.

## About
This library consists of a MobX application store with functions to allow the interactions with AWS Cognito.  It allows developers to maintain the user state within their application using a MobX state store.

## Installation
Install `mobx-cognito` using NPM
	`npm install  --save mobx-cognito`

Import the app store into your project and include it in your React app
```javascript
import authStore from "mobx-cognito";
// configure the authStore
authStore.configure({
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_USER_POOL_CLIENT_ID,
  CookieStorage: {
    domain: process.env.AWS_STORAGE_DOMAIN
  }
});
// include the authStore with your other app stores
const stores = {...otherStores, authStore};

// Add it to your provider
class App extends React.Component {
  render() {
    return (
	  <Provider {...stores}>
	    <div>...rest of app</div>
	  </Provider>
	);
  }
}
```

## Interacting with AWS Cognito

### Actions
#### signIn(username, password)
Causes the user to be logged into Cognito using the given username and password.

If the user is configured in Cognito to not use MFA, then the user is logged in and the `loginState` will be set to `LOGIN_STATES.LOGGED_IN`.  If MFA has been activated then the `loginState` will be `LOGIN_STATES.MFA`, and you will have to handle calling `confirmMFA(code)` to continue the login process.

Once login is successful, `userSession`, `cognitoUser`, `accessToken`, and `idToken` observables should all be set appropriately.

If the user is not logged in successfully, then `loginState` will be set to `LOGIN_STATES.FAILED_LOGIN` and `loginError` will be set to the error returns by Cognito.

#### confirmMFA(code)
Confirms the given MFA code with Cognito.

This is only required if the user has setup MFA on their account.  Once the code has been successfully confirmed, the same process if followed as if `signIn(username, password)` was called successfully.  If the MFA confirmation fails, the `loginState` should be set to `LOGIN_STATES.MFA` again.

### Observables
#### userSession
The AWS Cognito UserSession object returned after successful login.

#### cognitoUser
The AWS CognitoUser object returned after successful login.

#### accessToken
The AWS CognitoAccessToken object returned after successful login.

#### idToken
The AWS CognitoIdToken object returned after successful login.

#### loginState
The current `LOGIN_STATES` value representing the login state for that user.

#### loginError
Any Error returned due to failed login.

### Others
#### LOGIN_STATES
A `const` containing the following possible `loginState`s:

**SIGN_IN** - User needs to signin (they are unauthenticated)
**LOADING** - Action is in the process of loading, I.E. user has attempted authentication and is awaiting AWS response.
**MFA** - MFA confirmation is required to continue authentication.
**LOGGED_IN** - User has logged in and been fully authenticated.
**NEW_PASSWORD** - User is required to change their password according to the AWS Cognito User Pool settings.
**FAILED_LOGIN** - The previous login attempt was in error or failed.

## Disclaimer
This software is provided as Open Source, and as such comes with no warrantees or guarantees.  Please read the License information below for more details.

## License
[MIT](https://github.com/Availity/react-block-ui/blob/HEAD/LICENSE)