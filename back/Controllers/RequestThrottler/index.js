class RequestThrottler{
    constructor(limit=10){
        this.limit = limit
        this.count = 0
        this.timerId = -1
    }

    reset(){
        this.count = 0
        //console.log("count reset")
    }

    run(){
        this.timerId = setInterval(this.reset.bind(this), 1000)
    }

    stop(){
        if(this.timerId != -1){
            clearInterval(this.timerId)
            this.timerId = -1
        }
    }

    isRequestApproved(){
        if(this.count < this.limit){
            this.count++;
            return true
        }
        return false
    }
}

module.exports = RequestThrottler