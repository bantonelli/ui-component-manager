// ------------------------------------------------------------
// REMOVE COMPONENT COMMAND 
// ------------------------------------------------------------

/*
removeComponent: 
Removes component by its name from the .json file.   
*/


// REQUIRES
// ------------------------------------------------------------
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


// EXPORT
// ------------------------------------------------------------
module.exports = function (vorpal) {
    let chalk = vorpal.chalk;
    vorpal
    .command('remove <name>')
    .validate(function (args) {
        let nameValidationResult = utils.validateName(args.name);            
        if (nameValidationResult) {
            return nameValidationResult;
        } else {
            return true;
        } 
    })
    .parse(function (command, args) {
        // Auto pipe the result to pretty-print 
        return command + ' | pretty';
    })
    .action(function (args, callback){
        var coloredName = chalk.cyan(args.name);
        var message = `You are going to remove the component NAMED: ${coloredName}. ${N}Do you wish to continue?`         
        this.prompt({
            type: 'confirm',
            name: 'yes',
            default: false,
            message: message
        }, (result) => {
            if (result.yes) {
                try {
                    this.log(store.removeComponent(args.name));
                } catch (error) {
                    this.log(error);
                    callback(); 
                }                                
            } else {
                this.log('component not removed');
            }
            callback();                
        });            
    });
};