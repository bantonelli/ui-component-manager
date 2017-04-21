// ------------------------------------------------------------
// ADD, REMOVE, AND UPDATE STATES  
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


const addStateAction = function (args, callback) {
    var self = this;
    var type = 'state';
    utils.addComponentSubclass(store, self, callback, args.componentName, args.stateName, type);    
};

const removeStateAction = function (args, callback) {
    var self = this;
    var type = 'state';
    utils.removeComponentSubclass(store, self, callback, args.componentName, args.stateName, type);
};

const updateStateAction = function (args, callback) {
    var self = this;
    var type = 'state';
    utils.updateComponentSubclass(store, self, callback, args.componentName, args.stateName, type);
};


// EXPORT
// ------------------------------------------------------------
module.exports = function (vorpal) {
    let chalk = vorpal.chalk;
    
    // ADD 
    vorpal
    .command('add state <componentName> <stateName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.stateName);    
        if (componentNameValidationResult) {
            return componentNameValidationResult;
        } else if (subclassNameValidationResult) {
            return subclassNameValidationResult;
        } else {
            return true;
        } 
    })
    .parse(function (command, args) {
        // Auto pipe the result to pretty-print 
        return command + ' | pretty';
    })
    .action(addStateAction);

    // REMOVE 
    vorpal
    .command('remove state <componentName> <stateName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.stateName);    
        if (componentNameValidationResult) {
            return componentNameValidationResult;
        } else if (subclassNameValidationResult) {
            return subclassNameValidationResult;
        } else {
            return true;
        } 
    })
    .parse(function (command, args) {
        return command + ' | pretty';
    })
    .action(removeStateAction);

    // UPDATE
    vorpal
    .command('update state <componentName> <stateName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.stateName);    
        if (componentNameValidationResult) {
            return componentNameValidationResult;
        } else if (subclassNameValidationResult) {
            return subclassNameValidationResult;
        } else {
            return true;
        } 
    })
    .parse(function (command, args) {
        return command + ' | pretty';
    })
    .action(updateStateAction);
};