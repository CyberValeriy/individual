const {body} = require('express-validator');

exports.deleteValid = [body("transactionId").notEmpty().isString().trim().isMongoId()];

exports.addValid = [body("value").notEmpty().isNumeric().trim(),
body("categoryId").notEmpty().isString().trim().isMongoId(),
body("type").notEmpty().isString().trim(),
body("description").notEmpty().isString().trim(),
body("date").notEmpty().isString().trim()];

exports.updateValid = [body("transactionId").notEmpty().isString().trim().isMongoId(), //or in one valid
body("value").notEmpty().isNumeric().trim(),
body("categoryId").notEmpty().isString().trim().isMongoId(),
body("type").notEmpty().isString().trim(),
body("description").notEmpty().isString().trim(),
body("date").notEmpty().isString().trim()
];