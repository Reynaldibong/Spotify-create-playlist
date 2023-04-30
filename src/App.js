import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPages";
import HomePage from "./pages/homepage";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const [loading, setLoading] = useState(true);

  async function load() {
    const prom = new Promise((resolve) => {
      setTimeout(() => {
        resolve(setLoading(false));
      }, 1000);
    });
    await prom;
  }

  useEffect(() => {
    load();
  }, [loading]);
  return (
    <>
      {loading ? (
        <Center w={"100vw"} h={"100vh"}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <Routes>
          {routes.map((val) => val)}
          {/* <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />}></Route> */}
        </Routes>
      )}
    </>
  );
}

export default App;
