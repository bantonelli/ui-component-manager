// #! /usr/bin/env node
const fs = require("fs");
const os = require("os");
const _ = require("lodash");
const vorpal = require('vorpal')();
const chalk = vorpal.chalk;

// MODULE HIERARCHY: commands > store > utils
    // utils can import other utils 
    // store can import utils but NOT commands 
    // commands can import utils AND store. 

// ------------------------------------------------------------
// CLI DELIMITER 
// ------------------------------------------------------------
vorpal
    // Define app delimiter called "myapp$" (the name in the command line) 
    .delimiter(chalk.magenta('ui-component-manager$'))
    .use(require('./commands'))
    // Show the delimiter prompt in the shell (keep the prompt running)
    .show();


