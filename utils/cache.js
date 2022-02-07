const NodeCache = require( "node-cache" );
const keyStorage = new NodeCache();

var Cache = function(req){
    obj = { my: "Special", variable: 42 };
 
    success = keyStorage.set( "myKey", obj, 10000 );

    console.log(keyStorage.get("myKey"))
}

module.exports = Cache;