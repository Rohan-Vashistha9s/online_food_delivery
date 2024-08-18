import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import ScrollToTop from "./components/ScrollToTop";
import LoginSidebar from "./components/Sidebar/LoginSidebar";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <LoginSidebar />
      <ScrollToTop />
    </>
  );
};

export default App;
