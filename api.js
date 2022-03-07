const express = require('express');
const router = express.Router();
const https = require('https');
var bl = require('bl')




router.get('/github/commitinfo/:user/:reponame', async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = {
        hostname: 'api.github.com',
        path: '/repos/' + user + '/' + reponame + '/commits',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        OAUth: "<paste your token here>"
    }
   
    https.get(options, function (apiResponse) {
        apiResponse.pipe(bl(function (err, res) {
            if (err)
                return console.error(err)
                
                res = res.toString()
                console.log(res)
                res = JSON.parse(res)
                res.forEach(singleobj => {
                    console.log(singleobj.sha)
                 var  store = endsWithNumber(singleobj.sha)
                    console.log('jhvhjgigiu')
                    function endsWithNumber(str) {
                        return /[0-9]+$/.test(str);
                      }
    
                });
                console.log(res[0].sha)
        })) 
   
    
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send('Something wnent wrong!');
    })
})



module.exports = router;
