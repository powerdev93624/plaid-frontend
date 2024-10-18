import React from "react";
import { Layout, Menu, Typography, Flex, Drawer } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsToggled } from "@/store/slices/AppSlice";
const { Sider } = Layout;

const AppSider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //   const { authUser } = useSelector((state: RootState) => state.auth);
  const selectedKey = location.pathname.replace("/", "") || "home";
  const { isToggled } = useSelector((state) => state.app);
  const [innerWidth, setInnerWidth] = React.useState(0);

  const items = [
    {
      type: "group",
      label: <span style={{ color: "white" }}>Today</span>,
    },
    {
      key: "get-started",
      icon: <MessageOutlined style={{ color: "white", fontSize: 18 }} />,
      label: (
        <span style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          Get Started
        </span>
      ),
    },
    {
      key: "how-it-works",
      icon: <MessageOutlined style={{ color: "white", fontSize: 18 }} />,
      label: (
        <span style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          How It Works
        </span>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    navigate("/" + e.key);
    onClose();
  };

  const onClose = () => {
    dispatch(setIsToggled(false));
  };

  const updateHeight = () => {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth <= 768) {
      dispatch(setIsToggled(false));
    }
  };

  React.useEffect(() => {
    // Get initial height
    updateHeight();

    // Add resize event listener
    window.addEventListener("resize", updateHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const Navbar = () => (
    <>
      <Flex style={{ marginLeft: 20, marginTop: -10, marginBottom: 20 }}>
        <Typography.Title
          level={3}
          style={{
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "white" }}>Money</span>
          <span style={{ color: "#00C65E" }}>Bot</span>
        </Typography.Title>
      </Flex>
      {/* <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ borderRight: 0, backgroundColor: "#004e42" }}
        items={items}
        onClick={handleMenuClick}
      /> */}
    </>
  );

  return (
    <>
      <Sider
        breakpoint="md"
        theme="light"
        collapsedWidth="0"
        collapsed={isToggled}
        className="hideOnMobile"
        width={230}
        style={{ backgroundColor: "#004e42" }}
      >
        <Navbar />
      </Sider>
      {innerWidth <= 768 ? (
        <Drawer
          placement="left"
          onClose={onClose}
          closable={false}
          open={isToggled}
          width={250}
          styles={{
            body: {
              paddingTop: 20,
              padding: 0,
              backgroundColor: "#004e42",
            },
          }}
          className="hideOnDesktop"
        >
          <Navbar />
        </Drawer>
      ) : null}
    </>
  );
};

export default AppSider;
