// ------------------------------------------------------------
// GET COMPONENTS AND PIPE FILTERS  
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


// GET: action and help   
// ------------------------------------------------------------
const getCommandHelp = `
Retrieves components from datastore. ${N}Pipe to 'name', 'type', 'complete', 'incomplete', and/or properties to filter results.`;
const getCommandAction = function (args, callback) {
    try {
        var results = store.getAll();
        this.log(results);
        callback();
    } catch (e) {
        this.log(e.message);
        callback();
        return;
    }
}; 


// COMPLETE: action and help 
// ------------------------------------------------------------
const completeCommandHelp = `
Limits results to components that are complete (complete: true). ${N}Pipe this command at any stage after 'get' but it must be before 'properties'.`;
const completeCommandAction = function (args, callback) {
    // vorpal.emit('client_command_executed', 'complete');
    try {
        this.log(store.getComplete(args.stdin[0])); 
        callback();
    } catch (e) {
        this.log(e.message);
        callback();
        return;
    }                     
};


// INCOMPLETE: action and help 
// ------------------------------------------------------------
const incompleteCommandHelp = `
Limits results to components that are not complete (complete: false). ${N}Pipe this command at any stage after 'get' but it must be before 'properties'.`;
const incompleteCommmandAction = function(args, callback) {
    try {
        this.log(store.getIncomplete(args.stdin[0]));           
        callback();
    } catch (e) {
        this.log(e.message);
        callback();
        return;
    }        
};    
    

// NAME: action and help
// ------------------------------------------------------------
const nameCommandHelp = `
Limits results to component with matching name. ${N}Pipe this command at any stage after 'get' but it must be before 'properties'.`;
const nameCommandAction = function(args, callback) {
    try {
        this.log(store.getComponent(args.stdin[0], args.name));             
        callback();
    } catch (e) {
        this.log(e.message);             
        callback();
        return;
    }        
};    


// TYPE: action and help
// ------------------------------------------------------------ 
const typeCommandHelp = `
Limits results to components of a particular type (atom, molecule, etc.). ${N}Pipe this command at any stage after 'get' but it must be before 'properties'.`;
const typeCommandAction = function(args, callback) {
    try {
        this.log(store.getComponentsWithType(args.stdin[0], args.type));             
        callback();
    } catch (e) {
        this.log(e.message);
        callback();
        return;
    }        
};    

// ------------------------------------------------------------
// EXPORTS 
// ------------------------------------------------------------
module.exports = function (vorpal) {
    var chalk = vorpal.chalk;
    
    // GET COMMAND 
    vorpal
    .command('get', getCommandHelp)
    .action(getCommandAction);

    // COMPLETE PIPE
    vorpal 
    .command('complete', completeCommandHelp)
    .action(completeCommandAction);

    // INCOMPLETE PIPE
    vorpal 
    .command('incomplete', incompleteCommandHelp)
    .action(incompleteCommmandAction);

    // NAME PIPE 
    vorpal
    .command('name [name]', nameCommandHelp)
    .action(nameCommandAction);

    // TYPE PIPE 
    vorpal
    .command('type [type]', typeCommandHelp)
    .autocomplete(vars.typeChoices)
    .action(typeCommandAction);
};