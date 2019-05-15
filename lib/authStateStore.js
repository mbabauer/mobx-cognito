"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LOGIN_STATES = void 0;

var _mobx = require("mobx");

var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoU3RhdGVTdG9yZS5qcyJdLCJuYW1lcyI6WyJMT0dJTl9TVEFURVMiLCJTSUdOX0lOIiwiTE9BRElORyIsIk1GQSIsIkxPR0dFRF9JTiIsIk5FV19QQVNTV09SRCIsIkZBSUxFRF9MT0dJTiIsIkF1dGhTdGF0ZVN0b3JlIiwiY29uZmlndXJhdGlvbiIsInVzZXJQb29sIiwiaGFuZGxlcnMiLCJvblN1Y2Nlc3MiLCJyZXN1bHQiLCJoYW5kbGVPblN1Y2Nlc3NMb2dpbiIsIm9uRmFpbHVyZSIsImVyciIsImhhbmRsZU9uRmFpbHVyZUxvZ2luIiwibWZhUmVxdWlyZWQiLCJjb2RlRGVsaXZlcnlEZXRhaWxzIiwiaGFuZGxlTUZBUmVxdWlyZWQiLCJuZXdQYXNzd29yZFJlcXVpcmVkIiwidXNlckF0dHJpYnV0ZXMiLCJyZXF1aXJlZEF0dHJpYnV0ZXMiLCJoYW5kbGVOZXdQYXNzd29yZCIsImNvbmZpZyIsIlVzZXJQb29sSWQiLCJDbGllbnRJZCIsIkNvb2tpZVN0b3JhZ2UiLCJTdG9yYWdlIiwiQW1hem9uQ29nbml0b0lkZW50aXR5IiwiQ29nbml0b1VzZXJQb29sIiwidXNlckRhdGEiLCJjb2duaXRvVXNlciIsIkNvZ25pdG9Vc2VyIiwidXNlclNlc3Npb24iLCJhY2Nlc3NUb2tlbiIsImdldEFjY2Vzc1Rva2VuIiwiaWRUb2tlbiIsImxvZ2luRXJyb3IiLCJzZXRMb2dpblN0YXRlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGhlbnRpY2F0aW9uRGF0YSIsIlVzZXJuYW1lIiwiUGFzc3dvcmQiLCJQb29sIiwiZ2V0VXNlclBvb2wiLCJhdXRoZW50aWNhdGlvbkRldGFpbHMiLCJBdXRoZW50aWNhdGlvbkRldGFpbHMiLCJnZXRDb2duaXRvVXNlciIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ1c2VyIiwic2lnbk91dCIsImNvZGUiLCJzZW5kTUZBQ29kZSIsIm5ld1Bhc3N3b3JkIiwiYXR0cmlidXRlc0RhdGEiLCJjb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlIiwib2JzZXJ2YWJsZSIsImFjdGlvbiIsIm5ld1N0YXRlIiwibG9naW5TdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsSUFBTUEsWUFBWSxHQUFHO0FBQ25CQyxFQUFBQSxPQUFPLEVBQUUsUUFEVTtBQUVuQkMsRUFBQUEsT0FBTyxFQUFFLFNBRlU7QUFHbkJDLEVBQUFBLEdBQUcsRUFBRSxLQUhjO0FBSW5CQyxFQUFBQSxTQUFTLEVBQUUsVUFKUTtBQUtuQkMsRUFBQUEsWUFBWSxFQUFFLGFBTEs7QUFNbkJDLEVBQUFBLFlBQVksRUFBRTtBQU5LLENBQXJCOztJQVNNQyxjOzs7Ozs7OztTQUNKQyxhLEdBQWdCLEk7U0FDaEJDLFEsR0FBVyxJO1NBRVhDLFEsR0FBVztBQUNUQyxNQUFBQSxTQUFTLEVBQUUsbUJBQUFDLE1BQU07QUFBQSxlQUFJLEtBQUksQ0FBQ0Msb0JBQUwsQ0FBMEJELE1BQTFCLENBQUo7QUFBQSxPQURSO0FBRVRFLE1BQUFBLFNBQVMsRUFBRSxtQkFBQUMsR0FBRztBQUFBLGVBQUksS0FBSSxDQUFDQyxvQkFBTCxDQUEwQkQsR0FBMUIsQ0FBSjtBQUFBLE9BRkw7QUFHVEUsTUFBQUEsV0FBVyxFQUFFLHFCQUFBQyxtQkFBbUI7QUFBQSxlQUM5QixLQUFJLENBQUNDLGlCQUFMLENBQXVCRCxtQkFBdkIsQ0FEOEI7QUFBQSxPQUh2QjtBQUtURSxNQUFBQSxtQkFBbUIsRUFBRSw2QkFBQ0MsY0FBRCxFQUFpQkMsa0JBQWpCO0FBQUEsZUFDbkIsS0FBSSxDQUFDQyxpQkFBTCxDQUF1QkYsY0FBdkIsRUFBdUNDLGtCQUF2QyxDQURtQjtBQUFBO0FBTFosSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JYOzs7Ozs4QkFLVUUsTSxFQUFRO0FBQ2hCLFdBQUtoQixhQUFMLEdBQXFCO0FBQ25CaUIsUUFBQUEsVUFBVSxFQUFFRCxNQUFNLENBQUNDLFVBREE7QUFFbkJD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QUF5QixJOzsrRUFDekJBLGdCOzs7OztXQUF5QixJOzs4RUFDekJBLGdCOzs7OztXQUF3QjFELFlBQVksQ0FBQ0MsTzs7OEVBQ3JDeUQsZ0I7Ozs7O1dBQXdCLEk7OytFQUN4QkEsZ0I7Ozs7O1dBQXlCLEk7OzJFQUN6QkEsZ0I7Ozs7O1dBQXFCLEk7O2tGQUdyQkEsZ0I7Ozs7O1dBQTRCLEk7O3NGQUM1QkEsZ0I7Ozs7O1dBQWdDLEk7OzJEQWtFaENDLFksMklBaUJBQSxZLCtJQWVBQSxZLG9LQUlBQSxZLHNMQVFBQSxZOzs7Ozs7O1dBQXVCLFVBQUFDLFFBQVEsRUFBSTtBQUNsQyxNQUFBLE1BQUksQ0FBQ0MsVUFBTCxHQUFrQkQsUUFBbEI7QUFDRCxLOzs7ZUFJWXJELGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYnNlcnZhYmxlLCBhY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHtcbiAgQ29nbml0b1VzZXJQb29sLFxuICBBdXRoZW50aWNhdGlvbkRldGFpbHMsXG4gIENvZ25pdG9Vc2VyXG59IGZyb20gXCJhbWF6b24tY29nbml0by1pZGVudGl0eS1qc1wiO1xuXG5jb25zdCBMT0dJTl9TVEFURVMgPSB7XG4gIFNJR05fSU46IFwic2lnbkluXCIsXG4gIExPQURJTkc6IFwibG9hZGluZ1wiLFxuICBNRkE6IFwibWZhXCIsXG4gIExPR0dFRF9JTjogXCJsb2dnZWRJblwiLFxuICBORVdfUEFTU1dPUkQ6IFwibmV3UGFzc3dvcmRcIixcbiAgRkFJTEVEX0xPR0lOOiBcImxvZ2luRmFpbGVkXCJcbn07XG5cbmNsYXNzIEF1dGhTdGF0ZVN0b3JlIHtcbiAgY29uZmlndXJhdGlvbiA9IG51bGw7XG4gIHVzZXJQb29sID0gbnVsbDtcblxuICBoYW5kbGVycyA9IHtcbiAgICBvblN1Y2Nlc3M6IHJlc3VsdCA9PiB0aGlzLmhhbmRsZU9uU3VjY2Vzc0xvZ2luKHJlc3VsdCksXG4gICAgb25GYWlsdXJlOiBlcnIgPT4gdGhpcy5oYW5kbGVPbkZhaWx1cmVMb2dpbihlcnIpLFxuICAgIG1mYVJlcXVpcmVkOiBjb2RlRGVsaXZlcnlEZXRhaWxzID0+XG4gICAgICB0aGlzLmhhbmRsZU1GQVJlcXVpcmVkKGNvZGVEZWxpdmVyeURldGFpbHMpLFxuICAgIG5ld1Bhc3N3b3JkUmVxdWlyZWQ6ICh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKSA9PlxuICAgICAgdGhpcy5oYW5kbGVOZXdQYXNzd29yZCh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKVxuICB9O1xuXG4gIEBvYnNlcnZhYmxlIHVzZXJTZXNzaW9uID0gbnVsbDtcbiAgQG9ic2VydmFibGUgY29nbml0b1VzZXIgPSBudWxsO1xuICBAb2JzZXJ2YWJsZSBsb2dpblN0YXRlID0gTE9HSU5fU1RBVEVTLlNJR05fSU47XG4gIEBvYnNlcnZhYmxlIGxvZ2luRXJyb3IgPSBudWxsO1xuICBAb2JzZXJ2YWJsZSBhY2Nlc3NUb2tlbiA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGlkVG9rZW4gPSBudWxsO1xuXG4gIC8vIFRoZXNlIGFyZSBvbmx5IHNldCB3aGVuIGEgbmV3IHBhc3N3b3JkIGlzIHJlcXVpcmVkXG4gIEBvYnNlcnZhYmxlIHVzZXJBdHRyaWJ1dGVzID0gbnVsbDtcbiAgQG9ic2VydmFibGUgcmVxdWlyZWRBdHRyaWJ1dGVzID0gbnVsbDtcblxuICAvKipcbiAgICogU2V0cyBjb25maWd1cmF0aW9uIGZvciBDb2duaXRvXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgQ29nbml0byBjb25maWd1cmF0aW9uXG4gICAqL1xuICBjb25maWd1cmUoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0ge1xuICAgICAgVXNlclBvb2xJZDogY29uZmlnLlVzZXJQb29sSWQsXG4gICAgICBDbGllbnRJZDogY29uZmlnLkNsaWVudElkXG4gICAgfTtcbiAgICBpZiAoY29uZmlnLkNvb2tpZVN0b3JhZ2UpIHtcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5TdG9yYWdlID0gbmV3IEFtYXpvbkNvZ25pdG9JZGVudGl0eS5Db29raWVTdG9yYWdlKHtcbiAgICAgICAgLi4uY29uZmlnLkNvb2tpZVN0b3JhZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXp5LWluaXRpYWxpemVzIHRoZSBVc2VyUG9vbFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgVXNlclBvb2xcbiAgICovXG4gIGdldFVzZXJQb29sKCkge1xuICAgIGlmICghdGhpcy51c2VyUG9vbCkgdGhpcy51c2VyUG9vbCA9IG5ldyBDb2duaXRvVXNlclBvb2wodGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcy51c2VyUG9vbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMYXp5LWluaXRpYWxpemVzIHRoZSBDb2duaXRvVXNlclxuICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRhdGEgVGhlIFVzZXJEYXRhXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBDb2duaXRvVXNlciBvYmplY3RcbiAgICovXG4gIGdldENvZ25pdG9Vc2VyKHVzZXJEYXRhKSB7XG4gICAgaWYgKCF0aGlzLmNvZ25pdG9Vc2VyKSB0aGlzLmNvZ25pdG9Vc2VyID0gbmV3IENvZ25pdG9Vc2VyKHVzZXJEYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb2duaXRvVXNlcjtcbiAgfVxuXG4gIGhhbmRsZU9uU3VjY2Vzc0xvZ2luKHJlc3VsdCkge1xuICAgIHRoaXMudXNlclNlc3Npb24gPSByZXN1bHQ7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHJlc3VsdC5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIHRoaXMuaWRUb2tlbiA9IHJlc3VsdC5pZFRva2VuO1xuICAgIHRoaXMubG9naW5FcnJvciA9IG51bGw7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5MT0dHRURfSU4pO1xuICB9XG5cbiAgaGFuZGxlT25GYWlsdXJlTG9naW4oZXJyKSB7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5GQUlMRURfTE9HSU4pO1xuICAgIHRoaXMubG9naW5FcnJvciA9IGVycjtcbiAgfVxuXG4gIGhhbmRsZU1GQVJlcXVpcmVkKGNvZGVEZWxpdmVyeURldGFpbHMpIHtcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLk1GQSk7XG4gIH1cblxuICBoYW5kbGVOZXdQYXNzd29yZCh1c2VyQXR0cmlidXRlcywgcmVxdWlyZWRBdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy51c2VyQXR0cmlidXRlcyA9IHVzZXJBdHRyaWJ1dGVzO1xuICAgIHRoaXMucmVxdWlyZWRBdHRyaWJ1dGVzID0gcmVxdWlyZWRBdHRyaWJ1dGVzO1xuICAgIHRoaXMuc2V0TG9naW5TdGF0ZShMT0dJTl9TVEFURVMuTkVXX1BBU1NXT1JEKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRoZW50aWNhdGVzIHRoZSBnaXZlbiB1c2VyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSBUaGUgdXNlcm5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSBwYXNzd29yZFxuICAgKi9cbiAgQGFjdGlvbiBzaWduSW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgY29uc3QgYXV0aGVudGljYXRpb25EYXRhID0geyBVc2VybmFtZTogdXNlcm5hbWUsIFBhc3N3b3JkOiBwYXNzd29yZCB9O1xuICAgIGNvbnN0IHVzZXJEYXRhID0ge1xuICAgICAgVXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgUG9vbDogdGhpcy5nZXRVc2VyUG9vbCgpLFxuICAgICAgLi4udGhpcy5jb25maWd1cmF0aW9uLlN0b3JhZ2VcbiAgICB9O1xuICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uRGV0YWlscyA9IG5ldyBBdXRoZW50aWNhdGlvbkRldGFpbHMoYXV0aGVudGljYXRpb25EYXRhKTtcbiAgICB0aGlzLmdldENvZ25pdG9Vc2VyKHVzZXJEYXRhKS5hdXRoZW50aWNhdGVVc2VyKFxuICAgICAgYXV0aGVudGljYXRpb25EZXRhaWxzLFxuICAgICAgdGhpcy5oYW5kbGVyc1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogU2lnbnMgdGhlIGN1cnJlbnQgdXNlciBvdXRcbiAgICovXG4gIEBhY3Rpb25cbiAgc2lnbk91dCgpIHtcbiAgICBjb25zdCB1c2VyID0gdGhpcy5nZXRDb2duaXRvVXNlcigpO1xuICAgIGlmICh1c2VyKSB1c2VyLnNpZ25PdXQoKTtcbiAgICB0aGlzLnVzZXJTZXNzaW9uID0gbnVsbDtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICB0aGlzLmlkVG9rZW4gPSBudWxsO1xuICAgIHRoaXMubG9naW5FcnJvciA9IG51bGw7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5TSUdOX0lOKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maXJtcyB0aGUgTUZBIGNvZGUgdG8gY29udGludWUgdGhlIGF1dGhlbnRpY2F0aW9uIHByb2NlZWR1cmVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgVGhlIE1GQSBjb2RlXG4gICAqL1xuICBAYWN0aW9uIGNvbmZpcm1NRkEoY29kZSkge1xuICAgIHRoaXMuZ2V0Q29nbml0b1VzZXIoKS5zZW5kTUZBQ29kZShjb2RlLCB0aGlzLmhhbmRsZXJzKTtcbiAgfVxuXG4gIEBhY3Rpb24gY29tcGxldGVOZXdQYXNzd29yZENoYWxsZW5nZShuZXdQYXNzd29yZCwgYXR0cmlidXRlc0RhdGEpIHtcbiAgICB0aGlzLmdldENvZ25pdG9Vc2VyKCkuY29tcGxldGVOZXdQYXNzd29yZENoYWxsZW5nZShcbiAgICAgIG5ld1Bhc3N3b3JkLFxuICAgICAgYXR0cmlidXRlc0RhdGEsXG4gICAgICB0aGlzLmhhbmRsZXJzXG4gICAgKTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0TG9naW5TdGF0ZSA9IG5ld1N0YXRlID0+IHtcbiAgICB0aGlzLmxvZ2luU3RhdGUgPSBuZXdTdGF0ZTtcbiAgfTtcbn1cblxuZXhwb3J0IHsgTE9HSU5fU1RBVEVTIH07XG5leHBvcnQgZGVmYXVsdCBBdXRoU3RhdGVTdG9yZTtcbiJdfQ==