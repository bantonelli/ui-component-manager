// ------------------------------------------------------------
// ADD, REMOVE, AND UPDATE VARIATIONS   
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


const addVariationAction = function (args, callback) {
    var self = this;
    var type = 'variation';
    utils.addComponentSubclass(store, self, callback, args.componentName, args.variationName, type);  
};

const removeVariationAction = function (args, callback) {
    var self = this;
    var type = 'variation';
    utils.removeComponentSubclass(store, self, callback, args.componentName, args.variationName, type);
};

const updateVariationAction = function (args, callback) {
    var self = this;
    var type = 'variation';
    utils.updateComponentSubclass(store, self, callback, args.componentName, args.variationName, type);
};


// EXPORT
// ------------------------------------------------------------
module.exports = function (vorpal) {
    let chalk = vorpal.chalk;
    
    // ADD 
    vorpal    
    .command('add variation <componentName> <variationName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.variationName);    
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
    .action(addVariationAction);

    // REMOVE
    vorpal
    .command('remove variation <componentName> <variationName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.variationName);    
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
    .action(removeVariationAction);

    // UPDATE
    vorpal
    .command('update variation <componentName> <variationName>')
    .validate(function (args) {
        let componentNameValidationResult = utils.validateName(args.componentName);
        let subclassNameValidationResult = utils.validateName(args.variationName);    
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
    .action(updateVariationAction);
};