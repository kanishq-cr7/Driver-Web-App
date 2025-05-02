const rateLimit = require("express-rate-limit");

const windowMs  = (parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000;
const maxReq    = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

module.exports = rateLimit({
  windowMs,
  max: maxReq,
  message: { error: `Too many requests; please try again later.` },
  standardHeaders: true,
  legacyHeaders: false,
});
