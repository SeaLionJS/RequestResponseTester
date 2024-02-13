export type TStage = "REQUEST_PAGE" | "LOADER" | "RESPONSE_PAGE"

export interface IErrorProps{
    message: string;
    isOpen: boolean;
    handleClose: ()=>undefined
}

export interface IMessage{
    requestNum: number;
    code: number
}

export interface ILoaderProps{
    percent: number;
}

export interface IRequestProps{
    startRequestsFn: (count:number)=>void;
}

export interface IReportProps{
    messages: IMessage[];
    handleClose: ()=>undefined
}