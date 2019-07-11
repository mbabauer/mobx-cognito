"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LOGIN_STATES", {
  enumerable: true,
  get: function get() {
    return _authStateStore.LOGIN_STATES;
  }
});
exports["default"] = void 0;

var _authStateStore = _interopRequireWildcard(require("./authStateStore"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var authStore = new _authStateStore["default"]();
var _default = authStore;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhdXRoU3RvcmUiLCJBdXRoU3RhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLFNBQVMsR0FBRyxJQUFJQywwQkFBSixFQUFsQjtlQUVlRCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1dGhTdGF0ZVN0b3JlLCB7IExPR0lOX1NUQVRFUyB9IGZyb20gJy4vYXV0aFN0YXRlU3RvcmUnO1xuXG5jb25zdCBhdXRoU3RvcmUgPSBuZXcgQXV0aFN0YXRlU3RvcmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgYXV0aFN0b3JlO1xuZXhwb3J0IHsgTE9HSU5fU1RBVEVTIH07XG4iXX0=