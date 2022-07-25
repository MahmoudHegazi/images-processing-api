"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware 1
// this middle ware to validate the required parameters
var required_validator = function (req, res, next) {
    var missingParms = [];
    var error = false;
    var parms = {
        filename: req.query.filename,
        width: req.query.width,
        height: req.query.height
    };
    // add all the undefined query parameters name to missingParms list
    for (var parm in parms) {
        var parmValue = parms[parm];
        if (!parmValue) {
            error = true;
            missingParms.push(parm);
        }
    }
    if (error) {
        //res.send(`one or more required parameters are missing: ${missingParms.join(",")}`).status(400).end();
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify("one or more required parameters are missing: ".concat(missingParms.join(','))));
    }
    else {
        next();
    }
};
// Middleware 2 (Run after middleware 1) (validaite type s of query parameters filename is string and size parms are numbers)
var type_validator = function (req, res, next) {
    var invalidTypes = [];
    var error = false;
    var filename = (typeof req.query.filename ===
        'string');
    var valid_width = !isNaN(parseInt(req.query.width));
    var valid_height = !isNaN(parseInt(req.query.height));
    //var re2 = new RegExp('/^f/');
    //var r  = 'file'.match(re2);
    if (!filename) {
        invalidTypes.push('filename: string');
        error = true;
    }
    if (!valid_width) {
        invalidTypes.push('width: number');
        error = true;
    }
    if (!valid_height) {
        invalidTypes.push('height: number');
        error = true;
    }
    // add any new optional or required params and check them is easy
    // check optional params
    if (req.query.blur) {
        var blurCHeck = !isNaN(parseInt(req.query.blur.trim()));
        if (!blurCHeck) {
            invalidTypes.push('blur: number');
            error = true;
        }
        else {
            // save the value of blur in locals
            res.locals.blur = Math.round(parseInt(req.query.blur.trim()));
        }
    }
    // check optional params (Only allow true in rotate)
    if (req.query.rotate) {
        var rotateCheck = !isNaN(parseInt(req.query.rotate.trim()));
        if (!rotateCheck) {
            invalidTypes.push('rotate: number');
            error = true;
        }
        else {
            res.locals.rotate = Math.round(parseInt(req.query.rotate.trim()));
        }
    }
    if (error) {
        //res.send(`one or more parameters have invalid types: ${invalidTypes.join(",")}`);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify("one or more parameters have invalid types: ".concat(invalidTypes.join(','))));
    }
    else {
        next();
    }
};
exports.default = { required_validator: required_validator, type_validator: type_validator };
