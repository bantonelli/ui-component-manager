// EXCEPTIONS
const {BadInputException, RandomException} = require('./exceptions');

// FACTORIES
const {
    createAtomOrMolecule, 
    createOrganism, 
    createTemplate, 
    createVariation, 
    createModifier,
    createBreakpoint,
    createState 
} = require('./factories');

// PATH BUILDER
const {createPathToProperty, resetMyObject} = require('./path-builder');

// KEYS
const {
    getComponentKeys, 
    getComponentKeysDeep, 
    getVariationKeys, 
    getModifierKeys, 
    getBreakpointKeys, 
    getStateKeys
} = require('./keys');

// VARS
const vars = require('./vars');

// UTILITIES
const {
    addComponentSubclass,
    removeComponentSubclass,
    updateComponentSubclass,
    isHyphenatedBEM, 
    validateName, 
    validateType,
    validateBreakpointSize
} = require('./command-utilities');




// ------------------------------------------------------------
// MODULE EXPORTS 
// ------------------------------------------------------------
module.exports = {
    BadInputException,
    RandomException,
    createAtomOrMolecule,
    createOrganism,
    createTemplate,
    createVariation,
    createModifier,
    createBreakpoint,
    createState,
    getComponentKeys,
    getComponentKeysDeep,
    getVariationKeys,
    getModifierKeys,
    getBreakpointKeys,
    getStateKeys,
    addComponentSubclass,
    removeComponentSubclass,
    updateComponentSubclass,
    createPathToProperty,
    resetMyObject,
    isHyphenatedBEM,
    validateName,
    validateType,
    validateBreakpointSize,
    vars
};