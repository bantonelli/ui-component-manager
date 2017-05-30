// ------------------------------------------------------------
// FACTORY FUNCTIONS 
// ------------------------------------------------------------
function createAtomOrMolecule(name, type) {          
    return {
        "name": name,
        "type": type,
        "variations": [],
        "modifiers": [],
        "complete": false,
        "initialDevelopment": {
            "planBlocks": false,
            "planElements": false,
            "planMarkup": false,
            "createPattern": false,
            "createMarkdown": false,
            "codeBaseStyles": false,
            "codeNeededJS": false,
            "testDesktop": false,
            "testMobile": false,
            "functional": false                
        },
        "variationDevelopment": {
            "planVariations": false,
            "codeVariationStyles": false,
            "variationsTested": false,
        },
        "modifierDevelopment": {
            "planModifiers": false,
            "codeModifierStyles": false,
            "modifiersTested": false,
        }
    };
}

function createOrganism(name, type) {
    return {
        "name": name,
        "type": type,
        "complete": false,
        "variations": [],
        "modifiers": [],
        "states": [],
        "breakpoints": [],        
        "initialDevelopment": {
            "identifyChildComponents": false,
            "identifyBreakpoints": false,
            "planStates": false,
            "planBlocks": false,
            "planElements": false,
            "planMarkup": false,
            "createPattern": false,
            "createMarkdown": false,
            "codeBaseStyles": false,
            "codeNeededJS": false,
            "testDesktop": false,
            "functional": false
        },
        "variationDevelopment": {
            "planVariations": false,
            "codeVariationStyles": false,
            "variationsTested": false,
        },
        "modifierDevelopment": {
            "planModifiers": false,
            "codeModifierStyles": false,
            "modifiersTested": false
        },
        "breakpointDevelopment": {
            "planBreakpoints": false,
            "codeBreakpointStyles": false,
            "breakpointsTested": false
        },
        "stateDevelopment": {
            "planStates": false,
            "codeStateClasses": false,
            "statesTested": false
        }
    };
}

function createTemplate(name, type) {
    return {
        "name": name,
        "type": type,
        "complete": false,
        "breakpoints": [],
        "initialDevelopment": {
            "identifyChildComponents": false,
            "identifyBreakpoints": false,
            "planMarkup": false,
            "createPattern": false,
            "createMarkdown": false,
            "codeBaseStyles": false,
            "testDesktop": false,
            "functional": false
        },
        "breakpointDevelopment": {
            "planBreakpoints": false,
            "codeBreakpointStyles": false,
            "breakpointsTested": false
        }
    };
}

function createVariation(name) {
    return {
        "variationName": name,
        "variationComplete": false
    };  
}

function createModifier(name) {
    return {
        "modifierName": name,
        "modifierComplete": false
    };  
}

function createBreakpoint(size) {
    return {
        "breakpointSize": size, 
        "planLayout": false,
        "codeMediaQuery": false,
        "breakpointComplete": false
    };
}

function createState(name) {
    return {
        "stateName": name,
        "complete": false,
    };
}

module.exports = {
    createAtomOrMolecule,
    createOrganism,
    createTemplate,
    createVariation,
    createModifier,
    createBreakpoint,
    createState
};