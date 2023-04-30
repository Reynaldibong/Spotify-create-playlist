//Playlist
import "../components/Rey PL.css";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Icon,
  Img,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { CgInpicture, CgPlayButtonO } from "react-icons/cg";
import { AiOutlineHeart, AiOutlineMinusCircle } from "react-icons/ai";
import {
  BiShuffle,
  BiSkipPrevious,
  BiSkipNext,
  BiRepeat,
  BiVolumeFull,
} from "react-icons/bi";
import { TbMicrophone2, TbDevices2, TbChevronsDownLeft } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { SlLoop } from "react-icons/sl";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Playbar2(props) {
  const [duration, setDuration] = useState(0);
  const [counter, setCounter] = useState(0);

  const [pause, setPause] = useState(true);

  const [audio, setAudio] = useState({});
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log(props.playlist);
  }, [props.playlist]);

  function changePlaylist() {
    setTimeout(() => setCurrentTime(audio?.currentTime), 500);

    if (audio.src) {
      setCounter(0);
      changeSong(0);
    } else {
      soundTrack();
    }
  }

  async function changeSong(track) {
    if (track > props.playlist.length - 1 || track < 0) {
      track = 0;
    }
    setCounter(track);
    audio.src = require("../assets/audio/" + props.playlist[track].src);

    return audio.play().finally(() => {
      setPause(false);
      updateTime();
    });
  }

  function play(status) {
    setPause(status);
    if (!status) {
      audio.play();
      setTimeout(() => {
        setCurrentTime(audio.currentTime);
      }, 1);
      return;
    }
    audio.pause();
  }

  useEffect(() => {
    changePlaylist();
  }, [props.playlist]);

  useEffect(() => {
    updateTime();
  }, [currentTime]);

  async function updateTime() {
    if (currentTime == audio.duration && audio.duration) {
      setCounter(counter + 1);
      return await changeSong(counter + 1);
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        if (!pause) {
          resolve(setCurrentTime(audio.currentTime));
        }
      }, 500);
    });
    return await promise;
  }

  function soundTrack() {
    const tempAudio = new Audio(
      require("../assets/audio/" + props.playlist[0].src)
      // music
    );
    tempAudio.addEventListener("loadedmetadata", function () {
      setDuration(tempAudio.duration);
      // console.log(tempAudio.duration);
    });
    setAudio(tempAudio);
  }

  return (
    <>
      <Flex className="playbar">
        <Flex className="penampung" width={"100vw"} height={"100px"}>
          <Flex className="title">
            <Flex width={"55.99px"} height={"55.99px"}>
              {" "}
              <img
                src={
                  props.playlist?.length ? props.playlist[counter]?.img : null
                }
                alt=""
              />
            </Flex>
            <Flex className="penampungtitle">
              {props.playlist?.length ? props.playlist[counter]?.title : null}
              <Box></Box>
              {/* <Box>{counter}</Box> */}

              {props.playlist?.length ? props.playlist[counter]?.singer : null}
              <Box color={"#bababa"}></Box>
            </Flex>
            <Icon className="icon" color={"#bababa"} as={AiOutlineHeart} />
            <Icon
              className="icon"
              color={"#bababa"}
              as={AiOutlineMinusCircle}
            />
            <Icon className="icon" color={"#bababa"} as={CgInpicture} />
          </Flex>

          <Flex className="play">
            <Center gap={"10px"}>
              <Icon as={BiShuffle} fontSize={"23px"} color={"#595959"} />
              <Icon
                fontSize={"35px"}
                as={BiSkipPrevious}
                color={"#bababa"}
                onClick={async () => {
                  setCounter(counter - 1);
                  await changeSong(counter - 1);
                }}
              />
              {/* INI PLAY BUTTON  */}
              <Icon
                as={audio.paused ? BsFillPlayCircleFill : BsFillPauseCircleFill}
                fontSize={"33px"}
                color={"white"}
                onClick={() => play(!pause)}
              />
              <Icon
                fontSize={"35px"}
                as={BiSkipNext}
                color={"#bababa"}
                onClick={async () => {
                  setCounter(counter + 1);
                  await changeSong(counter + 1);
                }}
              />
              <Icon as={SlLoop} color={"#bababa"} fontSize={"15px"} />
            </Center>

            <Box display={"flex"} flexDirection={"row"} gap={"10px"}>
              <Center fontSize={"13px"} color={"#bababa"} w={"40px"}>
                0{Math.floor(audio.currentTime / 60)} :{" "}
                {Math.floor(audio.currentTime % 60) > 9
                  ? Math.floor(audio.currentTime % 60)
                  : "0" + Math.floor(audio.currentTime % 60)}
              </Center>
              <Slider
                aria-label="slider-ex-1"
                colorScheme={"whiteAlpha"}
                width={"580px"}
                value={Math.round((audio?.currentTime * 100) / audio?.duration)}
                onChange={(val) => {
                  let changeDur = val / 100; //perssentase 1-100
                  if (audio.duration) {
                    changeDur *= audio.duration;
                  }
                  audio.currentTime = changeDur;
                  setCurrentTime(audio?.currentTime);
                }}
              >
                <SliderTrack bg={"#5e5e5e"}>
                  <SliderFilledTrack />
                </SliderTrack>
                {/* <SliderThumb /> */}
              </Slider>

              <Center fontSize={"13px"} color={"#bababa "} w="40px">
                {" "}
                0{Math.floor(duration / 60)} :{" "}
                {Math.floor(duration % 60) > 9
                  ? Math.floor(duration % 60)
                  : "0" + Math.floor(duration % 60)}
              </Center>
            </Box>
          </Flex>

          <Flex className="volume" color={"#bababa"} paddingRight={"30px"}>
            <Icon as={TbMicrophone2}></Icon>
            <Icon as={HiOutlineQueueList}></Icon>
            <Icon as={TbDevices2}></Icon>
            <Icon as={BiVolumeFull}></Icon>
            <Slider
              aria-label="slider-ex-1"
              colorScheme="whiteAlpha"
              width={"100px"}
              defaultValue={audio?.volume * 100}
              onChange={(vol) => (audio.volume = vol / 100)}
              // onChange={(vol) => (audio.volume = vol / 100)}
              // onChange={() => console.log(audio.volume)}
            >
              <SliderTrack bg={"#5e5e5e"}>
                <SliderFilledTrack />
              </SliderTrack>
              {/* <SliderThumb />  */}
            </Slider>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
