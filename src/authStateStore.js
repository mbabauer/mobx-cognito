import { observable, action } from "mobx";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

const LOGIN_STATES = {
  SIGN_IN: "signIn",
  LOADING: "loading",
  MFA: "mfa",
  LOGGED_IN: "loggedIn",
  NEW_PASSWORD: "newPassword",
  FAILED_LOGIN: "loginFailed"
};

class AuthStateStore {
  configuration = null;
  userPool = null;

  handlers = {
    onSuccess: result => this.handleOnSuccessLogin(result),
    onFailure: err => this.handleOnFailureLogin(err),
    mfaRequired: codeDeliveryDetails =>
      this.handleMFARequired(codeDeliveryDetails),
    newPasswordRequired: (userAttributes, requiredAttributes) =>
      this.handleNewPassword(userAttributes, requiredAttributes)
  };

  @observable userSession = null;
  @observable cognitoUser = null;
  @observable loginState = LOGIN_STATES.SIGN_IN;
  @observable loginError = null;
  @observable accessToken = null;
  @observable idToken = null;

  // These are only set when a new password is required
  @observable userAttributes = null;
  @observable requiredAttributes = null;

  /**
   * Sets configuration for Cognito
   *
   * @param {Object} config - The Cognito configuration
   */
  configure(config) {
    this.configuration = {
      UserPoolId: config.UserPoolId,
      ClientId: config.ClientId
    };
    if (config.CookieStorage) {
      this.configuration.Storage = new AmazonCognitoIdentity.CookieStorage({
        ...config.CookieStorage
      });
    }
  }

  /**
   * Lazy-initializes the UserPool
   * @returns {Object} The UserPool
   */
  getUserPool() {
    if (!this.userPool) this.userPool = new CognitoUserPool(this.configuration);
    return this.userPool;
  }

  /**
   * Lazy-initializes the CognitoUser
   * @param {Object} userData The UserData
   * @returns {Object} The CognitoUser object
   */
  getCognitoUser(userData) {
    if (!this.cognitoUser) this.cognitoUser = new CognitoUser(userData);
    return this.cognitoUser;
  }

  handleOnSuccessLogin(result) {
    this.userSession = result;
    this.accessToken = result.getAccessToken();
    this.idToken = result.idToken;
    this.loginError = null;
    this.setLoginState(LOGIN_STATES.LOGGED_IN);
  }

  handleOnFailureLogin(err) {
    this.setLoginState(LOGIN_STATES.FAILED_LOGIN);
    this.loginError = err;
  }

  handleMFARequired(codeDeliveryDetails) {
    this.setLoginState(LOGIN_STATES.MFA);
  }

  handleNewPassword(userAttributes, requiredAttributes) {
    this.userAttributes = userAttributes;
    this.requiredAttributes = requiredAttributes;
    this.setLoginState(LOGIN_STATES.NEW_PASSWORD);
  }

  /**
   * Authenticates the given user
   * @param {string} username The username
   * @param {string} password The password
   */
  @action signIn(username, password) {
    const authenticationData = { Username: username, Password: password };
    const userData = {
      Username: username,
      Pool: this.getUserPool(),
      ...this.configuration.Storage
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    this.getCognitoUser(userData).authenticateUser(
      authenticationDetails,
      this.handlers
    );
  }

  /**
   * Signs the current user out
   */
  @action
  signOut() {
    const user = this.getCognitoUser();
    if (user) user.signOut();
    this.userSession = null;
    this.accessToken = null;
    this.idToken = null;
    this.loginError = null;
    this.setLoginState(LOGIN_STATES.SIGN_IN);
  }

  /**
   * Confirms the MFA code to continue the authentication proceedure
   * @param {string} code The MFA code
   */
  @action confirmMFA(code) {
    this.getCognitoUser().sendMFACode(code, this.handlers);
  }

  @action completeNewPasswordChallenge(newPassword, attributesData) {
    this.getCognitoUser().completeNewPasswordChallenge(
      newPassword,
      attributesData,
      this.handlers
    );
  }

  @action setLoginState = newState => {
    this.loginState = newState;
  };
}

export { LOGIN_STATES };
export default AuthStateStore;
