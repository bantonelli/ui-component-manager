// ------------------------------------------------------------
// GET KEY FUNCTIONS  
// ------------------------------------------------------------
let factories = require('./factories');

/*
getComponentKeysDeep: 
- Creates an array of property names for an object 2 levels deep.
    - The deep search will only show simple properties 
        not object properties, because they are not going to 
        be updateable through the CLI. 
    - We want the structure of the nested objects to stay the 
      same. 
- Made to be used in conjunction with createPathToProperty(). 
*/
const getComponentKeysDeep = (type) => {
    var testObject;
    var propertyList = [];
    if (type === 'atom' || type === 'molecule') {
        testObject = factories.createAtomOrMolecule('test', 'atom');
    } else if (type === 'organism') {
        testObject = factories.createOrganism('test', 'organism');
    } else if (type === 'template') {
        testObject = factories.createTemplate('test', 'template');
    } else {
        return undefined;
    }
    for(var property in testObject){
        if(typeof testObject[property] === 'object'){
            var innerObject = testObject[property];
            for(var prop in innerObject){
                propertyList.push(prop);
            }       
        } else {
            propertyList.push(property);
        }         
    } 
    return propertyList;   
}

/*
getComponentKeys: 
- Creates an array of property names for an object 1 level deep.
- Made to be used in conjunction with createPathToProperty(). 
- Also used in conjunction with pretty printing which 
  only needs surface level properties.  
*/

const generateKeys = (testObject) => {
    var propertyList = [];
    for(var property in testObject){
        propertyList.push(property);                
    } 
    return propertyList; 
};

// const getComponentKeys = (type) => {
//     var testObject;
//     if (type === 'atom' || type === 'molecule') {
//         testObject = factories.createAtomOrMolecule('test', 'atom');
//     } else if (type === 'organism') {
//         testObject = factories.createOrganism('test', 'organism');
//     } else if (type === 'template') {
//         testObject = factories.createTemplate('test', 'template');
//     } else {
//         return undefined;
//     }
//     return generateKeys(testObject);
// } 

function getComponentKeys(type) {
    var testObject;
    if (type === 'atom' || type === 'molecule') {
        testObject = factories.createAtomOrMolecule('test', 'atom');
    } else if (type === 'organism') {
        testObject = factories.createOrganism('test', 'organism');
    } else if (type === 'template') {
        testObject = factories.createTemplate('test', 'template');
    } else {
        return undefined;
    }
    return generateKeys(testObject);
}

const getVariationKeys = () => {
    var testObject = factories.createVariation('test');
    return generateKeys(testObject);
};

const getModifierKeys = () => {
    var testObject = factories.createModifier('test');
    return generateKeys(testObject);
};

const getStateKeys = () => {
    var testObject = factories.createState('test');
    return generateKeys(testObject);
};

const getBreakpointKeys = () => {
    var testObject = factories.createBreakpoint('test');
    return generateKeys(testObject);
};

module.exports = {
    getComponentKeys,
    getComponentKeysDeep,
    getVariationKeys,
    getModifierKeys,
    getBreakpointKeys,
    getStateKeys
};