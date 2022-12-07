// src/pages/messages.tsx

import { trpc } from "../utils/trpc";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();
  if (isLoading) return <div>Fetching Messages...</div>;
  return (
    <div>
      {messages?.map((message, index) => {
        return (
          <div key={index}>
            <p>{message.message}</p>
            <span>
              {" "}
              -{message.name} ({message.email})
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
