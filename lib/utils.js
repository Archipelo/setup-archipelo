const os = require("os");
// const path = require('path');

// arch in [arm, x32, x64...] (https://nodejs.org/api/os.html#os_os_arch)
// return value in [amd64, 386, arm]
function mapArch(arch) {
  const mappings = {
    x32: "386",
    x64: "amd64",
  };
  return mappings[arch] || arch;
}

// os in [darwin, linux, win32...] (https://nodejs.org/api/os.html#os_os_platform)
// return value in [darwin, linux, windows]
function mapOS(os) {
  const mappings = {
    win32: "windows",
  };
  return mappings[os] || os;
}

function getDownloadObject(version) {
  const platform = os.platform();
  const filename = `archipelo_${mapOS(platform)}_${mapArch(
    os.arch()
  )}_${version}`;
  const extension = platform === "win32" ? "zip" : "tar.gz";
  const binPath = "bin";
  const url = `https://storage.googleapis.com/archipelo-cli/${version}/${filename}.${extension}`;
  return {
    url,
    binPath,
  };
}

module.exports = { getDownloadObject };
