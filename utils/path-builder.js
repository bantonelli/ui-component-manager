// ------------------------------------------------------------
// FUNCTION TO CREATE PATHS TO NESTED PROPERTIES 
// ------------------------------------------------------------


// IDEA TO MAKE MORE EFFICIENT IN THE FUTURE: 
// UPDATE OBJECTS INLINE WITH STRINGIFY AS THEY ARE SAVED   
// var scanAndUpdateNestedProperty = (componentName, transform) => {
//     return function(obj) {
//         return JSON.parse(JSON.stringify(obj, function(key, value) {
//             if (typeof value === 'object' && value !== null && value.name === componentName) {
//                 return transform(value);
//             } else {
//                 return value;
//             }
//         }));
//     }
// }; 

var myObject = {
    "set": []
};

var resetMyObject = () => {
    myObject.set = [];
};

/*
- You can't directly update a nested property however 
  if you build a path to that nested property key then 
  you can set values to it with lodash's _.set() method.
*/
var createPathToProperty = (obj, key, path) => {
    var localSet;
    for(var prop in obj){
        if(prop === key){
            if (path === "") {
                myObject.set.push(path+prop);
            } else {
                myObject.set.push(path+"."+prop);
            }                          
        }
        if(typeof obj[prop] === 'object'){
            if (path === "") {
                createPathToProperty(obj[prop],key,path+prop);
            } else {
                createPathToProperty(obj[prop],key,path+"."+prop);
            }                
        }
    }  
    return myObject.set;
}; 

module.exports = {
    createPathToProperty,
    resetMyObject
};