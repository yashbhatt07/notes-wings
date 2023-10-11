import { Fragment, useEffect } from "react";
import { BoardList } from "./Pages/Board/BoardList/BoardList.js";
import { Public } from "./Pages/Routes/Public.js";
import { useNavigate } from "react-router-dom";
import Protected from "./Pages/Routes/Protected.js";
import Header from "./Components/Header/Header.js";

const App = () => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("auth");
  const currentPath = window.location.pathname;
  const pathsToHideHeader = ["/signup", "/login", "/"];

  const shouldHideHeader = pathsToHideHeader.includes(currentPath);

  useEffect(() => {
    if (!auth) {
      navigate("/login");

      loginRoute();
    }
  }, [auth]);

  const loginRoute = () => {
    localStorage.clear();
    return <Public />;
  };

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Fragment>{auth ? <Protected /> : loginRoute()}</Fragment>
    </>
  );
};

export default App;
