"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchemesForIosAsync = getSchemesForIosAsync;
exports.getSchemesForAndroidAsync = getSchemesForAndroidAsync;
exports.getDevClientSchemeAsync = getDevClientSchemeAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
    return data;
  };

  return data;
}

function _plist() {
  const data = _interopRequireDefault(require("@expo/plist"));

  _plist = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("./CommandError");

  _CommandError = function () {
    return data;
  };

  return data;
}

function _clearNativeFolder() {
  const data = require("./commands/eject/clearNativeFolder");

  _clearNativeFolder = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("./log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getSchemesForIosAsync(projectRoot) {
  try {
    const configPath = _configPlugins().IOSConfig.Paths.getInfoPlistPath(projectRoot);

    const rawPlist = _fs().default.readFileSync(configPath, 'utf8');

    const plistObject = _plist().default.parse(rawPlist);

    return sortLongest(_configPlugins().IOSConfig.Scheme.getSchemesFromPlist(plistObject));
  } catch {
    // No ios folder or some other error
    return [];
  }
}

async function getSchemesForAndroidAsync(projectRoot) {
  try {
    const configPath = await _configPlugins().AndroidConfig.Paths.getAndroidManifestAsync(projectRoot);
    const manifest = await _configPlugins().AndroidConfig.Manifest.readAndroidManifestAsync(configPath);
    return sortLongest(await _configPlugins().AndroidConfig.Scheme.getSchemesFromManifest(manifest));
  } catch {
    // No android folder or some other error
    return [];
  }
}

function intersecting(a, b) {
  const [c, d] = a.length > b.length ? [a, b] : [b, a];
  return c.filter(value => d.includes(value));
}

async function getDevClientSchemeAsync(projectRoot) {
  const [hasIos, hasAndroid] = await Promise.all([(0, _clearNativeFolder().hasRequiredIOSFilesAsync)(projectRoot), (0, _clearNativeFolder().hasRequiredAndroidFilesAsync)(projectRoot)]);
  const [ios, android] = await Promise.all([getSchemesForIosAsync(projectRoot), getSchemesForAndroidAsync(projectRoot)]); // Allow managed projects

  if (!hasIos && !hasAndroid) {
    return getManagedDevClientSchemeAsync(projectRoot);
  }

  let matching; // Allow for only one native project to exist.

  if (!hasIos) {
    matching = android[0];
  } else if (!hasAndroid) {
    matching = ios[0];
  } else {
    [matching] = intersecting(ios, android);
  }

  if (!matching) {
    _log().default.warn('\nDev Client: No common URI schemes could be found for the native iOS and Android projects, this is required for opening the project\n');

    _log().default.log(`Add a common scheme with ${_log().default.chalk.cyan('npx uri-scheme add my-scheme')} or provide a scheme with the ${_log().default.chalk.cyan('--scheme')} flag\n`);

    _log().default.log(_log().default.chalk.dim(`You can see all of the existing schemes for your native projects by running ${_log().default.chalk.cyan('npx uri-scheme list')}\n`)); // No log error


    throw new (_CommandError().AbortCommandError)();
  }

  return matching;
}

async function getManagedDevClientSchemeAsync(projectRoot) {
  const {
    exp
  } = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  });

  try {
    const getDefaultScheme = require((0, _resolveFrom().default)(projectRoot, 'expo-dev-client/getDefaultScheme'));

    const scheme = getDefaultScheme(exp);
    return scheme;
  } catch (error) {
    _log().default.warn('\nDev Client: Unable to get the default URI scheme for the project. Please make sure the expo-dev-client package is installed.');

    _log().default.error(error);

    _log().default.newLine();

    throw new (_CommandError().AbortCommandError)();
  }
} // sort longest to ensure uniqueness.
// this might be undesirable as it causes the QR code to be longer.


function sortLongest(obj) {
  return obj.sort((a, b) => b.length - a.length);
}
//# sourceMappingURL=schemes.js.map