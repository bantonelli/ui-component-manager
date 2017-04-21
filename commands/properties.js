// ------------------------------------------------------------
// VIEW PROPERTIES COMMAND 
// ------------------------------------------------------------


// REQUIRES
// ------------------------------------------------------------
const _ = require('lodash');
const store = require('../store');
const utils = require('../utils');
const vars = utils.vars;
const N = vars.N;


// VARS
// ------------------------------------------------------------
const propertiesHelp = `
Pass in list of properties you wish to see in your results. ${N}Pipe this command after 'get', 'name', 'type', 'complete', or 'incomplete'.`;


// EXPORT
// ------------------------------------------------------------
module.exports = function(vorpal) {
    let chalk = vorpal.chalk;    
    vorpal
    .command('properties', propertiesHelp)
    .option('--atom')
    .option('--molecule')
    .option('--organism')
    .option('--template')
    .action(function(args, callback) {
        let message = `Please choose the properties you wish to see.`;
        let propertyChoices;
        let self = this;
        let components = [];
        if (args.options.atom) {            
            propertyChoices = _.without(vars.atomPropertyChoices, "name", "type");
            components = _.filter(args.stdin[0], { 'type': 'atom'});
        } else if (args.options.molecule) {
            propertyChoices = _.without(vars.atomPropertyChoices, "name", "type");
            components = _.filter(args.stdin[0], { 'type': 'molecule'});
        } else if (args.options.organism) {
            propertyChoices = _.without(vars.organismPropertyChoices, "name", "type");
            components = _.filter(args.stdin[0], { 'type': 'organism'});
        } else if (args.options.template) {
            propertyChoices = _.without(vars.templatePropertyChoices, "name", "type");
            components = _.filter(args.stdin[0], { 'type': 'template'});
        } else {
            // No type option passed so stop execution here
            self.log('no type option passed');
            callback();
            return;
        }
        if (components.length === 0) {
            // No components so stop execution here
            self.log("No components of type specified");
            callback();
            return; 
        } else {                        
            var newComponents = [];        
            self.prompt({
                type: 'checkbox',
                name: 'propertyChooser',
                choices: propertyChoices,
                message: message,
                validate: function (answer) {
                    if (answer.length < 1) {
                        return ('You must choose at least 1 property');
                    } else {
                        return true;
                    }
                }
            }, (answers) => {            
                if (answers) {
                    try {
                        for (let component of components) {
                            newComponents.push(store.getProperties(component, answers.propertyChooser));
                        }                                                
                        // vorpal.emit('client_prompt_submit', 'properties');
                        self.log(newComponents);
                        callback();                                     
                    } catch (error) {
                        self.log(error);
                        callback(); 
                    }
                    // self.log(answers.propertyChooser);                                
                } else {
                    self.log('component not created');
                    callback();
                }                            
            });
            // vorpal.on('client_prompt_submit', function (command){
            //     if (command === "properties") {
            //         self.log(newComponents);
            //         callback();
            //     } 
            // });
        } 
    });
};



