import { IMessage } from "../types/types";

export async function fetchApi(ind: number):Promise<IMessage>{
    try{
        console.log("request time", ind)
        const response = await fetch('/api',{
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({code: ind}), 
        })
    
        const data = await response.json()
        console.log("response time", ind)
    
        return {requestNum: data.code, code: response.status};
    }
    catch(e){
        return {requestNum: ind, code: 429};
    }
}