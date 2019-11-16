"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var authStore = new _authStateStore["default"]();
var _default = authStore;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhdXRoU3RvcmUiLCJBdXRoU3RhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBRyxJQUFJQywwQkFBSixFQUFsQjtlQUVlRCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1dGhTdGF0ZVN0b3JlLCB7IExPR0lOX1NUQVRFUyB9IGZyb20gJy4vYXV0aFN0YXRlU3RvcmUnO1xuXG5jb25zdCBhdXRoU3RvcmUgPSBuZXcgQXV0aFN0YXRlU3RvcmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgYXV0aFN0b3JlO1xuZXhwb3J0IHsgTE9HSU5fU1RBVEVTIH07XG4iXX0=