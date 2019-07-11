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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoU3RhdGVTdG9yZS5qcyJdLCJuYW1lcyI6WyJMT0dJTl9TVEFURVMiLCJTSUdOX0lOIiwiTE9BRElORyIsIk1GQSIsIkxPR0dFRF9JTiIsIk5FV19QQVNTV09SRCIsIkZBSUxFRF9MT0dJTiIsIkF1dGhTdGF0ZVN0b3JlIiwiY29uZmlndXJhdGlvbiIsInVzZXJQb29sIiwiaGFuZGxlcnMiLCJvblN1Y2Nlc3MiLCJyZXN1bHQiLCJoYW5kbGVPblN1Y2Nlc3NMb2dpbiIsIm9uRmFpbHVyZSIsImVyciIsImhhbmRsZU9uRmFpbHVyZUxvZ2luIiwibWZhUmVxdWlyZWQiLCJjb2RlRGVsaXZlcnlEZXRhaWxzIiwiaGFuZGxlTUZBUmVxdWlyZWQiLCJuZXdQYXNzd29yZFJlcXVpcmVkIiwidXNlckF0dHJpYnV0ZXMiLCJyZXF1aXJlZEF0dHJpYnV0ZXMiLCJoYW5kbGVOZXdQYXNzd29yZCIsImNvbmZpZyIsIlVzZXJQb29sSWQiLCJDbGllbnRJZCIsIkNvb2tpZVN0b3JhZ2UiLCJTdG9yYWdlIiwiQW1hem9uQ29nbml0b0lkZW50aXR5IiwiQ29nbml0b1VzZXJQb29sIiwidXNlckRhdGEiLCJjb2duaXRvVXNlciIsIkNvZ25pdG9Vc2VyIiwidXNlclNlc3Npb24iLCJhY2Nlc3NUb2tlbiIsImdldEFjY2Vzc1Rva2VuIiwiaWRUb2tlbiIsImxvZ2luRXJyb3IiLCJzZXRMb2dpblN0YXRlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGhlbnRpY2F0aW9uRGF0YSIsIlVzZXJuYW1lIiwiUGFzc3dvcmQiLCJQb29sIiwiZ2V0VXNlclBvb2wiLCJhdXRoZW50aWNhdGlvbkRldGFpbHMiLCJBdXRoZW50aWNhdGlvbkRldGFpbHMiLCJnZXRDb2duaXRvVXNlciIsImF1dGhlbnRpY2F0ZVVzZXIiLCJ1c2VyIiwic2lnbk91dCIsImNvZGUiLCJzZW5kTUZBQ29kZSIsIm5ld1Bhc3N3b3JkIiwiYXR0cmlidXRlc0RhdGEiLCJjb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlIiwib2JzZXJ2YWJsZSIsImFjdGlvbiIsIm5ld1N0YXRlIiwibG9naW5TdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsT0FBTyxFQUFFLFFBRFU7QUFFbkJDLEVBQUFBLE9BQU8sRUFBRSxTQUZVO0FBR25CQyxFQUFBQSxHQUFHLEVBQUUsS0FIYztBQUluQkMsRUFBQUEsU0FBUyxFQUFFLFVBSlE7QUFLbkJDLEVBQUFBLFlBQVksRUFBRSxhQUxLO0FBTW5CQyxFQUFBQSxZQUFZLEVBQUU7QUFOSyxDQUFyQjs7SUFTTUMsYzs7Ozs7Ozs7U0FDSkMsYSxHQUFnQixJO1NBQ2hCQyxRLEdBQVcsSTtTQUVYQyxRLEdBQVc7QUFDVEMsTUFBQUEsU0FBUyxFQUFFLG1CQUFBQyxNQUFNO0FBQUEsZUFBSSxLQUFJLENBQUNDLG9CQUFMLENBQTBCRCxNQUExQixDQUFKO0FBQUEsT0FEUjtBQUVURSxNQUFBQSxTQUFTLEVBQUUsbUJBQUFDLEdBQUc7QUFBQSxlQUFJLEtBQUksQ0FBQ0Msb0JBQUwsQ0FBMEJELEdBQTFCLENBQUo7QUFBQSxPQUZMO0FBR1RFLE1BQUFBLFdBQVcsRUFBRSxxQkFBQUMsbUJBQW1CO0FBQUEsZUFBSSxLQUFJLENBQUNDLGlCQUFMLENBQXVCRCxtQkFBdkIsQ0FBSjtBQUFBLE9BSHZCO0FBSVRFLE1BQUFBLG1CQUFtQixFQUFFLDZCQUFDQyxjQUFELEVBQWlCQyxrQkFBakI7QUFBQSxlQUNuQixLQUFJLENBQUNDLGlCQUFMLENBQXVCRixjQUF2QixFQUF1Q0Msa0JBQXZDLENBRG1CO0FBQUE7QUFKWixLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQlg7Ozs7OzhCQUtVRSxNLEVBQVE7QUFDaEIsV0FBS2hCLGFBQUwsR0FBcUI7QUFDbkJpQixRQUFBQSxVQUFVLEVBQUVELE1BQU0sQ0FBQ0MsVUFEQTtBQUVuQkMsUUFBQUEsUUFBUSxFQUFFRixNQUFNLENBQUNFO0FBRkUsT0FBckI7O0FBSUEsVUFBSUYsTUFBTSxDQUFDRyxhQUFYLEVBQTBCO0FBQ3hCO0FBQ0EsYUFBS25CLGFBQUwsQ0FBbUJvQixPQUFuQixHQUE2QixJQUFJQyxxQkFBcUIsQ0FBQ0YsYUFBMUIsbUJBQ3hCSCxNQUFNLENBQUNHLGFBRGlCLEVBQTdCO0FBR0Q7QUFDRjtBQUVEOzs7Ozs7O2tDQUljO0FBQ1osVUFBSSxDQUFDLEtBQUtsQixRQUFWLEVBQW9CLEtBQUtBLFFBQUwsR0FBZ0IsSUFBSXFCLHdDQUFKLENBQW9CLEtBQUt0QixhQUF6QixDQUFoQjtBQUNwQixhQUFPLEtBQUtDLFFBQVo7QUFDRDtBQUVEOzs7Ozs7OzttQ0FLZXNCLFEsRUFBVTtBQUN2QixVQUFJLENBQUMsS0FBS0MsV0FBVixFQUF1QixLQUFLQSxXQUFMLEdBQW1CLElBQUlDLG9DQUFKLENBQWdCRixRQUFoQixDQUFuQjtBQUN2QixhQUFPLEtBQUtDLFdBQVo7QUFDRDs7O3lDQUVvQnBCLE0sRUFBUTtBQUMzQixXQUFLc0IsV0FBTCxHQUFtQnRCLE1BQW5CO0FBQ0EsV0FBS3VCLFdBQUwsR0FBbUJ2QixNQUFNLENBQUN3QixjQUFQLEVBQW5CO0FBQ0EsV0FBS0MsT0FBTCxHQUFlekIsTUFBTSxDQUFDeUIsT0FBdEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsV0FBS0MsYUFBTCxDQUFtQnZDLFlBQVksQ0FBQ0ksU0FBaEM7QUFDRDs7O3lDQUVvQlcsRyxFQUFLO0FBQ3hCLFdBQUt3QixhQUFMLENBQW1CdkMsWUFBWSxDQUFDTSxZQUFoQztBQUNBLFdBQUtnQyxVQUFMLEdBQWtCdkIsR0FBbEI7QUFDRCxLLENBRUQ7Ozs7c0NBQ2tCRyxtQixFQUFxQjtBQUNyQyxXQUFLcUIsYUFBTCxDQUFtQnZDLFlBQVksQ0FBQ0csR0FBaEM7QUFDRDs7O3NDQUVpQmtCLGMsRUFBZ0JDLGtCLEVBQW9CO0FBQ3BELFdBQUtELGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsV0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNBLFdBQUtpQixhQUFMLENBQW1CdkMsWUFBWSxDQUFDSyxZQUFoQztBQUNEO0FBRUQ7Ozs7Ozs7OzJCQUtlbUMsUSxFQUFVQyxRLEVBQVU7QUFDakMsVUFBTUMsa0JBQWtCLEdBQUc7QUFBRUMsUUFBQUEsUUFBUSxFQUFFSCxRQUFaO0FBQXNCSSxRQUFBQSxRQUFRLEVBQUVIO0FBQWhDLE9BQTNCOztBQUNBLFVBQU1WLFFBQVE7QUFDWlksUUFBQUEsUUFBUSxFQUFFSCxRQURFO0FBRVpLLFFBQUFBLElBQUksRUFBRSxLQUFLQyxXQUFMO0FBRk0sU0FHVCxLQUFLdEMsYUFBTCxDQUFtQm9CLE9BSFYsQ0FBZDs7QUFLQSxVQUFNbUIscUJBQXFCLEdBQUcsSUFBSUMsOENBQUosQ0FBMEJOLGtCQUExQixDQUE5QjtBQUNBLFdBQUtPLGNBQUwsQ0FBb0JsQixRQUFwQixFQUE4Qm1CLGdCQUE5QixDQUErQ0gscUJBQS9DLEVBQXNFLEtBQUtyQyxRQUEzRTtBQUNEO0FBRUQ7Ozs7Ozs4QkFJVTtBQUNSLFVBQU15QyxJQUFJLEdBQUcsS0FBS0YsY0FBTCxFQUFiO0FBQ0EsVUFBSUUsSUFBSixFQUFVQSxJQUFJLENBQUNDLE9BQUw7QUFDVixXQUFLbEIsV0FBTCxHQUFtQixJQUFuQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxXQUFLRSxPQUFMLEdBQWUsSUFBZjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxXQUFLQyxhQUFMLENBQW1CdkMsWUFBWSxDQUFDQyxPQUFoQztBQUNEO0FBRUQ7Ozs7Ozs7K0JBSW1Cb0QsSSxFQUFNO0FBQ3ZCLFdBQUtKLGNBQUwsR0FBc0JLLFdBQXRCLENBQWtDRCxJQUFsQyxFQUF3QyxLQUFLM0MsUUFBN0M7QUFDRDs7O2lEQUVvQzZDLFcsRUFBYUMsYyxFQUFnQjtBQUNoRSxXQUFLUCxjQUFMLEdBQXNCUSw0QkFBdEIsQ0FBbURGLFdBQW5ELEVBQWdFQyxjQUFoRSxFQUFnRixLQUFLOUMsUUFBckY7QUFDRDs7Ozt3RkFoSEFnRCxnQjs7Ozs7V0FBeUIsSTs7K0VBQ3pCQSxnQjs7Ozs7V0FBeUIsSTs7OEVBQ3pCQSxnQjs7Ozs7V0FBd0IxRCxZQUFZLENBQUNDLE87OzhFQUNyQ3lELGdCOzs7OztXQUF3QixJOzsrRUFDeEJBLGdCOzs7OztXQUF5QixJOzsyRUFDekJBLGdCOzs7OztXQUFxQixJOztrRkFHckJBLGdCOzs7OztXQUE0QixJOztzRkFDNUJBLGdCOzs7OztXQUFnQyxJOzsyREFvRWhDQyxZLDJJQWNBQSxZLCtJQWVBQSxZLG9LQUlBQSxZLHNMQUlBQSxZOzs7Ozs7O1dBQXVCLFVBQUFDLFFBQVEsRUFBSTtBQUNsQyxNQUFBLE1BQUksQ0FBQ0MsVUFBTCxHQUFrQkQsUUFBbEI7QUFDRCxLOzs7ZUFJWXJELGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvYnNlcnZhYmxlLCBhY3Rpb24gfSBmcm9tICdtb2J4JztcbmltcG9ydCB7IENvZ25pdG9Vc2VyUG9vbCwgQXV0aGVudGljYXRpb25EZXRhaWxzLCBDb2duaXRvVXNlciB9IGZyb20gJ2FtYXpvbi1jb2duaXRvLWlkZW50aXR5LWpzJztcblxuY29uc3QgTE9HSU5fU1RBVEVTID0ge1xuICBTSUdOX0lOOiAnc2lnbkluJyxcbiAgTE9BRElORzogJ2xvYWRpbmcnLFxuICBNRkE6ICdtZmEnLFxuICBMT0dHRURfSU46ICdsb2dnZWRJbicsXG4gIE5FV19QQVNTV09SRDogJ25ld1Bhc3N3b3JkJyxcbiAgRkFJTEVEX0xPR0lOOiAnbG9naW5GYWlsZWQnLFxufTtcblxuY2xhc3MgQXV0aFN0YXRlU3RvcmUge1xuICBjb25maWd1cmF0aW9uID0gbnVsbDtcbiAgdXNlclBvb2wgPSBudWxsO1xuXG4gIGhhbmRsZXJzID0ge1xuICAgIG9uU3VjY2VzczogcmVzdWx0ID0+IHRoaXMuaGFuZGxlT25TdWNjZXNzTG9naW4ocmVzdWx0KSxcbiAgICBvbkZhaWx1cmU6IGVyciA9PiB0aGlzLmhhbmRsZU9uRmFpbHVyZUxvZ2luKGVyciksXG4gICAgbWZhUmVxdWlyZWQ6IGNvZGVEZWxpdmVyeURldGFpbHMgPT4gdGhpcy5oYW5kbGVNRkFSZXF1aXJlZChjb2RlRGVsaXZlcnlEZXRhaWxzKSxcbiAgICBuZXdQYXNzd29yZFJlcXVpcmVkOiAodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcykgPT5cbiAgICAgIHRoaXMuaGFuZGxlTmV3UGFzc3dvcmQodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcyksXG4gIH07XG5cbiAgQG9ic2VydmFibGUgdXNlclNlc3Npb24gPSBudWxsO1xuICBAb2JzZXJ2YWJsZSBjb2duaXRvVXNlciA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGxvZ2luU3RhdGUgPSBMT0dJTl9TVEFURVMuU0lHTl9JTjtcbiAgQG9ic2VydmFibGUgbG9naW5FcnJvciA9IG51bGw7XG4gIEBvYnNlcnZhYmxlIGFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgQG9ic2VydmFibGUgaWRUb2tlbiA9IG51bGw7XG5cbiAgLy8gVGhlc2UgYXJlIG9ubHkgc2V0IHdoZW4gYSBuZXcgcGFzc3dvcmQgaXMgcmVxdWlyZWRcbiAgQG9ic2VydmFibGUgdXNlckF0dHJpYnV0ZXMgPSBudWxsO1xuICBAb2JzZXJ2YWJsZSByZXF1aXJlZEF0dHJpYnV0ZXMgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTZXRzIGNvbmZpZ3VyYXRpb24gZm9yIENvZ25pdG9cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFRoZSBDb2duaXRvIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGNvbmZpZ3VyZShjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICBVc2VyUG9vbElkOiBjb25maWcuVXNlclBvb2xJZCxcbiAgICAgIENsaWVudElkOiBjb25maWcuQ2xpZW50SWQsXG4gICAgfTtcbiAgICBpZiAoY29uZmlnLkNvb2tpZVN0b3JhZ2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLlN0b3JhZ2UgPSBuZXcgQW1hem9uQ29nbml0b0lkZW50aXR5LkNvb2tpZVN0b3JhZ2Uoe1xuICAgICAgICAuLi5jb25maWcuQ29va2llU3RvcmFnZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMYXp5LWluaXRpYWxpemVzIHRoZSBVc2VyUG9vbFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgVXNlclBvb2xcbiAgICovXG4gIGdldFVzZXJQb29sKCkge1xuICAgIGlmICghdGhpcy51c2VyUG9vbCkgdGhpcy51c2VyUG9vbCA9IG5ldyBDb2duaXRvVXNlclBvb2wodGhpcy5jb25maWd1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcy51c2VyUG9vbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMYXp5LWluaXRpYWxpemVzIHRoZSBDb2duaXRvVXNlclxuICAgKiBAcGFyYW0ge09iamVjdH0gdXNlckRhdGEgVGhlIFVzZXJEYXRhXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBDb2duaXRvVXNlciBvYmplY3RcbiAgICovXG4gIGdldENvZ25pdG9Vc2VyKHVzZXJEYXRhKSB7XG4gICAgaWYgKCF0aGlzLmNvZ25pdG9Vc2VyKSB0aGlzLmNvZ25pdG9Vc2VyID0gbmV3IENvZ25pdG9Vc2VyKHVzZXJEYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb2duaXRvVXNlcjtcbiAgfVxuXG4gIGhhbmRsZU9uU3VjY2Vzc0xvZ2luKHJlc3VsdCkge1xuICAgIHRoaXMudXNlclNlc3Npb24gPSByZXN1bHQ7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHJlc3VsdC5nZXRBY2Nlc3NUb2tlbigpO1xuICAgIHRoaXMuaWRUb2tlbiA9IHJlc3VsdC5pZFRva2VuO1xuICAgIHRoaXMubG9naW5FcnJvciA9IG51bGw7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5MT0dHRURfSU4pO1xuICB9XG5cbiAgaGFuZGxlT25GYWlsdXJlTG9naW4oZXJyKSB7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5GQUlMRURfTE9HSU4pO1xuICAgIHRoaXMubG9naW5FcnJvciA9IGVycjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBoYW5kbGVNRkFSZXF1aXJlZChjb2RlRGVsaXZlcnlEZXRhaWxzKSB7XG4gICAgdGhpcy5zZXRMb2dpblN0YXRlKExPR0lOX1NUQVRFUy5NRkEpO1xuICB9XG5cbiAgaGFuZGxlTmV3UGFzc3dvcmQodXNlckF0dHJpYnV0ZXMsIHJlcXVpcmVkQXR0cmlidXRlcykge1xuICAgIHRoaXMudXNlckF0dHJpYnV0ZXMgPSB1c2VyQXR0cmlidXRlcztcbiAgICB0aGlzLnJlcXVpcmVkQXR0cmlidXRlcyA9IHJlcXVpcmVkQXR0cmlidXRlcztcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLk5FV19QQVNTV09SRCk7XG4gIH1cblxuICAvKipcbiAgICogQXV0aGVudGljYXRlcyB0aGUgZ2l2ZW4gdXNlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgVGhlIHVzZXJuYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgcGFzc3dvcmRcbiAgICovXG4gIEBhY3Rpb24gc2lnbkluKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgIGNvbnN0IGF1dGhlbnRpY2F0aW9uRGF0YSA9IHsgVXNlcm5hbWU6IHVzZXJuYW1lLCBQYXNzd29yZDogcGFzc3dvcmQgfTtcbiAgICBjb25zdCB1c2VyRGF0YSA9IHtcbiAgICAgIFVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgIFBvb2w6IHRoaXMuZ2V0VXNlclBvb2woKSxcbiAgICAgIC4uLnRoaXMuY29uZmlndXJhdGlvbi5TdG9yYWdlLFxuICAgIH07XG4gICAgY29uc3QgYXV0aGVudGljYXRpb25EZXRhaWxzID0gbmV3IEF1dGhlbnRpY2F0aW9uRGV0YWlscyhhdXRoZW50aWNhdGlvbkRhdGEpO1xuICAgIHRoaXMuZ2V0Q29nbml0b1VzZXIodXNlckRhdGEpLmF1dGhlbnRpY2F0ZVVzZXIoYXV0aGVudGljYXRpb25EZXRhaWxzLCB0aGlzLmhhbmRsZXJzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaWducyB0aGUgY3VycmVudCB1c2VyIG91dFxuICAgKi9cbiAgQGFjdGlvblxuICBzaWduT3V0KCkge1xuICAgIGNvbnN0IHVzZXIgPSB0aGlzLmdldENvZ25pdG9Vc2VyKCk7XG4gICAgaWYgKHVzZXIpIHVzZXIuc2lnbk91dCgpO1xuICAgIHRoaXMudXNlclNlc3Npb24gPSBudWxsO1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBudWxsO1xuICAgIHRoaXMuaWRUb2tlbiA9IG51bGw7XG4gICAgdGhpcy5sb2dpbkVycm9yID0gbnVsbDtcbiAgICB0aGlzLnNldExvZ2luU3RhdGUoTE9HSU5fU1RBVEVTLlNJR05fSU4pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbmZpcm1zIHRoZSBNRkEgY29kZSB0byBjb250aW51ZSB0aGUgYXV0aGVudGljYXRpb24gcHJvY2VlZHVyZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSBUaGUgTUZBIGNvZGVcbiAgICovXG4gIEBhY3Rpb24gY29uZmlybU1GQShjb2RlKSB7XG4gICAgdGhpcy5nZXRDb2duaXRvVXNlcigpLnNlbmRNRkFDb2RlKGNvZGUsIHRoaXMuaGFuZGxlcnMpO1xuICB9XG5cbiAgQGFjdGlvbiBjb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlKG5ld1Bhc3N3b3JkLCBhdHRyaWJ1dGVzRGF0YSkge1xuICAgIHRoaXMuZ2V0Q29nbml0b1VzZXIoKS5jb21wbGV0ZU5ld1Bhc3N3b3JkQ2hhbGxlbmdlKG5ld1Bhc3N3b3JkLCBhdHRyaWJ1dGVzRGF0YSwgdGhpcy5oYW5kbGVycyk7XG4gIH1cblxuICBAYWN0aW9uIHNldExvZ2luU3RhdGUgPSBuZXdTdGF0ZSA9PiB7XG4gICAgdGhpcy5sb2dpblN0YXRlID0gbmV3U3RhdGU7XG4gIH07XG59XG5cbmV4cG9ydCB7IExPR0lOX1NUQVRFUyB9O1xuZXhwb3J0IGRlZmF1bHQgQXV0aFN0YXRlU3RvcmU7XG4iXX0=