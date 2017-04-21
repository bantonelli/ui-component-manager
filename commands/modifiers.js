// ------------------------------------------------------------
// ADD, REMOVE, AND UPDATE MODIFIERS   
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


const addModifierAction = function (args, callback) {
    var self = this;
    var type = 'modifier';
    utils.addComponentSubclass(store, self, callback, args.componentName, args.modifierName, type);  
};

const removeModifierAction = function (args, callback) {
    var self = this;
    var type = 'modifier';
    utils.removeComponentSubclass(store, self, callback, args.componentName, args.modifierName, type);
};

const updateModifierAction = function (args, callback) {
    var self = this;
    var type = 'modifier';
    utils.updateComponentSubclass(store, self, callback, args.componentName, args.modifierName, type);
};


// EXPORT
// ------------------------------------------------------------
module.exports = function (vorpal) {
    let chalk = vorpal.chalk;

    // ADD 
    vorpal
    .command('add modifier <componentName> <modifierName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.modifierName);    
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
    .action(addModifierAction);

    // REMOVE 
    vorpal
    .command('remove modifier <componentName> <modifierName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.modifierName);    
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
    .action(removeModifierAction);

    // UPDATE 
    vorpal
    .command('update modifier <componentName> <modifierName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.modifierName);    
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
    .action(updateModifierAction);
};