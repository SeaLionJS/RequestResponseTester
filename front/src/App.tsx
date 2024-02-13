import { useState } from "react";
import "./App.css";
import RequestWidget from "./Widgets/RequestWidget";
import ReportWidget from "./Widgets/ReportWidget";
import LoaderWidget from "./Widgets/LoaderWidget";

import { IMessage, TStage } from "./types/types";
import { fetchApi } from "./Requests/requestApi";

interface IMessageHadler {
  responses: IMessage[];
  request_time: number;
  count_limit: number;
  count: number;
  requestCallback: () => void;
  timerId?: number;
  setRequestTime: (requestsPerSecond: number) => void;
  sendRequest: () => void;
  run: (callback: (count?: number) => void) => void;
}

//Зробив для опрацювання вхідних запитів, так як він один, то буде об'єктом
const messagesHandler: IMessageHadler = {
  count_limit: 1000,
  responses: [],
  request_time: 10,
  count: 0,
  timerId: -1,
  requestCallback: () => {},

  setRequestTime(requestsPerSecond) {
    this.request_time = 1000 / requestsPerSecond;
  },
  sendRequest() {
    fetchApi(this.count).then((resp) => {
      this.responses.push(resp);
      this.requestCallback();
    });
  },
  run(callback) {
    //не допускаємо повторного запуску
    if (this.timerId != -1) return;
    //console.log("timer run");
    this.requestCallback = callback;
    this.timerId = setInterval(() => {
      if (this.count <= this.count_limit) {
        this.sendRequest();
      } else {
        clearInterval(this.timerId);
        this.timerId = -1;
        //console.log("timer stopped");
        this.count = 0;
      }
      this.count++;
    }, this.request_time);
  },
};

function App() {
  const [appState, setAppState] = useState<TStage>("REQUEST_PAGE");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [requests, setRequests] = useState<number>(0);

  const onServerResponse = () => {
    setRequests(messagesHandler.responses.length);
    if (messagesHandler.responses.length == messagesHandler.count_limit) {
      setMessages([...messagesHandler.responses]);
      setAppState("RESPONSE_PAGE");
    }
  };

  const startRequestsFn = (requests: number) => {
    setAppState("LOADER");
    messagesHandler.responses = [];
    messagesHandler.setRequestTime(requests);
    messagesHandler.run(onServerResponse);
  };

  switch (appState) {
    case "REQUEST_PAGE":
      return <RequestWidget startRequestsFn={startRequestsFn} />;
    case "LOADER":
      return (
        <LoaderWidget
          percent={(requests / messagesHandler.count_limit) * 100}
        />
      );
    case "RESPONSE_PAGE":
      return (
        <ReportWidget
          messages={messages}
          handleClose={() => {
            setAppState("REQUEST_PAGE");
          }}
        />
      );
  }
}

export default App;
