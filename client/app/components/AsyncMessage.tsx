import React, { Suspense, Activity, use } from "react";
type MessageProps = {
  messagePromise: Promise<string>;
};
function fetchMessage(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Success get message after 2s");
    }, 2000);
  });
}

function Message({ messagePromise }: MessageProps) {
  const messageContent = use(messagePromise);

  return <p>{`Content here: ${messageContent}`}</p>;
}

function Loading() {
  return <p>Loading....</p>;
}

export default function AsyncMessage() {
  const messagePromise = fetchMessage();

  return (
    <>
      This is default component
      <p>Use hook</p>
      <Suspense fallback={<Loading />}>
        <Message messagePromise={messagePromise} />
      </Suspense>
      <Activity mode="visible">
        <Message messagePromise={messagePromise} />
      </Activity>
    </>
  );
}
