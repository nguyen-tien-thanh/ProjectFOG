// Handlebars.registerHelper( 'toString', function returnToString( x ){
//     return ( x === void 0 ) ? 'undefined' : x.toString();
// } );

// Handlebars.registerHelper('isAdmin', function(username, options) {
//     var Admins = 'Admin';
//       if(Admins.includes (username)) {
//           return options.fn(this);
//       }else{
//           return options.inverse(this);  
//       }
//   });
  
  module.exports = {
    sum: (a,b) => a+b,
    ifeq: function(a,b, options){
      if (a == b){
        return options.fn(this);
      }else{
        return options.inverse(this);  
      }
    },
    isAdmin: function(username, options) {
      var Admins = 'Admin';
      if(Admins.includes (username)) {
          return options.fn(this);
      }else{
          return options.inverse(this);  
      }
    },
    isStaff: function(username, options) {
      var Staffs = 'Staff';
      if(Staffs.includes (username)) {
          return options.fn(this);
      }else{
          return options.inverse(this);  
      }
    },
    isQAC: function(username, options) {
      var QACs = 'QAC';
      if(QACs.includes (username)) {
          return options.fn(this);
      }else{
          return options.inverse(this);  
      }
    },
    ifCond: function(v1, operator, v2, options) {
      switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
    }
  }