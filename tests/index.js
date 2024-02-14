const http = require('http');
const readline = require('readline');
 

function askQuestion(question){
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve=>{
        rl.question(question + " ", (str)=>{
            resolve(str)
            rl.close();
        });
    })
}

function makeRequest(route, method = "post", objToSend={}){
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        hostname: '127.0.0.1',
        port: 3000,
        path: route,
        method,
    };

    return new Promise((resolve, reject)=>{
        const req = http.request(options, (res) => {
            let data = ''
         
            res.on('data', (chunk) => {
                data += chunk;
            });
         
            res.on('end', () => {
                try{
                    resolve({data: JSON.parse(data), code: res.statusCode})
                }
                catch(e){
                    reject(e)
                }
            });
         
        }).on("error", (err) => {
            console.log("Error: ", err)
        })
        
        if(objToSend) {
            req.write(JSON.stringify(objToSend));
        }
        req.end()
    })
}

function printStatistic(responses, reqTimes, resTimes){
    console.log("length", responses.length)
    const {s, e} = responses.reduce((acc, res)=>{
        //console.log(res)
        if(res.requestNum == 200){
            return {s: acc.s + 1, e: acc.e}
        }
        return {s: acc.s, e: acc.e + 1}
    },{s:0, e: 0})
    console.log(`Successfull requests: ${s}, errors: ${e}`)

    let startTime = reqTimes[0]
    for(let i=0; i< reqTimes.length; i++){
        console.log(`${i}) Start: ${reqTimes[i] - startTime}, end: ${resTimes[i] - startTime}`)
    }
}

/////////////////////////////////////////////////////////////
async function handler(){
    const requestsSendTime = []
    const responseReceiveTime = []
    const responses = []
    const REQUESTS_TOTAL = 100
    let count = 0
    let timerId = -1

    const intervalHandler = async()=>{
        requestsSendTime.push(new Date().getTime())
        if(count==REQUESTS_TOTAL){
            clearInterval(timerId)
        }
        count++
        try{
            const res = await makeRequest("/api", "post", {code: count-1})
            if(res.data.code !== undefined){
                responseReceiveTime[res.data.code] = (new Date().getTime())
            }
            responses.push(res.data)
            if(responses.length == 100){
                printStatistic(responses, requestsSendTime, responseReceiveTime)
            }
        }
        catch(e){
            console.log(e)
        }
    }

    let n = await askQuestion(`Скільки зробити запитів у секунду?`)
    n *= 1
    if(isNaN(n)) n = 10
    else if(n < 1 || n > 100) n = 10 
    const reqInterval = 1000 / n
    console.log("interval is ", reqInterval)
    timerId = setInterval(intervalHandler, reqInterval)
}

handler()