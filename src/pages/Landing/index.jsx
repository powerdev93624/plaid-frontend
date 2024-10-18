import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  Flex,
  Form,
  Typography,
  Input,
  Modal,
  ConfigProvider,
  Alert,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SignIn } from "@/store/slices/AuthSlice";
import { apis } from "@/apis";
import { useNavigate, Navigate } from "react-router-dom";

const LandingPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { Header, Content } = Layout;
  const [isLogInModalOpen, setIsLogInModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false);
  const showLogInModal = () => {
    setIsLogInModalOpen(true);
  };

  const handleLogInOk = () => {
    setIsLogInModalOpen(false);
  };

  const handleLogInCancel = () => {
    setIsLogInModalOpen(false);
  };

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignUpOk = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignUpCancel = () => {
    setIsSignUpModalOpen(false);
  };

  const [login_form] = Form.useForm();
  const [signup_form] = Form.useForm();
  const [loginLoading, setLoginLoading] = React.useState(false);

  React.useEffect(() => {
    if (login_form && isLogInModalOpen) {
      login_form.resetFields();
    }
  }, [login_form, isLogInModalOpen]);

  const onClickLogin = async () => {
    try {
      const login_values = await login_form.validateFields();
      const response = await apis.login(login_values);
      if (response.status) {
        // Handle successful login
        dispatch(SignIn(response.payload.token));
        setIsLogInModalOpen(false);
        console.log("Login successful");
        navigator("/chat");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      if (error.status == 404) {
        setIsLogInModalOpen(false);
        alert("User Record doesn't exist, kindly register!");
        setIsSignUpModalOpen(true);
      }
      console.error("Validation failed:", error);
    }
  };
  const onClickSignUp = async () => {
    try {
      const signup_values = await signup_form.validateFields();
      const response = await apis.signup(signup_values);
      if (response.status) {
        setIsSignUpModalOpen(false);
        setIsLogInModalOpen(true);
      } else {
        // Handle login error
        console.error("Sign Up failed");
      }
    } catch (error) {
      if (error.status == 409) {
        alert("Same Email already registered!");
      }
      console.log(error);
    }
  };
  return token ? (
    <Navigate to="/chat" />
  ) : (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "#eeeeee",
            },
          },
        }}
      >
        <Modal
          title=""
          open={isLogInModalOpen}
          onOk={handleLogInOk}
          onCancel={handleLogInCancel}
          footer={null}
        >
          <div style={{ height: "100%", position: "relative" }}>
            <div style={{ padding: "20px 30px", height: "100%" }}>
              <Flex vertical justify="center">
                <Typography.Title
                  level={3}
                  style={{
                    marginTop: 40,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Sign In
                </Typography.Title>

                <Form
                  name="login-form"
                  form={login_form}
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
                      style={{
                        width: "100%",
                        backgroundColor: "#00C65E",
                        color: "#FFF",
                      }}
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
          </div>
        </Modal>
        <Modal
          title=""
          open={isSignUpModalOpen}
          onOk={handleSignUpOk}
          onCancel={handleSignUpCancel}
          footer={null}
        >
          <div style={{ height: "100%", position: "relative" }}>
            <div style={{ padding: "20px 30px", height: "100%" }}>
              <Flex vertical justify="center">
                <Typography.Title
                  level={3}
                  style={{
                    marginTop: 40,
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Sign Up
                </Typography.Title>

                <Form
                  name="signup-form"
                  form={signup_form}
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
                  <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your Password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: "100%",
                        backgroundColor: "#00C65E",
                        color: "#FFF",
                      }}
                      htmlType="submit"
                      loading={loginLoading}
                      onClick={onClickSignUp}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </Flex>
            </div>
          </div>
        </Modal>
      </ConfigProvider>

      <Layout style={{ minHeight: "100vh", backgroundColor: "#000000" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "transparent",
            gap: "1vw",
          }}
        >
          <Button
            type="default"
            icon={<HomeOutlined />}
            style={{
              fontWeight: "bold",
              color: "#00C65E",
              backgroundColor: "transparent",
              border: "1px solid #00C65E",
              borderRadius: "3px",
            }}
            onClick={showLogInModal}
          >
            Log In
          </Button>
          <Button
            type="default"
            icon={<HomeOutlined />}
            style={{
              fontWeight: "bold",
              color: "#00C65E",
              backgroundColor: "transparent",
              border: "1px solid #00C65E",
              borderRadius: "3px",
            }}
            onClick={showSignUpModal}
          >
            Sign Up
          </Button>
        </Header>
        <Content
          style={{
            padding: "1vw 5vw",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              margin: 0,
              fontSize: "8vw",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            Web <br /> Application
          </Typography.Title>
          <br />
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              fontSize: "4vw",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            Created By
            <br />
            Ravi Talajiya
          </Typography.Title>
          <Flex style={{ justifyContent: "flex-end" }}>
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                fontSize: "5vw",
                color: "#00C65E",
                fontWeight: "bold",
              }}
            >
              moneyBot
            </Typography.Title>
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default LandingPage;
