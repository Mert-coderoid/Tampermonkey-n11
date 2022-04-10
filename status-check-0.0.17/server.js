const sc = require("./status-check")
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'))

// catch /list request with post method
app.post('/list', (req, res) => {
    const links = req.body
    // console.log(links)
    // start checking the links
    sc.startCheckingLink(
        links,
        function (outputArray) {
            // send the output array to the client
            console.log("output:", outputArray)
            res.send(outputArray)
        },
        true
    )


})

// start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



/* sc.startCheckingLink(
    [
        'https://www.n11.com/urun/onizleme/7da0afb5-4ddb-4a13-bb9a-b07e8df5ccb0?byPassCache=true',
        'https://www.n11.com/urun/onizleme/518d6cc1-7fd4-4de7-b210-5b863216461f?byPassCache=true'
    ],
    function (outputArray) {
        console.log(outputArray)
    },
    true
)
 */