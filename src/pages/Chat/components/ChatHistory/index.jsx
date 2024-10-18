import { useDispatch, useSelector } from "react-redux";
import ChatBox from "@/components/ChatBox";
import React from "react";
import { apis } from "@/apis";
import { setMessageHistory } from "@/store/slices/ChatSlice";

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { messageHistory } = useSelector((state) => state.chat);
  const chatEndRef = React.useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  const getHistory = async () => {
    const res = await apis.getHistory();
    if (res.status) {
      dispatch(setMessageHistory(res.payload.chathistory.history));
    }
  };
  React.useEffect(() => {
    getHistory();
  }, []);
  return (
    <div
      style={{
        height: "calc(100vh - 230px)",
        margin: "0px auto",
        maxWidth: 1120,
        width: "100%",
        overflow: "auto",
        padding: 10,
      }}
    >
      <>
        {messageHistory && messageHistory.length > 0 ? (
          messageHistory.map((item, index) => {
            return (
              <ChatBox
                key={index}
                type={item.role.toUpperCase()}
                text={item.content}
              />
            );
          })
        ) : (
          <ChatBox
            type="SYSTEM"
            text="Great, William! You’ve successfully logged in and linked your account. Now, what question would you like to ask?"
          />
        )}
      </>
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatHistory;
