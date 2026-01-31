const rateLimit = require('express-rate-limit');

exports.rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: 'Too many requests. Try again in 60 seconds.' },
    standardHeaders: true,
    legacyHeaders: false,
});