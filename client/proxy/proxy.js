// Run this on one host and the client on another for a CORS workaround to successfully get the RSS feed

const express = require('express')
const request = require('request')

const app = express()

const RSS_URL = 'https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss'

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/yle', (req, res) => {
    request(
        { url: RSS_URL },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({
                    type: 'error', message:
                        err.message
                })
            }
            res.set('Content-Type', 'application/rss+xml')
            res.send(Buffer.from(body))
        })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`))