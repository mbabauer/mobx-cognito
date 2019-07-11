"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LOGIN_STATES = void 0;

var _mobx = require("mobx");

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var LOGIN_STATES = {
  SIGN_IN: "signIn",
  LOADING: "loading",
  MFA: "mfa",
  LOGGED_IN: "loggedIn",
  NEW_PASSWORD: "newPassword",
  FAILED_LOGIN: "loginFailed"
};
exports.LOGIN_STATES = LOGIN_STATES;
var AuthStateStore = (_class = (_temp =
/*#__PURE__*/
function () {
  function AuthStateStore() {
    var _this = this;

    _classCallCheck(this, AuthStateStore);

    this.configuration = null;
    this.userPool = null;
    this.handlers = {
      onSuccess: function onSuccess(result) {
        return _this.handleOnSuccessLogin(result);
      },
      onFailure: function onFailure(err) {
        return _this.handleOnFailureLogin(err);
      },
      mfaRequired: function mfaRequired(codeDeliveryDetails) {
        return _this.handleMFARequired(codeDeliveryDetails);
      },
      newPasswordRequired: function newPasswordRequired(userAttributes, requiredAttributes) {
        return _this.handleNewPassword(userAttributes, requiredAttributes);
      }
    };

    _initializerDefineProperty(this, "userSession", _descriptor, this);

    _initializerDefineProperty(this, "cognitoUser", _descriptor2, this);

    _initializerDefineProperty(this, "loginState", _descriptor3, this);

    _initializerDefineProperty(this, "loginError", _descriptor4, this);

    _initializerDefineProperty(this, "accessToken", _descriptor5, this);

    _initializerDefineProperty(this, "idToken", _descriptor6, this);

    _initializerDefineProperty(this, "userAttributes", _descriptor7, this);

    _initializerDefineProperty(this, "requiredAttributes", _descriptor8, this);

    _initializerDefineProperty(this, "setLoginState", _descriptor9, this);
  }

  _createClass(AuthStateStore, [{
    key: "configure",

    /**
     * Sets configuration for Cognito
     *
     * @param {Object} config - The Cognito configuration
     */
    value: function configure(config) {
      this.configuration = {
        UserPoolId: config.UserPoolId,
        ClientId: config.ClientId
      };

      if (config.CookieStorage) {
        this.configuration.Storage = new AmazonCognitoIdentity.CookieStorage(_objectSpread({}, config.CookieStorage));
      }
    }
    /**
     * Lazy-initializes the UserPool
     * @returns {Object} The UserPool
     */

  }, {
    key: "getUserPool",
    value: function getUserPool() {
      if (!this.userPool) this.userPool = new _amazonCognitoIdentityJs.CognitoUserPool(this.configuration);
      return this.userPool;
    }
    /**
     * Lazy-initializes the CognitoUser
     * @param {Object} userData The UserData
     * @returns {Object} The CognitoUser object
     */

  }, {
    key: "getCognitoUser",
    value: function getCognitoUser(userData) {
      if (!this.cognitoUser) this.cognitoUser = new _amazonCognitoIdentityJs.CognitoUser(userData);
      return this.cognitoUser;
    }
  }, {
    key: "handleOnSuccessLogin",
    value: function handleOnSuccessLogin(result) {
      this.userSession = result;
      this.accessToken = result.getAccessToken();
      this.idToken = result.idToken;
      this.loginError = null;
      this.setLoginState(LOGIN_STATES.LOGGED_IN);
    }
  }, {
    key: "handleOnFailureLogin",
    value: function handleOnFailureLogin(err) {
      this.setLoginState(LOGIN_STATES.FAILED_LOGIN);
      this.loginError = err;
    }
  }, {
    key: "handleMFARequired",
    value: function handleMFARequired(codeDeliveryDetails) {
      this.setLoginState(LOGIN_STATES.MFA);
    }
  }, {
    key: "handleNewPassword",
    value: function handleNewPassword(userAttributes, requiredAttributes) {
      this.userAttributes = userAttributes;
      this.requiredAttributes = requiredAttributes;
      this.setLoginState(LOGIN_STATES.NEW_PASSWORD);
    }
    /**
     * Authenticates the given user
     * @param {string} username The username
     * @param {string} password The password
     */

  }, {
    key: "signIn",
    value: function signIn(username, password) {
      var authenticationData = {
        Username: username,
        Password: password
      };

      var userData = _objectSpread({
        Username: username,
        Pool: this.getUserPool()
      }, this.configuration.Storage);

      var authenticationDetails = new _amazonCognitoIdentityJs.AuthenticationDetails(authenticationData);
      this.getCognitoUser(userData).authenticateUser(authenticationDetails, this.handlers);
    }
    /**
     * Signs the current user out
     */

  }, {
    key: "signOut",
    value: function signOut() {
      var user = this.getCognitoUser();
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

  }, {
    key: "confirmMFA",
    value: function confirmMFA(code) {
      this.getCognitoUser().sendMFACode(code, this.handlers);
    }
  }, {
    key: "completeNewPasswordChallenge",
    value: function completeNewPasswordChallenge(newPassword, attributesData) {
      this.getCognitoUser().completeNewPasswordChallenge(newPassword, attributesData, this.handlers);
    }
  }]);

  return AuthStateStore;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "userSession", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "cognitoUser", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "loginState", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return LOGIN_STATES.SIGN_IN;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "loginError", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "accessToken", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "idToken", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "userAttributes", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "requiredAttributes", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, "signIn", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "signIn"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "signOut", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "signOut"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "confirmMFA", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "confirmMFA"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "completeNewPasswordChallenge", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "completeNewPasswordChallenge"), _class.prototype), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "setLoginState", [_mobx.action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (newState) {
      _this2.loginState = newState;
    };
  }
})), _class);
var _default = AuthStateStore;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoU3RhdGVTdG9yZS5qcyJdLCJuYW1lcyI6WyJMT0dJTl9TVEFURVMiLCJTSUdOX0lOIiwiTE9BRElORyIsIk1GQSIsIkxPR0dFRF9JTiIsIk5FV19QQVNTV09SRCIsIkZBSUxFRF9MT0dJTiIsIkF1dGhTdGF0ZVN0b3JlIiwiY29uZmlndXJhdGlvbiIsInVzZXJQb29sIiwiaGFuZGxlcnMiLCJvblN1Y2Nlc3MiLCJyZXN1bHQiLCJoYW5kbGVPblN1Y2Nlc3NMb2dpbiIsIm9uRmFpbHVyZSIsImVyciIsImhhbmRsZU9uRmFpbHVyZUxvZ2luIiwibWZhUmVxdWlyZWQiLCJjb2RlRGVsaXZlcnlEZXRhaWxzIiwiaGFuZGxlTUZBUmVxdWlyZWQiLCJuZXdQYXNzd29yZFJlcXVpcmVkIiwidXNlckF0dHJpYnV0ZXMiLCJyZXF1aXJlZEF0dHJpYnV0ZXMiLCJoYW5kbGVOZXdQYXNzd29yZCIsImNvbmZpZyIsIlVzZXJQb29sSWQiLCJDbGllbnRJZCIsIkNvb2tpZVN0b3JhZ2UiLCJTdG9yYWdlIiwiQW1hem9uQ29nbml0b0lkZW50aXR5IiwiQ29nbml0b1VzZXJQb29sIiwidXNlckRhdGEiLCJjb2duaXRvVXNlciIsIkNvZ25pdG9Vc2VyIiwidXNlclNlc3Npb24iLCJhY2Nlc3NUb2tlbiIsImdldEFjY2Vzc1Rva2VuIiwiaWRUb2tlbiIsImxvZ2luRXJyb3IiLCJzZXRMb2dpblN0YXRlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGhlbnRpY2F0aW9uRGF0YSIsIlVzZXJuYW1lIiwiUGFzc3dvcmQiLCJQb29sIiwiZ2V0VXNlclBvb2wiLCJhdXRoZW50aWNhdGlvbkRldGFpbHMiLCJBdXRoZW50aWNhdGlvbkRldGFpbHMiLCJnZXRDb2duaXRvVXNlciIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ1c2VyIiwic2lnbk91dCIsImNvZGUiLCJzZW5kTUZBQ29kZSIsIm5ld1Bhc3N3b3JkIiwiYXR0cmlidXRlc0RhdGEiLCJjb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlIiwib2JzZXJ2YWJsZSIsImFjdGlvbiIsIm5ld1N0YXRlIiwibG9naW5TdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLElBQU1BLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsT0FBTyxFQUFFLFFBRFU7QUFFbkJDLEVBQUFBLE9BQU8sRUFBRSxTQUZVO0FBR25CQyxFQUFBQSxHQUFHLEVBQUUsS0FIYztBQUluQkMsRUFBQUEsU0FBUyxFQUFFLFVBSlE7QUFLbkJDLEVBQUFBLFlBQVksRUFBRSxhQUxLO0FBTW5CQyxFQUFBQSxZQUFZLEVBQUU7QUFOSyxDQUFyQjs7SUFTTUMsYzs7Ozs7Ozs7U0FDSkMsYSxHQUFnQixJO1NBQ2hCQyxRLEdBQVcsSTtTQUVYQyxRLEdBQVc7QUFDVEMsTUFBQUEsU0FBUyxFQUFFLG1CQUFBQyxNQUFNO0FBQUEsZUFBSSxLQUFJLENBQUNDLG9CQUFMLENBQTBCRCxNQUExQixDQUFKO0FBQUEsT0FEUjtBQUVURSxNQUFBQSxTQUFTLEVBQUUsbUJBQUFDLEdBQUc7QUFBQSxlQUFJLEtBQUksQ0FBQ0Msb0JBQUwsQ0FBMEJELEdBQTFCLENBQUo7QUFBQSxPQUZMO0FBR1RFLE1BQUFBLFdBQVcsRUFBRSxxQkFBQUMsbUJBQW1CO0FBQUEsZUFDOUIsS0FBSSxDQUFDQyxpQkFBTCxDQUF1QkQsbUJBQXZCLENBRDhCO0FBQUEsT0FIdkI7QUFLVEUsTUFBQUEsbUJBQW1CLEVBQUUsNkJBQUNDLGNBQUQsRUFBaUJDLGtCQUFqQjtBQUFBLGVBQ25CLEtBQUksQ0FBQ0MsaUJBQUwsQ0FBdUJGLGNBQXZCLEVBQXVDQyxrQkFBdkMsQ0FEbUI7QUFBQTtBQUxaLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CWDs7Ozs7OEJBS1VFLE0sRUFBUTtBQUNoQixXQUFLaEIsYUFBTCxHQUFxQjtBQUNuQmlCLFFBQUFBLFVBQVUsRUFBRUQsTUFBTSxDQUFDQyxVQURBO0FB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Ozs7V0FBeUIsSTs7K0VBQ3pCQSxnQjs7Ozs7V0FBeUIsSTs7OEVBQ3pCQSxnQjs7Ozs7V0FBd0IxRCxZQUFZLENBQUNDLE87OzhFQUNyQ3lELGdCOzs7OztXQUF3QixJOzsrRUFDeEJBLGdCOzs7OztXQUF5QixJOzsyRUFDekJBLGdCOzs7OztXQUFxQixJOztrRkFHckJBLGdCOzs7OztXQUE0QixJOztzRkFDNUJBLGdCOzs7OztXQUFnQyxJOzsyREFrRWhDQyxZLDJJQWlCQUEsWSwrSUFlQUEsWSxvS0FJQUEsWSxzTEFRQUEsWTs7Ozs7OztXQUF1QixVQUFBQyxRQUFRLEVBQUk7QUFDbEMsTUFBQSxNQUFJLENBQUNDLFVBQUwsR0FBa0JELFFBQWxCO0FBQ0QsSzs7O2VBSVlyRCxjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCB7XG4gIENvZ25pdG9Vc2VyUG9vbCxcbiAgQXV0aGVudGljYXRpb25EZXRhaWxzLFxuICBDb2duaXRvVXNlclxufSBmcm9tIFwiYW1hem9uLWNvZ25pdG8taWRlbnRpdHktanNcIjtcblxuY29uc3QgTE9HSU5fU1RBVEVTID0ge1xuICBTSUdOX0lOOiBcInNpZ25JblwiLFxuICBMT0FESU5HOiBcImxvYWRpbmdcIixcbiAgTUZBOiBcIm1mYVwiLFxuICBMT0dHRURfSU46IFwibG9nZ2VkSW5cIixcbiAgTkVXX1BBU1NXT1JEOiBcIm5ld1Bhc3N3b3JkXCIsXG4gIEZBSUxFRF9MT0dJTjogXCJsb2dpbkZhaWxlZFwiXG59O1xuXG5jbGFzcyBBdXRoU3RhdGVTdG9yZSB7XG4gIGNvbmZpZ3VyYXRpb24gPSBudWxsO1xuICB1c2VyUG9vbCA9IG51bGw7XG5cbiAgaGFuZGxlcnMgPSB7XG4gICAgb25TdWNjZXNzOiByZXN1bHQgPT4gdGhpcy5oYW5kbGVPblN1Y2Nlc3NMb2dpbihyZXN1bHQpLFxuICAgIG9uRmFpbHVyZTogZXJyID0+IHRoaXMuaGFuZGxlT25GYWlsdXJlTG9naW4oZXJyKSxcbiAgICBtZmFSZXF1aXJlZDogY29kZURlbGl2ZXJ5RGV0YWlscyA9PlxuICAgICAgdGhpcy5oYW5kbGVNRkFSZXF1aXJlZChjb2RlRGVsaXZlcnlEZXRhaWxzKSxcbiAgICBuZXdQYXNzd29yZFJlcXVpcmVkOiAodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcykgPT5cbiAgICAgIHRoaXMuaGFuZGxlTmV3UGFzc3dvcmQodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcylcbiAgfTtcblxuICBAb2JzZXJ2YWJsZSB1c2VyU2Vzc2lvbiA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGNvZ25pdG9Vc2VyID0gbnVsbDtcbiAgQG9ic2VydmFibGUgbG9naW5TdGF0ZSA9IExPR0lOX1NUQVRFUy5TSUdOX0lOO1xuICBAb2JzZXJ2YWJsZSBsb2dpbkVycm9yID0gbnVsbDtcbiAgQG9ic2VydmFibGUgYWNjZXNzVG9rZW4gPSBudWxsO1xuICBAb2JzZXJ2YWJsZSBpZFRva2VuID0gbnVsbDtcblxuICAvLyBUaGVzZSBhcmUgb25seSBzZXQgd2hlbiBhIG5ldyBwYXNzd29yZCBpcyByZXF1aXJlZFxuICBAb2JzZXJ2YWJsZSB1c2VyQXR0cmlidXRlcyA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIHJlcXVpcmVkQXR0cmlidXRlcyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldHMgY29uZmlndXJhdGlvbiBmb3IgQ29nbml0b1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIENvZ25pdG8gY29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uZmlndXJlKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHtcbiAgICAgIFVzZXJQb29sSWQ6IGNvbmZpZy5Vc2VyUG9vbElkLFxuICAgICAgQ2xpZW50SWQ6IGNvbmZpZy5DbGllbnRJZFxuICAgIH07XG4gICAgaWYgKGNvbmZpZy5Db29raWVTdG9yYWdlKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uU3RvcmFnZSA9IG5ldyBBbWF6b25Db2duaXRvSWRlbnRpdHkuQ29va2llU3RvcmFnZSh7XG4gICAgICAgIC4uLmNvbmZpZy5Db29raWVTdG9yYWdlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGF6eS1pbml0aWFsaXplcyB0aGUgVXNlclBvb2xcbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIFVzZXJQb29sXG4gICAqL1xuICBnZXRVc2VyUG9vbCgpIHtcbiAgICBpZiAoIXRoaXMudXNlclBvb2wpIHRoaXMudXNlclBvb2wgPSBuZXcgQ29nbml0b1VzZXJQb29sKHRoaXMuY29uZmlndXJhdGlvbik7XG4gICAgcmV0dXJuIHRoaXMudXNlclBvb2w7XG4gIH1cblxuICAvKipcbiAgICogTGF6eS1pbml0aWFsaXplcyB0aGUgQ29nbml0b1VzZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IHVzZXJEYXRhIFRoZSBVc2VyRGF0YVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgQ29nbml0b1VzZXIgb2JqZWN0XG4gICAqL1xuICBnZXRDb2duaXRvVXNlcih1c2VyRGF0YSkge1xuICAgIGlmICghdGhpcy5jb2duaXRvVXNlcikgdGhpcy5jb2duaXRvVXNlciA9IG5ldyBDb2duaXRvVXNlcih1c2VyRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29nbml0b1VzZXI7XG4gIH1cblxuICBoYW5kbGVPblN1Y2Nlc3NMb2dpbihyZXN1bHQpIHtcbiAgICB0aGlzLnVzZXJTZXNzaW9uID0gcmVzdWx0O1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSByZXN1bHQuZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICB0aGlzLmlkVG9rZW4gPSByZXN1bHQuaWRUb2tlbjtcbiAgICB0aGlzLmxvZ2luRXJyb3IgPSBudWxsO1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuTE9HR0VEX0lOKTtcbiAgfVxuXG4gIGhhbmRsZU9uRmFpbHVyZUxvZ2luKGVycikge1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuRkFJTEVEX0xPR0lOKTtcbiAgICB0aGlzLmxvZ2luRXJyb3IgPSBlcnI7XG4gIH1cblxuICBoYW5kbGVNRkFSZXF1aXJlZChjb2RlRGVsaXZlcnlEZXRhaWxzKSB7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5NRkEpO1xuICB9XG5cbiAgaGFuZGxlTmV3UGFzc3dvcmQodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcykge1xuICAgIHRoaXMudXNlckF0dHJpYnV0ZXMgPSB1c2VyQXR0cmlidXRlcztcbiAgICB0aGlzLnJlcXVpcmVkQXR0cmlidXRlcyA9IHJlcXVpcmVkQXR0cmlidXRlcztcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLk5FV19QQVNTV09SRCk7XG4gIH1cblxuICAvKipcbiAgICogQXV0aGVudGljYXRlcyB0aGUgZ2l2ZW4gdXNlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgVGhlIHVzZXJuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmRcbiAgICovXG4gIEBhY3Rpb24gc2lnbkluKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uRGF0YSA9IHsgVXNlcm5hbWU6IHVzZXJuYW1lLCBQYXNzd29yZDogcGFzc3dvcmQgfTtcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgIFBvb2w6IHRoaXMuZ2V0VXNlclBvb2woKSxcbiAgICAgIC4uLnRoaXMuY29uZmlndXJhdGlvbi5TdG9yYWdlXG4gICAgfTtcbiAgICBjb25zdCBhdXRoZW50aWNhdGlvbkRldGFpbHMgPSBuZXcgQXV0aGVudGljYXRpb25EZXRhaWxzKGF1dGhlbnRpY2F0aW9uRGF0YSk7XG4gICAgdGhpcy5nZXRDb2duaXRvVXNlcih1c2VyRGF0YSkuYXV0aGVudGljYXRlVXNlcihcbiAgICAgIGF1dGhlbnRpY2F0aW9uRGV0YWlscyxcbiAgICAgIHRoaXMuaGFuZGxlcnNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25zIHRoZSBjdXJyZW50IHVzZXIgb3V0XG4gICAqL1xuICBAYWN0aW9uXG4gIHNpZ25PdXQoKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0Q29nbml0b1VzZXIoKTtcbiAgICBpZiAodXNlcikgdXNlci5zaWduT3V0KCk7XG4gICAgdGhpcy51c2VyU2Vzc2lvbiA9IG51bGw7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgdGhpcy5pZFRva2VuID0gbnVsbDtcbiAgICB0aGlzLmxvZ2luRXJyb3IgPSBudWxsO1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuU0lHTl9JTik7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlybXMgdGhlIE1GQSBjb2RlIHRvIGNvbnRpbnVlIHRoZSBhdXRoZW50aWNhdGlvbiBwcm9jZWVkdXJlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBNRkEgY29kZVxuICAgKi9cbiAgQGFjdGlvbiBjb25maXJtTUZBKGNvZGUpIHtcbiAgICB0aGlzLmdldENvZ25pdG9Vc2VyKCkuc2VuZE1GQUNvZGUoY29kZSwgdGhpcy5oYW5kbGVycyk7XG4gIH1cblxuICBAYWN0aW9uIGNvbXBsZXRlTmV3UGFzc3dvcmRDaGFsbGVuZ2UobmV3UGFzc3dvcmQsIGF0dHJpYnV0ZXNEYXRhKSB7XG4gICAgdGhpcy5nZXRDb2duaXRvVXNlcigpLmNvbXBsZXRlTmV3UGFzc3dvcmRDaGFsbGVuZ2UoXG4gICAgICBuZXdQYXNzd29yZCxcbiAgICAgIGF0dHJpYnV0ZXNEYXRhLFxuICAgICAgdGhpcy5oYW5kbGVyc1xuICAgICk7XG4gIH1cblxuICBAYWN0aW9uIHNldExvZ2luU3RhdGUgPSBuZXdTdGF0ZSA9PiB7XG4gICAgdGhpcy5sb2dpblN0YXRlID0gbmV3U3RhdGU7XG4gIH07XG59XG5cbmV4cG9ydCB7IExPR0lOX1NUQVRFUyB9O1xuZXhwb3J0IGRlZmF1bHQgQXV0aFN0YXRlU3RvcmU7XG4iXX0=