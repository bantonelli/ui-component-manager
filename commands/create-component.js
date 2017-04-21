// ------------------------------------------------------------
// CREATE COMPONENT COMMAND 
// ------------------------------------------------------------


// REQUIRES
// ------------------------------------------------------------
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


// EXPORT
// ------------------------------------------------------------
module.exports = function(vorpal) {
    let chalk = vorpal.chalk;
    vorpal
    .command('create <type> <name>')
    .validate(function (args) {
        let nameValidationResult = utils.validateName(args.name);
        let typeValidationResult = utils.validateType(args.type);    
        if (nameValidationResult) {
            return nameValidationResult;
        } else if (typeValidationResult) {
            return typeValidationResult;
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
        var coloredType = chalk.cyan(args.type);
        var message = `You are going to create a new component with NAME: ${coloredName} & TYPE: ${coloredType}. ${N}Do you wish to continue?`         
        this.prompt({
            type: 'confirm',
            name: 'yes',
            default: false,
            message: message
        }, (result) => {
            if (result.yes) {
                try {
                    this.log(store.addComponent(args.name, args.type));
                } catch (error) {
                    this.log(error);
                    callback(); 
                }                                
            } else {
                this.log('component not created');
            }
            callback();                
        });            
    });
};



