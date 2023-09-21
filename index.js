import { join } from 'path';
import { getInput, setFailed, info, addPath } from '@actions/core';
import { downloadTool, extractZip, extractTar } from '@actions/tool-cache';
import { getDownloadObject } from './lib/utils';

async function setup() {
  try {
    // Get version of tool to be installed
    let version = getInput('version');

    // Get version of tool to be installed
    const qa = getInput('qa');

    if (qa && !version) {
      version = "main"
    }

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = getDownloadObject(version, qa);
    const pathToTarball = await downloadTool(download.url);
    setFailed(pathToTarball)

    // Extract the tarball/zipball onto host runner
    const extract = download.url.endsWith('.zip') ? extractZip : extractTar;
    const pathToCLI = await extract(pathToTarball);
    info(pathToCLI)

    // Expose the tool by adding it to the PATH
    addPath(join(pathToCLI, download.binPath));
  } catch (e) {
    setFailed(e);
  }
}

// export default setup

// if (require.main === module) {
//   setup();
// }

setup();