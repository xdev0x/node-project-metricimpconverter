const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

});

suite( 'Unit Tests', ( ) => {
  
  suite( 'Function convertHandler.getNum(input)', ( ) => {

    test( 'whole number input', ( done ) => {
      const input = '12kg';
      assert.equal( convertHandler.getNum( input ), 12 );
      done( );
    } );

    test( 'decimal number input', ( done ) => {
      const input = '2.3L';
      assert.equal( convertHandler.getNum( input ), 2.3 );
      done( );
    } );

    test( 'fractional input', ( done ) => {
      const input = '1/2mi';
      assert.equal( convertHandler.getNum( input ), 0.5 );
      done( );
    } );

    test( 'fractional input with a decimal.', ( done ) => {
      const input = '3/2kg';
      assert.equal( convertHandler.getNum( input ), 1.5 );
      done( );
    } );

    test( 'double-fraction (i.e. 3/2/3)', ( done ) => {
      const input = '3/2/3km';
      assert.equal( convertHandler.getNum( input ), null );
      done( );
    } );

    test( 'no numerical input ', ( done ) => {
      const input = 'kg';
      assert.equal( convertHandler.getNum( input ), 1 );
      done( );
    } );

  });
  
  suite( 'Function convertHandler.getUnit(input)', ( ) => {

    test( 'each valid input unit', ( done ) => {
      const input = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' ];
      input.forEach( ( el ) => {
        assert.equal( convertHandler.getUnit( el ), el.toLowerCase() );
      } );
      done( );
    } );
    
    test( 'error for an invalid input unit', ( done ) => {
      const input = 'test';
      assert.equal( convertHandler.getUnit( input ), null );
      done( );
    } );  
    
  });
  
  suite( 'Function convertHandler.getReturnUnit(initUnit)', ( ) => {
    
    test( 'return unit for each valid input unit', ( done ) => {
      const input  = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'L', 'gal', 'km', 'mi', 'kg', 'lbs' ];
      input.forEach( ( el,i ) => {
        assert.equal( convertHandler.getReturnUnit( el ), expect[ i ] );
      } );
      done( );
    } );

  } );
  
  suite( 'Function convertHandler.spellOutUnit(unit)', ( ) => {
    
    test( 'return the spelled-out string unit for each valid input unit', ( done ) => {
      const input  = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms' ];
      input.forEach( ( el,i ) => {
        assert.strictEqual( convertHandler.spellOutUnit( el ), expect[ i ] );
      } );
      done( );
    } );

  } );
  
  suite( 'Function convertHandler.convert(num, unit)', ( ) => {

    test( 'gal to L', ( done ) => {
      var input = [ 6.1, 'Gal' ];
      var expected = 23.09100;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1
      );
      done( );
    } );

    test( 'L to gal', ( done ) => {
      var input = [ 2.4, 'L' ];
      var expected = 0.63401;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1
      );
      done( );
    } );

    test( 'mi to km', ( done ) => {
      var input = [ 8, 'mi' ];
      var expected = 12.87472;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.00001
      );
      done( );
    } );

    test( 'km to mi', ( done ) => {
      var input = [ 4, 'km' ];
      var expected = 2.48549;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1
      );
      done( );
    } );

    test( 'lbs to kg', ( done ) => {
      var input = [ 3.3, 'lbs' ];
      var expected = 1.49685;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1
      );
      done( );
    } );

    test( 'kg to lbs', ( done ) => {
      var input = [ 3.6/5, 'kg' ];
      var expected = 1.58732;
      assert.approximately(
        convertHandler.convert( input[0], input[1] ),
        expected,
        0.1
      );
      done( );
    } );
    
  });

});
