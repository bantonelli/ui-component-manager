// ------------------------------------------------------------
// UTILITY FUNCTIONS FOR VORPAL COMMANDS  
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const vorpal = require('vorpal')();
const chalk = vorpal.chalk;

const vars = require('./vars'); 
const keys = require('./keys');
const N = vars.N;


// ADD COMPONENT SUBCLASS (Variations, Modifiers, etc.)
// ------------------------------------------------------------
var addComponentSubclass = function (store, self, callback, componentName, subclassName, type) {
    let uniqueID, addFunction;
    if (type === 'variation') {
        uniqueID = "name";
        addFunction = store.addVariation;
    } else if (type === 'modifier') {
        uniqueID = "name";
        addFunction = store.addModifier;
    } else if (type === 'breakpoint') {
        uniqueID = "size";
        addFunction = store.addBreakpoint;
    } else {
        uniqueID = "name";
        addFunction = store.addState;
    }
    // *** SEE CREATE COMPONENT ACTION FOR REFERENCE 
    // Set up colored chalk variables to be used in prompt message.  
    // Initialize Prompt message - confirming creation of subclass 
    // start prompt (type - confirm, name - yes, default - false, message)
    // prompt callback
    var coloredComponentName = chalk.cyan(componentName);
    var coloredSubclassName = chalk.cyan(subclassName);
    var message = `You are going to add a new ${type} to ${coloredComponentName} with ${uniqueID}: ${coloredSubclassName}. ${N}Do you wish to continue?`         
    self.prompt({
        type: 'confirm',
        name: 'yes',
        default: false,
        message: message
    }, (result) => {
        if (result.yes) {
            try {
                self.log(addFunction(componentName, subclassName));
            } catch (error) {
                self.log(error);
                callback(); 
            }                                
        } else {
            self.log(`${type}: ${coloredSubclassName} not added!`);
        }
        callback();                
    }); 
};

// REMOVE COMPONENT SUBCLASS (Variations, Modifiers, etc.)
// ------------------------------------------------------------
var removeComponentSubclass = function (store, self, callback, componentName, subclassName, type) {
    var uniqueID, removeFunction;
    if (type === 'variation') {
        uniqueID = "name";
        removeFunction = store.removeVariation;
    } else if (type === 'modifier') {
        uniqueID = "name";
        removeFunction = store.removeModifier;
    } else if (type === 'breakpoint') {
        uniqueID = "size";
        removeFunction = store.removeBreakpoint;
    } else {
        uniqueID = "name";
        removeFunction = store.removeState;
    }
    var coloredComponentName = chalk.cyan(componentName);
    var coloredSubclassName = chalk.cyan(subclassName);
    var message = `You are going to remove a ${type} with ${uniqueID}: ${coloredSubclassName} from ${coloredComponentName}. ${N}Do you wish to continue?`         
    self.prompt({
        type: 'confirm',
        name: 'yes',
        default: false,
        message: message
    }, (result) => {
        if (result.yes) {
            try {
                self.log(removeFunction(componentName, subclassName));
            } catch (error) {
                self.log(error);
                callback(); 
            }                                
        } else {
            self.log(`${type}: ${coloredSubclassName} not removed!`);
        }
        callback();                
    });
};


// UPDATE COMPONENT SUBCLASS (Variations, Modifiers, etc.)
// ------------------------------------------------------------
var updateComponentSubclass = function (store, self, callback, componentName, subclassName, type) {
    // UPDATE FUNCTION PARAMS: componentName, subclassName, key, newValue
    // Prompt generates key and new value 
    // Prompt needs propertyChoices and 
    let typeIDKey, uniqueID, updateFunction, updateableProperties, propertyToUpdate, valueToUpdate;
    if (type === 'variation') {
        typeIDKey = "variationName";
        uniqueID = "name";
        updateFunction = store.updateVariation;
        updateableProperties = vars.variationPropertyChoices;
    } else if (type === 'modifier') {
        typeIDKey = "modifierName";
        uniqueID = "name";
        updateFunction = store.updateModifier;
        updateableProperties = vars.modifierPropertyChoices;
    } else if (type === 'breakpoint') {
        typeIDKey = "breakpointSize";
        uniqueID = "size";
        updateFunction = store.updateBreakpoint;
        updateableProperties = vars.breakpointPropertyChoices;
    } else {
        typeIDKey = "stateName";
        uniqueID = "name";
        updateFunction = store.updateState;
        updateableProperties = vars.statePropertyChoices;
    }
    var coloredComponentName = chalk.cyan(componentName);
    var coloredSubclassName = chalk.cyan(subclassName);
    var message = `Please choose the property you wish to update.`;
    self.prompt({
        type: 'list',
        name: 'updatePropertyChooser',
        choices: updateableProperties,
        message: message
    }, (answer) => {
        if (answer.updatePropertyChooser) {
            propertyToUpdate = answer.updatePropertyChooser;
            let message2 = `Please input the new value for the property "${chalk.cyan(propertyToUpdate)}": `;
            self.prompt({
                type: 'input',
                name: 'updateValueInput',
                message: message2,
                validate: function (nextAnswer) { 
                    let value = nextAnswer;
                    let errMessage = null;
                    if (propertyToUpdate === typeIDKey) {
                        // All subclass names should be valid hyphenated-bem 
                        if (typeIDKey !== "modifierName") {
                            errMessage = validateName(value);
                        }                          
                        if (value !== "true" && value !== "false" && !errMessage) {
                            return true; 
                        } 
                        errMessage = 'Values can not be boolean';
                        
                        // Do extra validation for breakpoint size input                               
                        if (typeIDKey === 'breakpointSize') {
                            errMessage = validateBreakpointSize(value);
                            if (!errMessage) {
                                return true;
                            }
                        }                                     
                    } else {
                        if (value === "true" || value === "false") {
                            return true; 
                        }
                        errMessage = 'Values can only be "true" or "false"';  
                    }
                    self.log(`The ${chalk.cyan(propertyToUpdate)} property can not be set to ${chalk.cyan(value)}. ${N}` + errMessage + `${N}`);
                }
            }, (nextAnswer) => {
                if (nextAnswer) {
                    valueToUpdate = nextAnswer.updateValueInput;
                    try {
                        // UPDATE SUBCLASS FUNCTION PARAMS: componentName, subclassName, key, newValue
                        var updatedComponent = updateFunction(componentName, subclassName, propertyToUpdate, valueToUpdate);                        
                        self.log(updatedComponent);
                        callback();
                        return;                                   
                    } catch (error) {
                        self.log(error);
                        callback();
                    }
                } else {
                    self.log(`${chalk.cyan(type)} ${chalk.red('not updated!')}`);
                    callback();
                    return;
                }  
            }); 
        } else {
            self.log(`${chalk.cyan(type)} ${chalk.red('not updated!')}`);
            callback();
            return;
        }
    }); 
};


// REGEX from sass-lint project 
// ------------------------------------------------------------
var isHyphenatedBEM = function (str) {
  return !(/[A-Z]|-{3}|_{3}|[^_]_[^_]/.test(str));
};


// VALIDATION FUNCTIONS FOR COMMANDS
// ------------------------------------------------------------
var validateName = function (name) {
    var coloredName = chalk.cyan(name);
    if (!isHyphenatedBEM(name)) {
        return `Component name: ${coloredName} is not hyphenated BEM (Block Element Modifier) format. ${N}Please check that you have entered the correct information.`;
    } else {
        return null;
    }
};

var validateType = function (type) {
    var coloredType = chalk.cyan(type);
    if (!(_.indexOf(vars.typeChoices, type) === -1)) {         
        return null;
    } else {
        return `Component type: ${coloredType} is not valid. ${N}Must use one of the following: ${vars.typeChoices.join(' - ')}.`;
    }
};

var validateBreakpointSize = function (size) {
    var coloredSizeInput = chalk.cyan(size);
    if (!(_.indexOf(vars.breakpointSizes, size) === -1)) {         
        return null;
    } else {
        return `Breakpoint size: ${coloredSizeInput} is not valid. ${N}Must use one of the following: ${vars.breakpointSizes.join(' - ')}.`;
    }
};

module.exports = {
    addComponentSubclass,
    removeComponentSubclass,
    updateComponentSubclass,
    validateName,
    validateType,
    validateBreakpointSize,
    isHyphenatedBEM
}