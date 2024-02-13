const express = require('express');
const apiRouter = express.Router();


const RequestThrottler = require("../Controllers/RequestThrottler");
const throttler = new RequestThrottler(4)
throttler.run()

async function apiMessage(req, res) {
    //console.log("request", req.body)
    res.setHeader('Content-Type', 'application/json');
    const data = req.body

    if(throttler.isRequestApproved()){

        if(data.code === undefined){
            res.status(500).send({});
            return
        }

        const timeResponse = await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve({requestNum: 200, code: data.code})
            }, Math.random()* 1000)
        })

        res.status(200).send(timeResponse);
    }
    else{
        if(data.code === undefined){
            res.status(500).send({});
            return
        }
        //console.log("throttle")
        res.status(429).send({code: data.code});
    }
};

            
apiRouter.post('/api', apiMessage);   

module.exports = apiRouter