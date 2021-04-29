// Require librairies
const app = require('express')()

// Require the route
const usersRoute = require('./routes/users')

app
    .use('/users', usersRoute)
    .listen(5005, error => {
        if (error) console.log(error)
        else console.log('Server listening on port 5005, see http://localhost:5005')
    })