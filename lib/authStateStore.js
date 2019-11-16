"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.reverse");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var LOGIN_STATES = {
  SIGN_IN: 'signIn',
  LOADING: 'loading',
  MFA: 'mfa',
  LOGGED_IN: 'loggedIn',
  NEW_PASSWORD: 'newPassword',
  FAILED_LOGIN: 'loginFailed'
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
        // eslint-disable-next-line no-undef
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
    } // eslint-disable-next-line no-unused-vars

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoU3RhdGVTdG9yZS5qcyJdLCJuYW1lcyI6WyJMT0dJTl9TVEFURVMiLCJTSUdOX0lOIiwiTE9BRElORyIsIk1GQSIsIkxPR0dFRF9JTiIsIk5FV19QQVNTV09SRCIsIkZBSUxFRF9MT0dJTiIsIkF1dGhTdGF0ZVN0b3JlIiwiY29uZmlndXJhdGlvbiIsInVzZXJQb29sIiwiaGFuZGxlcnMiLCJvblN1Y2Nlc3MiLCJyZXN1bHQiLCJoYW5kbGVPblN1Y2Nlc3NMb2dpbiIsIm9uRmFpbHVyZSIsImVyciIsImhhbmRsZU9uRmFpbHVyZUxvZ2luIiwibWZhUmVxdWlyZWQiLCJjb2RlRGVsaXZlcnlEZXRhaWxzIiwiaGFuZGxlTUZBUmVxdWlyZWQiLCJuZXdQYXNzd29yZFJlcXVpcmVkIiwidXNlckF0dHJpYnV0ZXMiLCJyZXF1aXJlZEF0dHJpYnV0ZXMiLCJoYW5kbGVOZXdQYXNzd29yZCIsImNvbmZpZyIsIlVzZXJQb29sSWQiLCJDbGllbnRJZCIsIkNvb2tpZVN0b3JhZ2UiLCJTdG9yYWdlIiwiQW1hem9uQ29nbml0b0lkZW50aXR5IiwiQ29nbml0b1VzZXJQb29sIiwidXNlckRhdGEiLCJjb2duaXRvVXNlciIsIkNvZ25pdG9Vc2VyIiwidXNlclNlc3Npb24iLCJhY2Nlc3NUb2tlbiIsImdldEFjY2Vzc1Rva2VuIiwiaWRUb2tlbiIsImxvZ2luRXJyb3IiLCJzZXRMb2dpblN0YXRlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGhlbnRpY2F0aW9uRGF0YSIsIlVzZXJuYW1lIiwiUGFzc3dvcmQiLCJQb29sIiwiZ2V0VXNlclBvb2wiLCJhdXRoZW50aWNhdGlvbkRldGFpbHMiLCJBdXRoZW50aWNhdGlvbkRldGFpbHMiLCJnZXRDb2duaXRvVXNlciIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ1c2VyIiwic2lnbk91dCIsImNvZGUiLCJzZW5kTUZBQ29kZSIsIm5ld1Bhc3N3b3JkIiwiYXR0cmlidXRlc0RhdGEiLCJjb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlIiwib2JzZXJ2YWJsZSIsImFjdGlvbiIsIm5ld1N0YXRlIiwibG9naW5TdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHO0FBQ25CQyxFQUFBQSxPQUFPLEVBQUUsUUFEVTtBQUVuQkMsRUFBQUEsT0FBTyxFQUFFLFNBRlU7QUFHbkJDLEVBQUFBLEdBQUcsRUFBRSxLQUhjO0FBSW5CQyxFQUFBQSxTQUFTLEVBQUUsVUFKUTtBQUtuQkMsRUFBQUEsWUFBWSxFQUFFLGFBTEs7QUFNbkJDLEVBQUFBLFlBQVksRUFBRTtBQU5LLENBQXJCOztJQVNNQyxjOzs7Ozs7OztTQUNKQyxhLEdBQWdCLEk7U0FDaEJDLFEsR0FBVyxJO1NBRVhDLFEsR0FBVztBQUNUQyxNQUFBQSxTQUFTLEVBQUUsbUJBQUFDLE1BQU07QUFBQSxlQUFJLEtBQUksQ0FBQ0Msb0JBQUwsQ0FBMEJELE1BQTFCLENBQUo7QUFBQSxPQURSO0FBRVRFLE1BQUFBLFNBQVMsRUFBRSxtQkFBQUMsR0FBRztBQUFBLGVBQUksS0FBSSxDQUFDQyxvQkFBTCxDQUEwQkQsR0FBMUIsQ0FBSjtBQUFBLE9BRkw7QUFHVEUsTUFBQUEsV0FBVyxFQUFFLHFCQUFBQyxtQkFBbUI7QUFBQSxlQUFJLEtBQUksQ0FBQ0MsaUJBQUwsQ0FBdUJELG1CQUF2QixDQUFKO0FBQUEsT0FIdkI7QUFJVEUsTUFBQUEsbUJBQW1CLEVBQUUsNkJBQUNDLGNBQUQsRUFBaUJDLGtCQUFqQjtBQUFBLGVBQ25CLEtBQUksQ0FBQ0MsaUJBQUwsQ0FBdUJGLGNBQXZCLEVBQXVDQyxrQkFBdkMsQ0FEbUI7QUFBQTtBQUpaLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CWDs7Ozs7OEJBS1VFLE0sRUFBUTtBQUNoQixXQUFLaEIsYUFBTCxHQUFxQjtBQUNuQmlCLFFBQUFBLFVBQVUsRUFBRUQsTUFBTSxDQUFDQyxVQURBO0FB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RjtBQUNEOzs7O3dGQWhIQWdELGdCOzs7OztXQUF5QixJOzsrRUFDekJBLGdCOzs7OztXQUF5QixJOzs4RUFDekJBLGdCOzs7OztXQUF3QjFELFlBQVksQ0FBQ0MsTzs7OEVBQ3JDeUQsZ0I7Ozs7O1dBQXdCLEk7OytFQUN4QkEsZ0I7Ozs7O1dBQXlCLEk7OzJFQUN6QkEsZ0I7Ozs7O1dBQXFCLEk7O2tGQUdyQkEsZ0I7Ozs7O1dBQTRCLEk7O3NGQUM1QkEsZ0I7Ozs7O1dBQWdDLEk7OzJEQW9FaENDLFksMklBY0FBLFksK0lBZUFBLFksb0tBSUFBLFksc0xBSUFBLFk7Ozs7Ozs7V0FBdUIsVUFBQUMsUUFBUSxFQUFJO0FBQ2xDLE1BQUEsTUFBSSxDQUFDQyxVQUFMLEdBQWtCRCxRQUFsQjtBQUNELEs7OztlQUlZckQsYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9ic2VydmFibGUsIGFjdGlvbiB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHsgQ29nbml0b1VzZXJQb29sLCBBdXRoZW50aWNhdGlvbkRldGFpbHMsIENvZ25pdG9Vc2VyIH0gZnJvbSAnYW1hem9uLWNvZ25pdG8taWRlbnRpdHktanMnO1xuXG5jb25zdCBMT0dJTl9TVEFURVMgPSB7XG4gIFNJR05fSU46ICdzaWduSW4nLFxuICBMT0FESU5HOiAnbG9hZGluZycsXG4gIE1GQTogJ21mYScsXG4gIExPR0dFRF9JTjogJ2xvZ2dlZEluJyxcbiAgTkVXX1BBU1NXT1JEOiAnbmV3UGFzc3dvcmQnLFxuICBGQUlMRURfTE9HSU46ICdsb2dpbkZhaWxlZCcsXG59O1xuXG5jbGFzcyBBdXRoU3RhdGVTdG9yZSB7XG4gIGNvbmZpZ3VyYXRpb24gPSBudWxsO1xuICB1c2VyUG9vbCA9IG51bGw7XG5cbiAgaGFuZGxlcnMgPSB7XG4gICAgb25TdWNjZXNzOiByZXN1bHQgPT4gdGhpcy5oYW5kbGVPblN1Y2Nlc3NMb2dpbihyZXN1bHQpLFxuICAgIG9uRmFpbHVyZTogZXJyID0+IHRoaXMuaGFuZGxlT25GYWlsdXJlTG9naW4oZXJyKSxcbiAgICBtZmFSZXF1aXJlZDogY29kZURlbGl2ZXJ5RGV0YWlscyA9PiB0aGlzLmhhbmRsZU1GQVJlcXVpcmVkKGNvZGVEZWxpdmVyeURldGFpbHMpLFxuICAgIG5ld1Bhc3N3b3JkUmVxdWlyZWQ6ICh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKSA9PlxuICAgICAgdGhpcy5oYW5kbGVOZXdQYXNzd29yZCh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKSxcbiAgfTtcblxuICBAb2JzZXJ2YWJsZSB1c2VyU2Vzc2lvbiA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGNvZ25pdG9Vc2VyID0gbnVsbDtcbiAgQG9ic2VydmFibGUgbG9naW5TdGF0ZSA9IExPR0lOX1NUQVRFUy5TSUdOX0lOO1xuICBAb2JzZXJ2YWJsZSBsb2dpbkVycm9yID0gbnVsbDtcbiAgQG9ic2VydmFibGUgYWNjZXNzVG9rZW4gPSBudWxsO1xuICBAb2JzZXJ2YWJsZSBpZFRva2VuID0gbnVsbDtcblxuICAvLyBUaGVzZSBhcmUgb25seSBzZXQgd2hlbiBhIG5ldyBwYXNzd29yZCBpcyByZXF1aXJlZFxuICBAb2JzZXJ2YWJsZSB1c2VyQXR0cmlidXRlcyA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIHJlcXVpcmVkQXR0cmlidXRlcyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFNldHMgY29uZmlndXJhdGlvbiBmb3IgQ29nbml0b1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gVGhlIENvZ25pdG8gY29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uZmlndXJlKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHtcbiAgICAgIFVzZXJQb29sSWQ6IGNvbmZpZy5Vc2VyUG9vbElkLFxuICAgICAgQ2xpZW50SWQ6IGNvbmZpZy5DbGllbnRJZCxcbiAgICB9O1xuICAgIGlmIChjb25maWcuQ29va2llU3RvcmFnZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uU3RvcmFnZSA9IG5ldyBBbWF6b25Db2duaXRvSWRlbnRpdHkuQ29va2llU3RvcmFnZSh7XG4gICAgICAgIC4uLmNvbmZpZy5Db29raWVTdG9yYWdlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExhenktaW5pdGlhbGl6ZXMgdGhlIFVzZXJQb29sXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBVc2VyUG9vbFxuICAgKi9cbiAgZ2V0VXNlclBvb2woKSB7XG4gICAgaWYgKCF0aGlzLnVzZXJQb29sKSB0aGlzLnVzZXJQb29sID0gbmV3IENvZ25pdG9Vc2VyUG9vbCh0aGlzLmNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzLnVzZXJQb29sO1xuICB9XG5cbiAgLyoqXG4gICAqIExhenktaW5pdGlhbGl6ZXMgdGhlIENvZ25pdG9Vc2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyRGF0YSBUaGUgVXNlckRhdGFcbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIENvZ25pdG9Vc2VyIG9iamVjdFxuICAgKi9cbiAgZ2V0Q29nbml0b1VzZXIodXNlckRhdGEpIHtcbiAgICBpZiAoIXRoaXMuY29nbml0b1VzZXIpIHRoaXMuY29nbml0b1VzZXIgPSBuZXcgQ29nbml0b1VzZXIodXNlckRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvZ25pdG9Vc2VyO1xuICB9XG5cbiAgaGFuZGxlT25TdWNjZXNzTG9naW4ocmVzdWx0KSB7XG4gICAgdGhpcy51c2VyU2Vzc2lvbiA9IHJlc3VsdDtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gcmVzdWx0LmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgdGhpcy5pZFRva2VuID0gcmVzdWx0LmlkVG9rZW47XG4gICAgdGhpcy5sb2dpbkVycm9yID0gbnVsbDtcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLkxPR0dFRF9JTik7XG4gIH1cblxuICBoYW5kbGVPbkZhaWx1cmVMb2dpbihlcnIpIHtcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLkZBSUxFRF9MT0dJTik7XG4gICAgdGhpcy5sb2dpbkVycm9yID0gZXJyO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGhhbmRsZU1GQVJlcXVpcmVkKGNvZGVEZWxpdmVyeURldGFpbHMpIHtcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLk1GQSk7XG4gIH1cblxuICBoYW5kbGVOZXdQYXNzd29yZCh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy51c2VyQXR0cmlidXRlcyA9IHVzZXJBdHRyaWJ1dGVzO1xuICAgIHRoaXMucmVxdWlyZWRBdHRyaWJ1dGVzID0gcmVxdWlyZWRBdHRyaWJ1dGVzO1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuTkVXX1BBU1NXT1JEKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRoZW50aWNhdGVzIHRoZSBnaXZlbiB1c2VyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSBUaGUgdXNlcm5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZFxuICAgKi9cbiAgQGFjdGlvbiBzaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgYXV0aGVudGljYXRpb25EYXRhID0geyBVc2VybmFtZTogdXNlcm5hbWUsIFBhc3N3b3JkOiBwYXNzd29yZCB9O1xuICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgUG9vbDogdGhpcy5nZXRVc2VyUG9vbCgpLFxuICAgICAgLi4udGhpcy5jb25maWd1cmF0aW9uLlN0b3JhZ2UsXG4gICAgfTtcbiAgICBjb25zdCBhdXRoZW50aWNhdGlvbkRldGFpbHMgPSBuZXcgQXV0aGVudGljYXRpb25EZXRhaWxzKGF1dGhlbnRpY2F0aW9uRGF0YSk7XG4gICAgdGhpcy5nZXRDb2duaXRvVXNlcih1c2VyRGF0YSkuYXV0aGVudGljYXRlVXNlcihhdXRoZW50aWNhdGlvbkRldGFpbHMsIHRoaXMuaGFuZGxlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25zIHRoZSBjdXJyZW50IHVzZXIgb3V0XG4gICAqL1xuICBAYWN0aW9uXG4gIHNpZ25PdXQoKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMuZ2V0Q29nbml0b1VzZXIoKTtcbiAgICBpZiAodXNlcikgdXNlci5zaWduT3V0KCk7XG4gICAgdGhpcy51c2VyU2Vzc2lvbiA9IG51bGw7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgdGhpcy5pZFRva2VuID0gbnVsbDtcbiAgICB0aGlzLmxvZ2luRXJyb3IgPSBudWxsO1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuU0lHTl9JTik7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlybXMgdGhlIE1GQSBjb2RlIHRvIGNvbnRpbnVlIHRoZSBhdXRoZW50aWNhdGlvbiBwcm9jZWVkdXJlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBNRkEgY29kZVxuICAgKi9cbiAgQGFjdGlvbiBjb25maXJtTUZBKGNvZGUpIHtcbiAgICB0aGlzLmdldENvZ25pdG9Vc2VyKCkuc2VuZE1GQUNvZGUoY29kZSwgdGhpcy5oYW5kbGVycyk7XG4gIH1cblxuICBAYWN0aW9uIGNvbXBsZXRlTmV3UGFzc3dvcmRDaGFsbGVuZ2UobmV3UGFzc3dvcmQsIGF0dHJpYnV0ZXNEYXRhKSB7XG4gICAgdGhpcy5nZXRDb2duaXRvVXNlcigpLmNvbXBsZXRlTmV3UGFzc3dvcmRDaGFsbGVuZ2UobmV3UGFzc3dvcmQsIGF0dHJpYnV0ZXNEYXRhLCB0aGlzLmhhbmRsZXJzKTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0TG9naW5TdGF0ZSA9IG5ld1N0YXRlID0+IHtcbiAgICB0aGlzLmxvZ2luU3RhdGUgPSBuZXdTdGF0ZTtcbiAgfTtcbn1cblxuZXhwb3J0IHsgTE9HSU5fU1RBVEVTIH07XG5leHBvcnQgZGVmYXVsdCBBdXRoU3RhdGVTdG9yZTtcbiJdfQ==