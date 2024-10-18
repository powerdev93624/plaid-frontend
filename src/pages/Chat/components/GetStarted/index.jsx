import React from "react";
import { Flex, Typography, Button } from "antd";
import { useDispatch } from "react-redux";
import BotImg from "@/assets/img/get-started/bot.png";
import { usePlaidLink } from "react-plaid-link";
import { setPlaidToken } from "@/store/slices/AuthSlice";
import { apis } from "@/apis";

const GetStarted = () => {
  const dispatch = useDispatch();
    const [linkToken, setLinkToken] = React.useState(null);
    const onSuccess = React.useCallback(async (public_token) => {
      // send public_token to server
      const res = await apis.exchangePublicToken({ public_token });
      dispatch(setPlaidToken(res.payload.plaid_token));
    }, []);
    const config = {
      token: linkToken,
      onSuccess,
    };
    const generateToken = async () => {
      const response = await apis.createPlaidLinkToken();
      setLinkToken(response.payload.response.link_token);
    };
    const { open, ready } = usePlaidLink(config);
    const getPlaidToken = async () => {
      const res = await apis.getPlaidToken();
      if (res.status) {
        dispatch(setPlaidToken(res.payload.plaid_token));
      } 
    }  
    React.useEffect(() => {
      generateToken();
      getPlaidToken();
    }, []);
    const LinkAccount = () => {
      open();
    };
    

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{ maxWidth: 900, width: "100%" }}
    >
      <img src={BotImg} alt="bot-image" />
      <Typography.Title level={1}>Welcome To MoneyBot!</Typography.Title>
      <Typography.Text style={{ color: "#666666", textAlign: "center" }}>
        Effortlessly manage your finances by connecting all your financial
        accounts. Get real-time net worth and transaction monitoring,
        personalized insights, and actionable advice to help you achieve your
        financial goals.
      </Typography.Text>
      <Button
        type="default"
        style={{
          fontWeight: "bold",
          color: "#00C65E",
          border: "1px solid #00C65E",
          borderRadius: "3px",
          marginTop: "20px"
        }}
        onClick={LinkAccount}
        disabled={!ready}
      >
        Bank Account
      </Button>
      {/* <Button
        type="default"
        style={{
          fontWeight: "bold",
          color: "#00C65E",
          border: "1px solid #00C65E",
          borderRadius: "3px",
          marginTop: "20px"
        }}
        onClick={LinkAccount}
        disabled={!ready}
      >
        Bank Account
      </Button>
      <Button
        type="default"
        style={{
          fontWeight: "bold",
          color: "#00C65E",
          border: "1px solid #00C65E",
          borderRadius: "3px",
          marginTop: "20px"
        }}
        onClick={LinkAccount}
        disabled={!ready}
      >
        Bank Account
      </Button>
      <Button
        type="default"
        style={{
          fontWeight: "bold",
          color: "#00C65E",
          border: "1px solid #00C65E",
          borderRadius: "3px",
          marginTop: "20px"
        }}
        onClick={LinkAccount}
        disabled={!ready}
      >
        Bank Account
      </Button> */}
    </Flex>
  );
};

export default GetStarted;
