// ------------------------------------------------------------
// EXCEPTION CLASSES  
// ------------------------------------------------------------
function BadInputException(message) {
    this.message = message;
    this.name = "Bad Input Exception";
}

function RandomException(message) {
    this.message = message;
    this.name = "Random Unforseen Exception";
}

module.exports = {
    BadInputException,
    RandomException 
}