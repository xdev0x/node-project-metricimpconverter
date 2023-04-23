function ConvertHandler() {

  this.units = {
    gal : [ 'gallons'   , 'L'],
    l   : [ 'liters'    , 'gal'],
    kg  : [ 'kilograms' , 'lbs'],
    lbs : [ 'pounds'    , 'kg'],
    mi  : [ 'miles'     , 'km'],
    km  : [ 'kilometers', 'mi']
  }

  this.divideFraction = function ( input ) {
    input = input.split( '/' );
    return input.length <= 2
            ? input.reduce( ( a,b ) => { return a / b; } )
            : null;
  }

  this.getNum = function(input) {
    let num = input.toLowerCase().match( /[^a-z]+/ );
    let result = num 
                  ? num[0] !== 1 
                    ?  this.divideFraction(num[0]) : 1
                    : 1;
    return result;
  };
  
  this.getUnit = function(input) {
    let unit = input.toLowerCase().match( /[a-z]+/ );
    let result = unit ? 
                      Object.keys(this.units).includes(unit[0]) 
                        ? unit[0].trim() 
                          : null 
                    : null
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = typeof(initUnit) == 'string' ? initUnit.toLowerCase() : initUnit;
    let result = Object.keys(this.units).includes(initUnit) ? this.units[ initUnit ][ 1 ] : '';
    return result;
  };

  this.spellOutUnit = function(unit) {
    unit = typeof(unit) == 'string' ? unit.toLowerCase() : unit;
    let result = Object.keys(this.units).includes(unit) ? this.units[ unit ][ 0 ] : '';
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit = typeof(initUnit) == 'string' ? initUnit.toLowerCase() : initUnit;
    switch(initUnit){
      case "gal": {
        result = Number((initNum * galToL).toFixed(5));
        break;
      }
      case "l": {
        result = Number((initNum / galToL).toFixed(5));
        break;
      }
      case "lbs": {
        result = Number((initNum * lbsToKg).toFixed(5));
        break;
      }
      case "kg": {
        result = Number((initNum / lbsToKg).toFixed(5));
        break;
      }
      case "mi": {
        result = Number((initNum * miToKm).toFixed(5));
        break;
      }
      case "km": {
        result = Number((initNum / miToKm).toFixed(5));
        break;
      }
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let spelledOutInitNum = this.spellOutUnit(initUnit);
    let spelledOutReturnNum = this.spellOutUnit(returnUnit);
    result = ''+initNum+' '+spelledOutInitNum+' converts to '+returnNum+' '+spelledOutReturnNum+'';
    return result;
  };
  
}

module.exports = ConvertHandler;
