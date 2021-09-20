"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportAppAsync = exportAppAsync;
exports.ANONYMOUS_USERNAME = void 0;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _hashids() {
  const data = _interopRequireDefault(require("hashids"));

  _hashids = function () {
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

function _readLastLines() {
  const data = _interopRequireDefault(require("read-last-lines"));

  _readLastLines = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _urlJoin() {
  const data = _interopRequireDefault(require("url-join"));

  _urlJoin = function () {
    return data;
  };

  return data;
}

function _uuid() {
  const data = require("uuid");

  _uuid = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ANONYMOUS_USERNAME = 'anonymous';
exports.ANONYMOUS_USERNAME = ANONYMOUS_USERNAME;
const bundlePlatforms = ['android', 'ios'];

/**
 * If the `eas` flag is true, the stucture of the outputDir will be:
├── assets
│   └── *
├── bundles
│   ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
│   └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
└── metadata.json

 * If the `eas` flag is not true, then this function is for self hosting 
 * and the outputDir will have the files created in the project directory the following way:
.
├── android-index.json
├── ios-index.json
├── assets
│   └── 1eccbc4c41d49fd81840aef3eaabe862
└── bundles
      ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
      └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
 */
async function exportAppAsync(projectRoot, publicUrl, assetUrl, outputDir, options = {}, experimentalBundle) {
  var _options$publishOptio, _options$publishOptio2, _bundles$ios$hermesBy, _bundles$android$herm, _bundles$ios$hermesSo, _bundles$android$herm2;

  const absoluteOutputDir = _path().default.resolve(projectRoot, outputDir);

  const defaultTarget = (0, _config().getDefaultTarget)(projectRoot);
  const target = (_options$publishOptio = (_options$publishOptio2 = options.publishOptions) === null || _options$publishOptio2 === void 0 ? void 0 : _options$publishOptio2.target) !== null && _options$publishOptio !== void 0 ? _options$publishOptio : defaultTarget;

  if (_log().default.isDebug) {
    _log().default.newLine();

    _log().default.log('Export Assets:');

    _log().default.log(`- Asset target: ${target}`);

    _log().default.newLine();
  }

  const assetPathToWrite = _path().default.resolve(absoluteOutputDir, 'assets');

  await _fsExtra().default.ensureDir(assetPathToWrite);

  const bundlesPathToWrite = _path().default.resolve(absoluteOutputDir, 'bundles');

  await _fsExtra().default.ensureDir(bundlesPathToWrite);
  const {
    exp,
    pkg,
    hooks
  } = await _xdl().Project.getPublishExpConfigAsync(projectRoot, options.publishOptions || {});
  const bundles = await _xdl().Project.createBundlesAsync(projectRoot, options.publishOptions, {
    dev: options.isDev,
    useDevServer: _xdl().Env.shouldUseDevServer(exp)
  });
  (0, _xdl().printBundleSizes)(bundles);
  const iosBundle = (_bundles$ios$hermesBy = bundles.ios.hermesBytecodeBundle) !== null && _bundles$ios$hermesBy !== void 0 ? _bundles$ios$hermesBy : bundles.ios.code;
  const androidBundle = (_bundles$android$herm = bundles.android.hermesBytecodeBundle) !== null && _bundles$android$herm !== void 0 ? _bundles$android$herm : bundles.android.code;

  const iosBundleHash = _crypto().default.createHash('md5').update(iosBundle).digest('hex');

  const iosBundleUrl = `ios-${iosBundleHash}.js`;

  const iosJsPath = _path().default.join(bundlesPathToWrite, iosBundleUrl);

  const androidBundleHash = _crypto().default.createHash('md5').update(androidBundle).digest('hex');

  const androidBundleUrl = `android-${androidBundleHash}.js`;

  const androidJsPath = _path().default.join(bundlesPathToWrite, androidBundleUrl);

  const relativeBundlePaths = {
    android: _path().default.join('bundles', androidBundleUrl),
    ios: _path().default.join('bundles', iosBundleUrl)
  };
  await _xdl().Project.writeArtifactSafelyAsync(bundlesPathToWrite, null, iosBundleUrl, iosBundle);
  await _xdl().Project.writeArtifactSafelyAsync(bundlesPathToWrite, null, androidJsPath, androidBundle);

  _log().default.log('Finished saving JS Bundles.');

  const {
    assets
  } = await _xdl().ProjectAssets.exportAssetsAsync({
    projectRoot,
    exp,
    hostedUrl: publicUrl,
    assetPath: 'assets',
    outputDir: absoluteOutputDir,
    bundles,
    experimentalBundle
  });

  if (experimentalBundle) {
    // Build metadata.json
    const fileMetadata = {
      android: {},
      ios: {}
    };
    bundlePlatforms.forEach(platform => {
      fileMetadata[platform].assets = [];
      bundles[platform].assets.forEach(asset => {
        fileMetadata[platform].assets = [...fileMetadata[platform].assets, ...asset.fileHashes.map(hash => {
          return {
            path: _path().default.join('assets', hash),
            ext: asset.type
          };
        })];
      });
      fileMetadata[platform].bundle = relativeBundlePaths[platform];
    });
    const metadata = {
      version: 0,
      bundler: 'metro',
      fileMetadata: fileMetadata
    };

    _fsExtra().default.writeFileSync(_path().default.resolve(outputDir, 'metadata.json'), JSON.stringify(metadata));
  }

  if (options.dumpAssetmap) {
    _log().default.log('Dumping asset map.');

    const assetmap = {};
    assets.forEach(asset => {
      assetmap[asset.hash] = asset;
    });
    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(absoluteOutputDir, 'assetmap.json'), JSON.stringify(assetmap));
  }

  const iosSourceMap = (_bundles$ios$hermesSo = bundles.ios.hermesSourcemap) !== null && _bundles$ios$hermesSo !== void 0 ? _bundles$ios$hermesSo : bundles.ios.map;
  const androidSourceMap = (_bundles$android$herm2 = bundles.android.hermesSourcemap) !== null && _bundles$android$herm2 !== void 0 ? _bundles$android$herm2 : bundles.android.map; // build source maps

  if (options.dumpSourcemap) {
    // write the sourcemap files
    const iosMapName = `ios-${iosBundleHash}.map`;

    const iosMapPath = _path().default.join(absoluteOutputDir, 'bundles', iosMapName);

    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, iosMapPath, iosSourceMap);
    const androidMapName = `android-${androidBundleHash}.map`;

    const androidMapPath = _path().default.join(absoluteOutputDir, 'bundles', androidMapName);

    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, androidMapPath, androidSourceMap);

    if (target === 'managed' && _semver().default.lt(exp.sdkVersion, '40.0.0')) {
      // Remove original mapping to incorrect sourcemap paths
      // In SDK 40+ and bare projects, we no longer need to do this.
      _log().default.log('Configuring source maps');

      await truncateLastNLines(iosJsPath, 1);
      await truncateLastNLines(androidJsPath, 1);
    } // Add correct mapping to sourcemap paths


    await _fsExtra().default.appendFile(iosJsPath, `\n//# sourceMappingURL=${iosMapName}`);
    await _fsExtra().default.appendFile(androidJsPath, `\n//# sourceMappingURL=${androidMapName}`); // Make a debug html so user can debug their bundles

    _log().default.log('Preparing additional debugging files');

    const debugHtml = `
      <script src="${(0, _urlJoin().default)('bundles', iosBundleUrl)}"></script>
      <script src="${(0, _urlJoin().default)('bundles', androidBundleUrl)}"></script>
      Open up this file in Chrome. In the Javascript developer console, navigate to the Source tab.
      You can see a red coloured folder containing the original source code from your bundle.
      `;
    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(absoluteOutputDir, 'debug.html'), debugHtml);
  } // Skip the hooks and manifest creation if building for EAS.


  if (!experimentalBundle) {
    const validPostExportHooks = _xdl().Project.prepareHooks(hooks, 'postExport', projectRoot); // Add assetUrl to manifest


    exp.assetUrlOverride = assetUrl;
    exp.publishedTime = new Date().toISOString();
    exp.commitTime = new Date().toISOString();
    exp.releaseId = (0, _uuid().v4)(); // generate revisionId and id the same way www does

    const hashIds = new (_hashids().default)((0, _uuid().v1)(), 10);
    exp.revisionId = hashIds.encode(Date.now());

    if (options.isDev) {
      exp.developer = {
        tool: 'exp'
      };
    }

    if (!exp.slug) {
      throw new (_xdl().XDLError)('INVALID_MANIFEST', 'Must provide a slug field in the app.json manifest.');
    }

    let username = await _xdl().UserManager.getCurrentUsernameAsync();

    if (!username) {
      username = ANONYMOUS_USERNAME;
    }

    exp.id = `@${username}/${exp.slug}`; // save the android manifest

    const androidManifest = { ...exp,
      bundleUrl: (0, _urlJoin().default)(publicUrl, 'bundles', androidBundleUrl),
      platform: 'android',
      dependencies: Object.keys(pkg.dependencies)
    };
    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(absoluteOutputDir, 'android-index.json'), JSON.stringify(androidManifest)); // save the ios manifest

    const iosManifest = { ...exp,
      bundleUrl: (0, _urlJoin().default)(publicUrl, 'bundles', iosBundleUrl),
      platform: 'ios',
      dependencies: Object.keys(pkg.dependencies)
    };
    await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(absoluteOutputDir, 'ios-index.json'), JSON.stringify(iosManifest));
    (0, _assert().default)(androidManifest, 'should have been assigned');
    (0, _assert().default)(iosManifest, 'should have been assigned');
    const hookOptions = {
      url: null,
      exp,
      iosBundle,
      iosSourceMap,
      iosManifest,
      androidBundle,
      androidSourceMap,
      androidManifest,
      projectRoot,
      log: msg => {
        _log().default.info(msg); // logger.global.info({ quiet: true }, msg);

      }
    };

    for (const hook of validPostExportHooks) {
      _log().default.log(`Running postExport hook: ${hook.file}`);

      try {
        _xdl().Project.runHook(hook, hookOptions);
      } catch (e) {
        _log().default.warn(`Warning: postExport hook '${hook.file}' failed: ${e.stack}`);
      }
    } // configure embedded assets for expo-updates or ExpoKit


    await _xdl().EmbeddedAssets.configureAsync({
      projectRoot,
      pkg,
      exp,
      iosManifestUrl: (0, _urlJoin().default)(publicUrl, 'ios-index.json'),
      iosManifest,
      iosBundle,
      androidManifestUrl: (0, _urlJoin().default)(publicUrl, 'android-index.json'),
      androidManifest,
      androidBundle,
      target
    });
  }
} // truncate the last n lines in a file


async function truncateLastNLines(filePath, n) {
  const lines = await _readLastLines().default.read(filePath, n);
  const to_vanquish = lines.length;
  const {
    size
  } = await _fsExtra().default.stat(filePath);
  await _fsExtra().default.truncate(filePath, size - to_vanquish);
}
//# sourceMappingURL=exportAppAsync.js.map