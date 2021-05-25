const express = require('express');
const path = require('path')

const router = require('./router')

const app = express();

const middleware = [
    express.static('static'),
]

app.use(middleware)
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use('/', router)

app.use((req, res, next) => {
    res.status(404).render("error", {
        code: "404",
        reason: "Page Not Found",
        description: "The page you are looking for does not exist."
    })
})

const port = 8080
app.listen(port)
