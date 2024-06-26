require('dotenv').config();
const express = require('express');
const connectToDB = require('./config/db.js');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

connectToDB();

const app = express();

app.use(express.json());
app.use(cors());
app.options('*');
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/likes', require("./routes/likesRoutes"));
app.use("/api/service", require("./routes/serviceRoutes"));
app.use('/api/ads', require("./routes/adRoutes"));

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
