Handlebars.registerHelper( 'toString', function returnToString( x ){
    return ( x === void 0 ) ? 'undefined' : x.toString();
} );