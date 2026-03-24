const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.watchFolders = [
  // ...config.watchFolders
]

config.blacklistRE = /.*(AppData\\Roaming\\Claude|AppData\\Roaming\\jupyter).*/

module.exports = withNativeWind(config, { input: './app/global.css' })