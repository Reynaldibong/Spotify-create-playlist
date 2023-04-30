import {
  Box,
  Flex,
  Image,
  Icon,
  Center,
  Input,
  Checkbox,
  Button,
  ButtonGroup,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/spotify-logo2.png";
import { BsApple, BsFacebook, BsGift, BsGoogle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Favicon from "react-favicon";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import axios from "axios";
import { userLogin } from "../redux/middlewares/userauth";
// import { tb } from 'react-icons/tb';

export default function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const kue = JSON.parse(localStorage.getItem("user"));
  //   if (kue?.email && kue?.password ? nav("/") : nav("/login"));
  // }, []);

  function inputHandler(event) {
    const { value, id } = event.target;
    const tempAccount = { ...account };
    tempAccount[id] = value;
    setAccount(tempAccount);
  }
  const [seePassword, setSeePassword] = useState(false);
  const toast = useToast();
  //   //karena request butuh waktu dari api, maka func diubah jadi async

  //   await axios
  //     .get("http://localhost:2000/user", {
  //       params: {
  //         email: account.email.toLowerCase(),
  //         passsword: account.password,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.length) {
  //         dispatch({
  //           type: auth_types.login,
  //           payload: res.data[0],
  //         });
  //         localStorage.setItem("user", JSON.stringify(res.data[0]));

  //         return nav("/");
  //       } else {
  //         alert("email/password salah");
  //       }
  // });
  async function login() {
    toast.closeAll();
    const status = await dispatch(userLogin(account));
    if (status) {
      toast({
        title: "You are human",
        description: "Welcome mang!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      return nav("/");
    }
    return toast({
      title: "Who are you?!",
      description: "Goddamn it!",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  }
  return (
    // console.log();

    // if (account.email && account.password) {
    //   dispatch({
    //     type: auth_types.login,
    //     payload: account,
    //   });

    //   localStorage.setItem("user", JSON.stringify(account));

    //   return nav("/");

    //   alert("wajib isi email & password");
    // }

    <>
      <Favicon url="https://w7.pngwing.com/pngs/548/814/png-transparent-spotify-logo-graphic-design-music-lp-records-logo-monochrome-music-download.png" />
      <Center flexDir={"column"} w={"100vw"} gap={"40px"}>
        <Center
          width={"100%"}
          paddingTop={"15px"}
          pb={"12px"}
          borderBottom={"1px solid #D9DaDC"}
          color={"whiteAlpha.800"}
          gap={"20px"}
        >
          <Image src={logo} w={"143px"} h={"44px"} />
        </Center>

        <Center
          w={"100%"}
          maxW={"450px"}
          fontSize={"13px"}
          color={"RGBA(255, 255, 255, 0.92)"}
          flexDir={"column"}
          gap="10px"
          paddingX={"10px"}
        >
          <Center
            fontWeight={"600"}
            fontSize={"14px"}
            paddingTop={"40px"}
            color={"black"}
          >
            {" "}
            To continue, log in to Spotify
          </Center>
          <a style={{ width: "100%" }} href="/sidebar">
            <Center
              w={"100%"}
              bgColor={"#1877F2"}
              h={"48px"}
              fontWeight={"700"}
              borderRadius={"25px"}
              gap={"10px"}
              border={"1px solid #A5A5A5"}
              cursor={"pointer"}
            >
              <Icon w={"20px"} h={"20px"} as={BsFacebook}></Icon>
              <Center>CONTINUE WITH FACEBOOK</Center>
            </Center>
          </a>
          <Center
            w={"100%"}
            bgColor={"black "}
            h={"48px"}
            fontWeight={"700"}
            borderRadius={"25px"}
            gap={"10px"}
            border={"1px solid #A5A5A5"}
            cursor={"pointer"}
          >
            <Icon w={"20px"} h={"20px"} as={BsApple}></Icon>
            <Center>CONTINUE WITH APPLE</Center>
          </Center>

          <Center
            w={"100%"}
            h={"48px"}
            fontWeight={"700"}
            borderRadius={"25px"}
            gap={"10px"}
            color={"rgba(0,0,0,0.5)"}
            border={"1px solid #A5A5A5"}
            bgColor={"white"}
            cursor={"pointer"}
          >
            <Icon w={"20px"} h={"20px"} as={FcGoogle}></Icon>
            <Center>CONTINUE WITH GOOGLE</Center>
          </Center>

          <Center
            w={"100%"}
            h={"48px"}
            fontWeight={"700"}
            borderRadius={"25px"}
            gap={"10px"}
            color={"rgba(0,0,0,0.5)"}
            border={"1px solid #A5A5A5"}
            bgColor={"white"}
            cursor={"pointer"}
          >
            <Center>CONTINUE WITH PHONE NUMBER</Center>
          </Center>

          <Center
            w={"100%"}
            h={"48px"}
            color={"black"}
            gap={"12px"}
            fontWeight={"700"}
          >
            <Center w={"100%"}>
              <Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
            </Center>
            OR
            <Center w={"100%"}>
              <Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
            </Center>
          </Center>

          <Flex
            w={"100%"}
            pt={"20px"}
            gap={"20px"}
            flexDir={"column"}
            color={"black"}
          >
            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>Email address or username</Box>
              <Input
                onChange={inputHandler}
                id="email"
                paddingLeft={"12px"}
                className="emailAddress"
                placeholder="Email address or username"
                h={"40px"}
                borderRadius={"3px"}
                cursor={"text"}
              ></Input>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>Password</Box>

              <InputGroup size="md">
                <Input
                  onChange={inputHandler}
                  id="password"
                  type={seePassword ? "text" : "password"}
                  paddingLeft={"12px"}
                  className="password"
                  placeholder="Password"
                  h={"40px"}
                  borderRadius={"3px"}
                  cursor={"text"}
                ></Input>
                <InputRightElement w={"3.5rem"}>
                  <Icon
                    as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    color={"#A5A5A5"}
                    w={"24px"}
                    h={"24px"}
                    cursor={"pointer"}
                    onClick={() => setSeePassword(!seePassword)}
                  ></Icon>
                </InputRightElement>
              </InputGroup>

              {account.password.length < 8 ? (
                <Box color={"red"}>Password minimal 8</Box>
              ) : null}
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <a href="/forgotpassword">
                <Box
                  cursor={"pointer"}
                  textDecoration={"underline"}
                  fontWeight={"700"}
                  fontSize={"15px"}
                >
                  Forgot your password?
                </Box>
              </a>
            </Flex>
            <Flex
              paddingBottom={"24px"}
              borderBottom={"1px grey solid"}
              justifyContent={"space-between"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Checkbox colorScheme="green" />
                <Box paddingLeft={"10px"} fontWeight={"400"}>
                  Remember me
                </Box>
              </Box>
              {/* <Box h={"50px"} w={"200px"}></Box> */}
              <Box>
                <Button
                  h={"50px"}
                  w={"130px"}
                  borderRadius={"100px"}
                  colorScheme="whatsapp"
                  color={"black"}
                  cursor={"pointer"}
                  onClick={login}
                >
                  LOG IN
                </Button>
              </Box>
            </Flex>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"18px"}
              paddingBottom={"15px"}
              fontWeight={"700"}
            >
              {" "}
              Don't have an account?
            </Flex>
            <Center>
              <Flex pb={"10%"}>
                <Link to={"/register"}>
                  <Button
                    w={"100%"}
                    borderRadius={"20px"}
                    colorScheme="whiteAlpha"
                    color={"grey"}
                    variant={"outline"}
                    fontWeight={"550"}
                  >
                    {" "}
                    SIGN UP FOR SPOTIFY
                  </Button>
                </Link>
              </Flex>
            </Center>
          </Flex>
        </Center>
      </Center>
    </>
  );
}
