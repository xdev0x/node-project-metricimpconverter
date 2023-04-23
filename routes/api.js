'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
  .get((req, res)=>{
    const input = req.query.input;
    console.log('input: ', input);
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const _string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    if(initNum == null && (initUnit != null && initUnit != '')){
      return res.send('invalid number');
    } else if(initUnit == null && (initNum != null && initNum != '')){
      return res.send('invalid unit');
    } else if((initNum == null || initNum == '') && (initUnit == null || initUnit == '')){
      return res.send('invalid number and unit');
    } else {
      
      return res.send({
        initNum: initNum, 
        initUnit: initUnit == 'l' ? 'L' : initUnit, 
        returnNum: returnNum, 
        returnUnit: returnUnit, 
        string: _string
      });
    }

  });

};
