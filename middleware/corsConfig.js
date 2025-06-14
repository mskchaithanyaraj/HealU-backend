const cors = require("cors");

const allowedOrigins = [
  "https://healuonline.netlify.app",
  "http://healu.chaithanyaraj.live",
  "https://healu.chaithanyaraj.live",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
