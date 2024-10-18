import React from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./Header";
import AppSider from "./Sider";
import LoginDrawer from "@/components/LoginDrawer";
import { apis } from "@/apis";
import { setPlaidToken } from "@/store/slices/AuthSlice";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { token, plaid_token } = useSelector((state) => state.auth);
  
  return token ? (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: "#004e42", padding: 20 }}
    >
      <AppSider />
      <Layout>
        <AppHeader />
        <Content>{children}</Content>
      </Layout>
      <LoginDrawer />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default AppLayout;
