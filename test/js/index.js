// This will search for files ending in .test.js and require them
// // so that they are added to the webpack bundle

var context = require.context('.', true, /\.js?$/);
context.keys().forEach(context);
console.log(context);
module.exports = context;
