"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnGradleAsync = spawnGradleAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = require("../../../CommandError");

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function getGradleTask(variant) {
  return `install${capitalize(variant)}`;
}

function resolveGradleWPath(androidProjectPath) {
  return _path().default.join(androidProjectPath, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
}

async function spawnGradleAsync({
  androidProjectPath,
  variant
}) {
  const gradlew = resolveGradleWPath(androidProjectPath);
  const task = getGradleTask(variant);
  const args = [task, // ignore linting errors
  '-x', 'lint', // ignore tests
  '-x', 'test', '--configure-on-demand'];

  if (_log().default.isProfiling) {
    // Generate a profile under `/android/app/build/reports/profile`
    args.push('--profile');
  }

  _log().default.debug(`  ${gradlew} ${args.join(' ')}`);

  try {
    return await (0, _spawnAsync().default)(gradlew, args, {
      cwd: androidProjectPath,
      stdio: 'inherit'
    });
  } catch (error) {
    // User aborted the command with ctrl-c
    if (error.status === 130) {
      // Fail silently
      throw new (_CommandError().AbortCommandError)();
    }

    throw error;
  }
}
//# sourceMappingURL=spawnGradleAsync.js.map