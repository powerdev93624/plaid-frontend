import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  
  // Layout
  import AppLayout from "@/layout";
  
  // Pages
  import ChatPage from "@/pages/Chat";
  import LandingPage from "@/pages/Landing";
  
  const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
              <LandingPage />
            }
          />
          <Route
            path="/chat"
            element={
              <AppLayout>
                <ChatPage />
              </AppLayout>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;