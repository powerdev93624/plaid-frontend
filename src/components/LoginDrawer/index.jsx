import React from "react";
import { Button, Drawer, Flex, Form, Typography, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoginDrawer } from "@/store/slices/AppSlice";
import { SignIn } from "@/store/slices/AuthSlice";
import { CloseOutlined } from "@ant-design/icons";
import LoginBg from "@/assets/img/login-bg.jpg";
import { apis } from "@/apis";

const LoginDrawer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { isLoginDrawer } = useSelector((state) => state.app);
  const [loginLoading, setLoginLoading] = React.useState(false);

  const onClose = () => {
    dispatch(setIsLoginDrawer(false));
  };

  React.useEffect(() => {
    if (form && isLoginDrawer) {
      form.resetFields();
    }
  }, [form, isLoginDrawer]);

  const onClickLogin = async () => {
    try {
      const values = await form.validateFields();
      const response = await apis.login(values);
      if (response.status) {
        // Handle successful login
        dispatch(SignIn(response.payload.token));
        dispatch(setIsLoginDrawer(false))
        console.log('Login successful');
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      closable={false}
      open={isLoginDrawer}
      width={450}
      styles={{
        body: {
          padding: "30px 0px 10px 0px",
        },
      }}
    >
      <div style={{ height: "100%", position: "relative" }}>
        <div style={{ padding: "0px 30px", height: "100%" }}>
          <Flex justify="flex-end">
            <Button 
              type="link" 
              icon={<CloseOutlined />} 
              onClick={onClose}
              style={{ backgroundColor: "#DAF3E1", color: "#00C65E" }} />
          </Flex>
          <Flex
            vertical
            justify="center"
            style={{ height: "calc(100% - 30px)", marginTop: -80 }}
          >
            <Typography.Title level={3} style={{ margin: 0, fontWeight: 600 }}>
              Welcome To MoneyBot Platform
            </Typography.Title>

            <Form
              name="login-form"
              form={form}
              layout="vertical"
              style={{ marginTop: 20 }}
            >
              <Form.Item
                style={{ marginBottom: 20 }}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Username" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 30 }}
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input password!",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Enter Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%", backgroundColor: "#00C65E", color: "#FFF" }}
                  htmlType="submit"
                  loading={loginLoading}
                  onClick={onClickLogin}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Flex>
        </div>
        <img
          src={LoginBg}
          alt="login-background"
          style={{ position: "absolute", bottom: 0 }}
          width={"100%"}
        />
      </div>
    </Drawer>
  );
};

export default LoginDrawer;
