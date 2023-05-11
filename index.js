import core from '@actions/core';
import { parseReadme, wpVersionFresh } from '@tarosky/farmhand/src/parser/index.js';
import { latestWpVersion } from "@tarosky/farmhand/src/request/index.js";
import { promises as fs } from 'fs';

async function run() {
  try {
    const readme = core.getInput('readme') || 'README.md';
    const readmeFile = await fs.readFile( readme, 'utf8' );
    const parsed = parseReadme( readmeFile.toString() );
    if ( ! parsed.tested_up_to ) {
      throw new Error( 'Could not find Tested Up to in ' + readme );
    }
    const latest = await latestWpVersion();
    core.setOutput('should_update', ! wpVersionFresh( parsed.tested_up_to, latest ) );
    core.setOutput('version', latest );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
