const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite( 'Functional Tests', ( ) => {

  suite( 'Routing Tests', ( ) => {
    
    suite( 'GET /api/convert => conversion object', ( ) => {
      
      test( 'Convert a valid input such as 10L: GET request to /api/convert', ( done ) => {
       chai.request( server )
        .get( '/api/convert' )
        .query( { input: '10L' } )
        .end( ( err,res ) => {
          assert.equal( res.status, 200 );
          assert.equal( res.body.initNum, 10 );
          assert.equal( res.body.initUnit, 'L' );
          assert.approximately( res.body.returnNum, 2.64172, 0.1 );
          assert.equal( res.body.returnUnit, 'gal' );
          done( );
        } );
      } );

      test( 'Convert an invalid input such as 32g: GET request to /api/convert', ( done ) => {
       chai.request( server )
        .get( '/api/convert' )
        .query( { input: '32g' } )
        .end( ( err,res ) => {
          assert.equal( res.status, 200 );
          assert.equal( res.text, 'invalid unit' );
          done( );
        } );
      } );

      test( 'Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', ( done ) => {
       chai.request( server )
        .get( '/api/convert' )
        .query( { input: '3/7.2/4kg' } )
        .end( ( err,res ) => {
          assert.equal( res.status, 200 );
          assert.equal( res.text, 'invalid number' );
          done( );
        } );
      } );

      test( 'Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', ( done ) => {
       chai.request( server )
        .get( '/api/convert' )
        .query( { input: '3/7.2/4kilomegagram' } )
        .end( ( err,res ) => {
          assert.equal( res.status, 200 );
          assert.equal( res.text, 'invalid number and unit' );
          done( );
        } );
      } );

      test( 'Convert with no number such as kg: GET request to /api/convert', ( done ) => {
       chai.request( server )
        .get( '/api/convert' )
        .query( { input: 'kg' } )
        .end( ( err,res ) => {
          assert.equal( res.status, 200 );
          assert.equal( res.body.initNum, 1 );
          assert.equal( res.body.initUnit, 'kg' );
          assert.approximately( res.body.returnNum, 2.20462, 0.1 );
          assert.equal( res.body.returnUnit, 'lbs' );
          assert.equal( res.body.string, '1 kilograms converts to 2.20462 pounds' );
          done( );
        } );
      } );

    });

  });

});