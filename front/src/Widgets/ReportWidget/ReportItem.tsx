import { IMessage } from "../../types/types";

interface ExtendedIMessage extends IMessage {
  id: number;
}

export default function ReportItem({ code, requestNum, id }: ExtendedIMessage) {
  return (
    <article className={`app-report-message${code == 429 ? " error" : ""}`}>
      <span>
        {id + 1}
        {")"}
      </span>
      {code == 200 && (
        <>
          <span>{`Номер запиту ${requestNum}`}</span>
        </>
      )}
      <span>{`Код відповіді ${code}`}</span>
    </article>
  );
}
