import { Flex, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setMessageHistory } from "@/store/slices/ChatSlice";
import { ArrowUpOutlined } from "@ant-design/icons";
import React from "react";
import { apis } from "@/apis";

const InputBox = () => {
  const dispatch = useDispatch();
  const { messageHistory } = useSelector((state) => state.chat);
  const { token, plaid_token } = useSelector((state) => state.auth);
  const [message, setMessage] = React.useState("");
  const [isInputBoxDisabled, setIsInputBoxDisabled] = React.useState(false);

  const sendUserMessage = async () => {
    if (plaid_token) {
      dispatch(
        setMessageHistory([
          ...messageHistory,
          { role: "user", content: message },
        ])
      );
      setIsInputBoxDisabled(true);
      const url = 'http://localhost:5555/api/v1/chat/add_history';
      var tmpPromptResponse = '';
      try {
        const response = await fetch(url , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: message,
          }),
        });
        
        // eslint-disable-next-line no-undef
        let decoder = new TextDecoderStream();
        if (!response.body) return;
        const reader = response.body
          .pipeThrough(decoder)
          .getReader();
        
        while (true) {
          var {value, done} = await reader.read();
          
          if (done) {
            break;
          } else {
            tmpPromptResponse += value;
            dispatch(
              setMessageHistory([
                ...messageHistory,
                { role: "user", content: message },
                { role: "assistant", content: tmpPromptResponse },
              ])
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
      setMessage("");
      setIsInputBoxDisabled(false);
    } else {
      alert("First link your bank account!");
      setMessage("");
    }
  };
  return (
    <Flex
      style={{
        height: 80,
        backgroundColor: "white",
        padding: "20px 20px",
      }}
    >
      <Flex
        style={{
          border: "solid 1px #DFDFDF",
          height: 40,
          width: "100%",
          padding: "0px 5px",
          backgroundColor: "white",
        }}
        align="center"
      >
        <Input
          className="input-box"
          placeholder="Ask anything about finances"
          style={{ border: "none" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              sendUserMessage();
            }
          }}
          disabled={isInputBoxDisabled}
        />
        <Button
          icon={<ArrowUpOutlined />}
          style={{
            backgroundColor: "#DAF3E1",
            color: "#00C65E",
            border: "1px solid #00C65E",
          }}
          onClick={sendUserMessage}
        />
      </Flex>
    </Flex>
  );
};

export default InputBox;
