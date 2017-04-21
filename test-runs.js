const store = require('./store');
const _ = require('lodash');
const utils = require('./utils');
var components = store.getAll();

// var components = store.getAll();
// console.log(components);

// console.log(store.addComponent('test-template', "template"));

// console.log(store.getComponentsWithType(components, 1));

// console.log(store.getIncomplete(store.getComponentsWithName(components, 'text-input')));

// console.log(store.getComplete(components));

// console.log(store.updateComponent('text-input', 'complete', true));

// console.log(store.createPathToProperty(store.getComponent(components, 'button'), 'variations', ""));

// console.log(store.createPathToProperty(obj1, 'planBlocks', ""));

// console.log(store.getComponent(components, 'button'));

// console.log(_.set(store.getComponent(components, 'button'), "complete", false));

// console.log(store.removeComponent('text-input'));

// console.log(store.logComponentProperties(store.getComponent(components, 'button'), ['type', 'initialDevelopment', 'variations'])); 

// console.log(store.addVariation("text-input", "text-input--facebook-form")); 

// console.log(store.addModifier("test-organism", "test-organism_height-small")); 

// console.log(store.removeVariation("text-input", "text-input--facebook-form")); 

// console.log(store.removeModifier("button", "button-height-large")); 

// console.log(store.updateModifier("text-input", "button-height-small", 'modifierComplete', false)); 

// console.log(store.updateVariation("button", "button--facebook", "variationComplete", true)); 

// store.updateVariation("test-organism", "button--facebook", "variationComplete", true);

// const N = "\n";
// var testFunction = function (type, key) {
//     var keys;
//     // var coloredKey = chalk.cyan(key);
//     // var coloredType = chalk.cyan(key);
//     var coloredKey = key;
//     var coloredType = type;
//     if (type === 'atom' || type === 'molecule') {
//         keys = utils.getComponentKeys(type);
//         if ((_.indexOf(keys, key) === -1)) {
//             return `Component of type: ${coloredType} does not have the property: ${coloredKey}. ${N}Please check that you have entered the correct information.`;
//         } 
//         return null;
//     }
// };