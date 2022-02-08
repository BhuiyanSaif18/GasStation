const NodeCache = require( "node-cache" );
const keyStorage = new NodeCache();

let Cache = function(req){
    obj = { my: "Special", letiable: 42 };
 
    success = keyStorage.set( "myKey", obj, 10000 );

    console.log(keyStorage.get("myKey"))
}

module.exports = Cache;