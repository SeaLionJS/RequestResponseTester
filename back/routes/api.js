const express = require('express');
const apiRouter = express.Router();


const RequestThrottler = require("../Controllers/RequestThrottler");
const throttler = new RequestThrottler(10)
console.log(throttler.limit)
throttler.run()

async function apiMessage(req, res) {
    //console.log("request", req.body)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Keep-Alive', 'timeout=5, max=100');
    const data = req.body
    
    if(data.code === undefined){
        res.status(500).send({});
        return
    }

    if(throttler.isRequestApproved()){
        const timeResponse = await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve({requestNum: 200, code: data.code})
            }, Math.random()* 1000)
        })

        res.status(200).send(timeResponse);
    }
    else{
        //console.log("throttle")
        res.status(429).send({code: data.code});
    }
};

            
apiRouter.post('/api', apiMessage);   

module.exports = apiRouter