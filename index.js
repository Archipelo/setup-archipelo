const exec = require('@actions/exec');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const { getDownloadURL } = require('./lib/utils');

async function setup() {
  try {
    // Get version of tool to be installed
    let version = core.getInput('version');

    // Get version of tool to be installed
    const qa = core.getInput('qa');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const url = getDownloadURL(version, qa);
    const pathToTarball = await tc.downloadTool(url);
    core.info("pathToTarball " + pathToTarball)

    // Extract the tarball/zipball onto host runner
    const extract = url.endsWith('.zip') ? tc.extractZip : tc.extractTar;
    const pathToCLI = await extract(pathToTarball);
    core.info("pathToCLI " + pathToCLI)

    // Expose the tool by adding it to the PATH
    // core.addPath(path.join(pathToCLI, download.binPath));
    core.addPath(pathToCLI);

    // Make it executable
    await exec.exec(`chmod +x ${pathToCLI}/archipelo`);
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}
