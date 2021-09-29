const {body} = require('express-validator');

exports.periodValid = [body("date1").notEmpty().isString().trim().isDate(),
body("date2").notEmpty().isString().trim().isDate(),
body("type").notEmpty().isString().trim(),
body("categoryId").optional().isString().trim().isMongoId()
]
