// PRETTY PRINT 
const pretty = require('./pretty');
const createComponent = require('./create-component');
const updateComponent = require('./update-component');
const removeComponent = require('./remove-component');
const properties = require('./properties');
const pipes = require('./pipes');
const variations = require('./variations');
const modifiers = require('./modifiers');
const breakpoints = require('./breakpoints');
const states = require('./states');

// ------------------------------------------------------------
// MODULE EXPORTS 
// ------------------------------------------------------------
module.exports = function (vorpal) {
    createComponent(vorpal);
    updateComponent(vorpal);
    removeComponent(vorpal);
    properties(vorpal);
    pipes(vorpal);
    variations(vorpal);
    modifiers(vorpal);
    breakpoints(vorpal);
    states(vorpal);
    pretty(vorpal);    
};