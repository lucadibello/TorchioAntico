// Load environment variables
require('dotenv').config()

const express = require("express"); // Express App
const cors = require("cors"); // Set HEADERS for CORS operations
const bodyParser = require("body-parser"); // Parse HTTP requests to JSON
const morgan = require("morgan"); // Log HTTP request
const helmet = require("helmet"); // Enchanced security
const compression = require("compression"); // Compress routes
const config = require("./config") // Load application config file
const {sequelize} = require("./models") // Load Sequelize ORM with all the relatives Models

// Create app object
const app = express();

// Set middlewares
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());
app.use(compression())

// Define API routes
const auth = require('./routes/api/auth')
app.use('/api/auth', auth)

const user = require('./routes/api/user')
app.use('/api/user', user)

const room = require('./routes/api/room')
app.use('/api/room', room)

// Sync DB
sequelize.sync({ alter: true, drop: false }).then(() => {
    // Start app
    app.listen(config.app.port, () => console.log(`Server started at ${config.app.port}`));
    app.route('/');
    
    // Output splitter
    console.log('--------------------------------------------')
    
    // Print enviroment status
    if (process.env.NODE_ENV == "production") {
        console.log('App started in production mode 🏢')
    } else {
        console.log('App started in development mode 👨🏻‍💻')
    }
    // Output splitter
    console.log('--------------------------------------------')
})
