const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const expressListRoutes = require('express-list-routes');
const app = express();
dotenv.config()
const { inserData } = require('./utils')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const languagesRoutes = require('./routes/languages');
const roleRoutes = require('./routes/roles');
const permissionRoutes = require('./routes/permissions');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB Connected Successfully')
}).catch((err) => {
    console.log(err)
})

var whitelist = ['http://localhost:8000', 'http://localhost:8080'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    methods: ['*'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/languages', languagesRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/permissions', permissionRoutes)



inserData(expressListRoutes, app);

app.listen(process.env.PORT || 5000, function () {
    console.log('CORS-enabled web server listening on port ', process.env.PORT || 5000)
})

