#!/usr/bin/env node
var licenseWhitelist = "";

// official SPDX identifiers
licenseWhitelist += "Apache-2.0;";
licenseWhitelist += "BSD-2-Clause;BSD-3-Clause;";
licenseWhitelist += "CC-BY-3.0;CC-BY-4.0;CC0-1.0;";
licenseWhitelist += "ISC;";
licenseWhitelist += "MIT;";
licenseWhitelist += "OFL-1.1;";
licenseWhitelist += "Unlicense;";
licenseWhitelist += "WTFPL;";
licenseWhitelist += "Zlib;";

// identifiers with asterisks
// (these are created by the license-checker, means that license was deduced
// from an other file than package.json)
licenseWhitelist += "Apache*;BSD*;MIT*;"

// Some projects have deprecated or non-SPDX identifiers
licenseWhitelist += "AFLv2.1;Apache License, Version 2.0;Apache 2.0;BSD;Public Domain;"

/*
 * This is a special reference to the TQ license. Every frontend project has to
 * have a license file inside the frontend directory of the repository. The
 * license reference of the package.json with the 'LicenseRef-' prefix has to
 * point to the file.
 */
licenseWhitelist += "LicenseRef-TQSSLA-1.0.2;";

var child_process = require('child_process');

function check() {
    var path = `${__dirname}/..`;
    if (__dirname.includes("node_modules/tq-license-checker")) {
        path = process.cwd();
    }

    const cmd = `${path}/node_modules/license-checker/bin/license-checker --production --json --onlyAllow "${licenseWhitelist}"`;
    console.info(`Calling: ${cmd}`);

    try {
        return child_process.execSync(cmd).toString();
    } catch (error) {
        process.exit(error.status);
    }
};

check();
