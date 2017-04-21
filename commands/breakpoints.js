// ------------------------------------------------------------
// ADD, REMOVE, AND UPDATE BREAKPOINTS   
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


const addBreakpointAction = function (args, callback) {
    var self = this;
    var type = 'breakpoint';
    utils.addComponentSubclass(store, self, callback, args.componentName, args.breakpointSize, type);  
};

const removeBreakpointAction = function (args, callback) {
    var self = this;
    var type = 'breakpoint';
    utils.removeComponentSubclass(store, self, callback, args.componentName, args.breakpointSize, type);
};

const updateBreakpointAction = function (args, callback) {
    var self = this;
    var type = 'breakpoint';
    utils.updateComponentSubclass(store, self, callback, args.componentName, args.breakpointSize, type);
};


// EXPORT
// ------------------------------------------------------------
module.exports = function (vorpal) {
    let chalk = vorpal.chalk;

    // ADD 
    vorpal
    .command('add breakpoint <componentName> <breakpointSize>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateBreakpointSize(args.breakpointSize);    
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
    .action(addBreakpointAction);

    // REMOVE 
    vorpal
    .command('remove breakpoint <componentName> <breakpointSize>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateBreakpointSize(args.breakpointSize);    
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
    .action(removeBreakpointAction);

    // UPDATE 
    vorpal
    .command('update breakpoint <componentName> <breakpointSize>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateBreakpointSize(args.breakpointSize);    
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
    .action(updateBreakpointAction);
};