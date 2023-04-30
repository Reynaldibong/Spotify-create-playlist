import Sidebar from "../components/Sidebar";
import Playbar from "../components/Rey PL";
import Navbar from "../components/Rey NV";
import "../components/main.css";
import Ccontent from "../components/main";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function HomePage(props) {
  let nav = useNavigate();
  let userSelector = useSelector((state) => state.auth);
  // useEffect(() => {
  //masuk sini pada saat load page
  // const user = JSON.parse(localStorage.getItem("user"));
  // if (!user?.email) {
  //   return nav("/login");
  // }

  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);
  // // }, []);

  const [playlist, setPlaylist] = useState([]);
  const [home_playlist, setHome_playlist] = useState([]);
  const [home2_playlist, setHome2_playlist] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);

  async function fetchData() {
    await axios
      .get("http://localhost:2000/musics")
      .then((res) => setPlaylist(res.data));
    await axios
      .get("http://localhost:2000/playlist", { params: { type: "playlist1" } })
      .then((res) => setHome_playlist(res.data));
    await axios
      .get("http://localhost:2000/playlist", {
        params: { type: "playlist2" },
      })
      .then((res) => setHome2_playlist(res.data));
    // alert(userSelector.email);
    await axios
      .get("http://localhost:2000/playlist", {
        params: {
          createBy: userSelector.email,
        },
      })
      .then((res) => setMyPlaylist(res.data));

    setLoading(false);
  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Center w={"100vw"} h={"100vh"}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        <>
          <Sidebar
            setPlaylist={setPlaylist}
            data={home_playlist}
            data2={home2_playlist}
            setMyPlaylist={setMyPlaylist}
            myPlaylist={myPlaylist}
          />
          {/* <Navbar /> */}
          {/* <Ccontent /> */}
          <Playbar playlist={playlist} />
        </>
      )}
    </>
  );
}
