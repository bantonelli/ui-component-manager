// ------------------------------------------------------------
// PRETTY PRINT PIPE COMMAND 
// ------------------------------------------------------------

// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;

// LOG FUNCTIONS 
// ------------------------------------------------------------
var logComponentProperties = (component, properties) => {
    var logString = 
`
-----------
"${component.name}" component: 
`;
    var property, propertyValue, cpath;
    for (var i = 0; i < properties.length; i++) {
        // console.log(properties[i]);
        property = properties[i];
        // console.log(property);
        cpath = utils.createPathToProperty(component, properties[i], "")[0];
        // console.log(cpath);
        stringLength = JSON.stringify(_.get(component, cpath), undefined, 8).length;
        propertyValue = _.get(component, cpath);
        if (typeof propertyValue === 'object' || typeof propertyValue === 'string') {
            propertyValue = JSON.stringify(propertyValue, undefined, 8).substr(1, stringLength - 2);    
        }
        logString += 
    `
    --
    "${properties[i]}": ${propertyValue}
    `;
        utils.resetMyObject();
    }
    return logString += 
    `
-----------
    `;
}

var logComponents = (components, propertiesPassed) => {
    var logString = ``;
    // var properties = ["type", "complete", "variations", "modifiers", "initialDevelopment", "variationDevelopment", "modifierDevelopment"];
    // Build property list of using first component
    var properties;
    if (components.length > 0) {
        for (var i = 0; i < components.length; i++) {                        
            if (propertiesPassed) {
                // Will only have propertiesPassed if using the properties command 
                // Properties command only deals with one type so we don't have to 
                    // type check here. 
                logString += logComponentProperties(components[i], propertiesPassed);
            } else {
                if (components[i].type === 'atom' || components[i].type === 'molecule') {
                    properties = _.without(vars.atomPropertyChoices, "name");
                } else if (components[i].type === 'organism') {
                    properties = _.without(vars.organismPropertyChoices, "name");
                } else {
                    properties = _.without(vars.templatePropertyChoices, "name");
                }
                logString += logComponentProperties(components[i], properties); 
            }            
        }   
    } else {
        properties = _.drop(_.keys(components));
        logString += logComponentProperties(components, properties);
    }    
    return logString;
};

const prettyHelp = `
Pretty-print your 'get' results. ${N}Pipe this command after 'get' (this must be the last pipe-command in the chain).`;

module.exports = function (vorpal) {
    vorpal
    .command('pretty', prettyHelp)
    .action(function(args, callback) {
        var self = this;                             
        // prettyFunction(args, callback, self);       
        var objectPassed = args.stdin[0];
        // console.log(args.stdin[0]);
        if (objectPassed instanceof utils.BadInputException || objectPassed instanceof utils.RandomException) {
            self.log(objectPassed.name + " --> " + objectPassed.message);
        } else if (typeof objectPassed === 'string') {
            self.log(objectPassed);
        } else {
            if (objectPassed.length > 0) {                
                var filteredAtoms = _.filter(objectPassed, { 'type': 'atom'});
                var filteredMolecules = _.filter(objectPassed, { 'type': 'molecule'});
                var filteredOrganisms = _.filter(objectPassed, { 'type': 'organism'});
                var filteredTemplates = _.filter(objectPassed, { 'type': 'template'});
                var fA = (filteredAtoms.length > 0);
                var fM = (filteredMolecules.length > 0);
                var fO = (filteredOrganisms.length > 0);
                var fT = (filteredTemplates.length > 0);
                if ((fA && fM) || (fA && fO) || (fA && fT) || (fM && fO) || (fM && fT) || (fO && fT)) {                    
                    // More than 1 type of component 
                        // If there is more than one type of objectPassed then properties 
                        // command was never called and thus all objects should retain all of their 
                        // original properties 

                        // If they retain all of their original properties then there is no need 
                        // to pass a list of properties to logComponents.
                            // In this case we would instead pass undefined to that parameter. 
                            // And let the logComponents function determine the properties to print 
                            // via type checking. 
                    self.log(logComponents(objectPassed, undefined));                    
                } else {
                    // 1 type of component 
                        // If we have called getProperties via properties command 
                        // then there should only be one type of objectPassed                    
                    var propertiesToPass = _.keys(objectPassed[0]);                        
                    self.log(logComponents(objectPassed, propertiesToPass));
                }                                
            } else {
                var propertiesToPass = _.keys(objectPassed);                        
                self.log(logComponents(objectPassed, propertiesToPass));
            }           
        }                       
        callback();                                                                                   
    });
}