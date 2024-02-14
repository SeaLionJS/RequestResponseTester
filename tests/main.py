import requests
import threading
from time import sleep, time

resultList = []
timeStart = time()


def requestFn(*num):
    r = requests.post('http://localhost:3000/api', json={'code': str(num[0])})
    d = {
        "txt": r.text,
        "code": r.status_code,
        "time": timeStart - time()
    }
    resultList.append(d)


threadsList = []

for i in range(1000):
    threadsList.append(threading.Thread(target=requestFn, args=(i,)))

for t in threadsList:
    t.start()
    sleep(0.01)

errorCount = 0
successCount = 0
for r in resultList:
    # print(r["code"], r["txt"], r["time"])
    if r["code"] == 429:
        errorCount += 1
    else:
        successCount += 1

print(errorCount, successCount)
