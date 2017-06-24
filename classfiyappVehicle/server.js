const express      = require('express')
const next         = require('next')
const cookie       = require('react-cookie')
const cookieParser = require('cookie-parser')
const dev          = process.env.NODE_ENV !== 'production'
const app          = next({dev})
const handle       = app.getRequestHandler()
const {parse} = require('url')
const pathMatch    = require('path-match')
const route        = pathMatch()

const post = route('/post/:id')
app.prepare()
    .then(() => {
        const server = express()
        server.use(cookieParser())

        server.get('*', (req, res) => {
            cookie.plugToRequest(req, res)
            const {pathname} = parse(req.url)
            if (post(pathname)) {
                app.render(req, res, '/post', post(pathname))
            }
            else {
                return handle(req, res)
            }
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
