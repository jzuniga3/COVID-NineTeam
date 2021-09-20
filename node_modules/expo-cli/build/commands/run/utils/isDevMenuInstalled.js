"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDevMenuInstalled = isDevMenuInstalled;

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDevMenuInstalled(projectRoot) {
  // TODO: Maybe this should look for expo-dev-launcher as well
  return !!_resolveFrom().default.silent(projectRoot, 'expo-dev-menu');
}
//# sourceMappingURL=isDevMenuInstalled.js.map