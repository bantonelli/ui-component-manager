const keys = require('./keys');

const N = "\n";

const typeChoices = ["atom", "molecule", "organism", "template"];
const breakpointSizes = ["xs", "sm", "md", "lg", "xl"];

// used in properties command 
const atomPropertyChoices = keys.getComponentKeys('atom');
const organismPropertyChoices = keys.getComponentKeys('organism');
const templatePropertyChoices = keys.getComponentKeys('template');

// used in update-component command 
const atomPropertyChoicesDeep = keys.getComponentKeysDeep('atom');
const organismPropertyChoicesDeep = keys.getComponentKeysDeep('organism');
const templatePropertyChoicesDeep = keys.getComponentKeysDeep('template');

// used in updateSubclass command function 
const variationPropertyChoices = keys.getVariationKeys();
const modifierPropertyChoices = keys.getModifierKeys(); 
const breakpointPropertyChoices = keys.getBreakpointKeys();
const statePropertyChoices = keys.getStateKeys();

module.exports = {
    N,
    typeChoices,
    breakpointSizes,
    atomPropertyChoices,
    organismPropertyChoices,
    templatePropertyChoices,
    atomPropertyChoicesDeep,
    organismPropertyChoicesDeep,
    templatePropertyChoicesDeep,
    variationPropertyChoices,
    modifierPropertyChoices,
    breakpointPropertyChoices,
    statePropertyChoices
};