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
  Select,
  Radio,
  RadioGroup,
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
import { TbAlertCircleFilled } from "react-icons/tb";
import * as Yup from "yup";
import { useFormik } from "formik"; //untuk validation
import YupPassword from "yup-password";
import axios from "axios";

export default function RegisterPage() {
  YupPassword(Yup);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      email2: "",
      password: "",
      name: "",
      day: "",
      month: "",
      year: "",
      gender: "Male",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("you need to enter your email.")
        .email(
          "This email is invalid. Make sure it's written like example@email"
        ),

      email2: Yup.string()
        .required("You need to confirm your email")
        .oneOf([Yup.ref("email"), null], "the email addresses don't match"),
      password: Yup.string()
        .min(8, "Your password is too short")
        .minUppercase(1, "Minimal 1 uppercase, 1 number and, 1 symbol")
        .minNumbers(1, "Minimal 1 uppercase, 1 number and, 1 symbol")
        .minSymbols(1, "Minimal 1 uppercase, 1 number and, 1 symbol"),
      name: Yup.string().required("enter a name for your profile"),
      day: Yup.number("Enter a valid day of the month")
        .moreThan(0, "Enter a valid day of the month")
        .lessThan(32, "Enter a valid day of the month")
        .required("Enter a valid Day"),

      month: Yup.string().required("Select ur birth month"),
      year: Yup.number()
        .required("Enter a valid year")
        .moreThan(0, "Doraemon is a Fairytail only dude")
        .lessThan(2024, "Doraemon is a Fairytail only dude"),
    }),
    onSubmit: async () => {
      const { email, name, password, year, month, day, gender } = formik.values;
      const account = { email, name, password, gender };
      account.birthdate = new Date(year, month, day);

      const checkEmail = await axios
        .get("http://localhost:2000/user", {
          params: { email: account.email },
        })
        .then((res) => {
          if (res.data.length) {
            return true;
          } else {
            return false;
          }
        });
      if (checkEmail) {
        return alert("email already used");
      } else {
        await axios.post("http://localhost:2000/user", account).then((res) => {
          nav("/login");
        });
      }
    },
  });

  // onSubmit(() => {
  //   console.log(formik.values);
  // });
  //   const user = { ...formik.values };
  //   user.birthdate = new Date(user.year, user.month, user.day);
  //   console.log(user);
  // }),
  // useEffect(() => {
  //   const kue = JSON.parse(localStorage.getItem("user"));
  //   if (kue?.email && kue?.password ? nav("/") : nav("/login"));
  // }, []);

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }
  const [seePassword, setSeePassword] = useState(false);

  // function login() {
  //   if (account.email && account.password) {
  //     dispatch({
  //       type: auth_types.login,
  //       payload: account,
  //     });

  //     localStorage.setItem("user", JSON.stringify(account));

  //     return nav("/");
  //   }
  //   alert("wajib isi email & password");
  // }

  const month = [
    {
      name: "January",
      number: 1,
    },
    {
      name: "February",
      number: 2,
    },
    {
      name: "March",
      number: 3,
    },
    {
      name: "April",
      number: 4,
    },
    {
      name: "May",
      number: 5,
    },
    {
      name: "June",
      number: 6,
    },
    {
      name: "July",
      number: 7,
    },
    {
      name: "August",
      number: 8,
    },
    {
      name: "September",
      number: 9,
    },
    {
      name: "October",
      number: 10,
    },
    {
      name: "November",
      number: 11,
    },
    {
      name: "December",
      number: 12,
    },
  ];

  return (
    <>
      <Favicon url="https://w7.pngwing.com/pngs/548/814/png-transparent-spotify-logo-graphic-design-music-lp-records-logo-monochrome-music-download.png" />
      <Center flexDir={"column"} w={"100vw"}>
        <Center
          flexDir={"column"}
          width={"100%"}
          maxW={"450px"}
          color={"whiteAlpha.800"}
          gap={"10px"}
          height={"100px"}
          paddingX={"24px"}
        >
          <Image src={logo} w={"130px"} h={"40px"} />
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
          <Center fontWeight={"600"} fontSize={"14px"} color={"black"}>
            {" "}
            <a style={{ width: "100%" }} href="/sidebar">
              <Center
                w={"100%"}
                h={"48px"}
                fontWeight={"700"}
                fontSize={"24px"}
              >
                <Center>Sign up for free to start listening.</Center>
              </Center>
            </a>
          </Center>

          <Center
            w={"100%"}
            maxW={"312px"}
            bgColor={"facebook.600"}
            h={"48px"}
            fontWeight={"700"}
            borderRadius={"25px"}
            gap={"10px"}
            border={"1px solid #A5A5A5"}
            cursor={"pointer"}
          >
            <Icon w={"20px"} h={"20px"} as={BsFacebook}></Icon>
            <Center>Sign Up with Facebook</Center>
          </Center>

          <Center
            w={"100%"}
            maxW={"312px"}
            bgColor="white"
            h={"48px"}
            fontWeight={"700"}
            borderRadius={"25px"}
            gap={"10px"}
            color={"#535353"}
            border={"3px solid #535353"}
            cursor={"pointer"}
          >
            <Icon w={"20px"} h={"20px"} as={FcGoogle}></Icon>
            <Center>Sign up with Google</Center>
          </Center>

          <Center
            w={"100%"}
            maxW={"312px"}
            h={"48px"}
            color={"#7F7F7F"}
            gap={"12px"}
            fontWeight={"500"}
          >
            <Center w={"100%"}>
              <Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
            </Center>
            or
            <Center w={"100%"}>
              <Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
            </Center>
          </Center>

          <Flex w={"100%"} gap={"20px"} flexDir={"column"} color={"black"}>
            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>What's your email?</Box>
              <Input
                // onChange={(e) => formik.setFieldValue("email", e.target.value)}
                id="email"
                paddingLeft={"12px"}
                className="emailAddress"
                placeholder="Enter your Email.  "
                h={"40px"}
                borderRadius={"3px"}
                cursor={"text"}
                onChange={inputHandler}
              ></Input>

              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.email ? "flex" : "none"} //hilagin TbAlertCircleFilled by default
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.email}
                {/* You need to enter your email. */}
              </Flex>

              <Box color={"#117A37"} textDecor={"underline"}>
                Use phone number instead
              </Box>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>Confirm your email?</Box>
              <Input
                onChange={inputHandler}
                id="email2"
                paddingLeft={"12px"}
                className="emailAddress"
                placeholder="Enter your Email again  "
                h={"40px"}
                borderRadius={"3px"}
                cursor={"text"}
              ></Input>

              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.email2 ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.email2}
              </Flex>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>Create Password</Box>
              <InputGroup size="md">
                <Input
                  onChange={inputHandler}
                  id="password"
                  type={seePassword ? "text" : "password"}
                  paddingLeft={"12px"}
                  className="password"
                  placeholder="Crate a Password."
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
              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.password ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.password}
              </Flex>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>What should we call you?</Box>
              <Input
                onChange={inputHandler}
                id="name"
                paddingLeft={"12px"}
                className="emailAddress"
                placeholder="Enter a profile name "
                h={"40px"}
                borderRadius={"3px"}
                cursor={"text"}
              ></Input>
              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.name ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.name}
              </Flex>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>What's your date of birth?</Box>

              <Flex justifyContent={"space-between"} gap={"10px"}>
                <Input
                  maxW={"88px"}
                  onChange={inputHandler}
                  placeholder="DD "
                  w="100%"
                  id="day"
                ></Input>

                {/* <Input
                  onChange={inputHandler}
                  placeholder="Enter a profile name"
                  id="profile"
                ></Input> */}
                <Select placeholder="month" id="month" onChange={inputHandler}>
                  {month.map((val) => (
                    <option value={val.number}>{val.name}</option>
                  ))}
                </Select>
                <Input
                  onChange={inputHandler}
                  placeholder="YYYY"
                  w="100%"
                  maxW={"88px"}
                  id="year"
                ></Input>
              </Flex>
              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.day ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.day}
              </Flex>
              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.month ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.month}
              </Flex>
              <Flex
                color={"red"}
                gap={"5px"}
                display={formik.errors.year ? "flex" : "none"}
              >
                <Icon as={TbAlertCircleFilled} w="16px" h="16px"></Icon>
                {formik.errors.year}
              </Flex>
            </Flex>

            <Flex flexDir={"column"} gap={"5px"}>
              <Box fontWeight={"700"}>What's your gender?</Box>

              <RadioGroup defaultValue="Male" id="gender">
                <Flex
                  w={"100%"}
                  flexWrap={"wrap"}
                  rowGap={"10px"}
                  columnGap={"20px"}
                >
                  <Radio colorScheme="green" value="Male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" value="Female">
                    Female
                  </Radio>
                  <Radio colorScheme="green" value="Non-binary">
                    Non-binary
                  </Radio>
                  <Radio colorScheme="green" value="Other">
                    Other
                  </Radio>
                  <Radio colorScheme="green" value="Prefer not to say">
                    Prefer not to say
                  </Radio>
                </Flex>
              </RadioGroup>
            </Flex>

            <Flex fontSize={"14px"} alignItems={"flex-start"}>
              <Checkbox h={"100%"}></Checkbox>
              <Box paddingX={"12px"} h={"100%"}>
                I would prefer not to receive marketing messages from Spotify
              </Box>
            </Flex>

            <Flex py={"10px"} fontSize={"14px"} alignItems={"flex-start"}>
              <Checkbox h={"100%"}></Checkbox>
              <Box paddingX={"12px"} h={"100%"}>
                Share my registration data with Spotify's content providers for
                marketing purposes.
              </Box>
            </Flex>
            <Center flexDir={"column"} gap={"11px"}>
              <Center fontSize={"11px"} gap={"10px"}>
                By clicking on sign-up, you agree to Spotify's{" "}
                <Flex color={"green"} textDecor={"underline"}>
                  Terms and Conditions of Use.
                </Flex>
              </Center>

              <Center fontSize={"11px"} gap={"10px"}>
                By clicking on sign-up, you agree to the{" "}
                <Flex color={"green"} textDecor={"underline"}>
                  Spotify Privacy Policy.
                </Flex>
              </Center>
            </Center>

            <Flex flexDir={"column"} gap={"5px"}></Flex>
            <Flex
              paddingBottom={"24px"}
              //   justifyContent={"space-between"}
            >
              {/* <Box h={"50px"} w={"200px"}></Box> */}
              {/* <Box> */}
              <Center w="100%">
                <Link to={"/login"}>
                  <Button
                    h={"50px"}
                    w={"130px"}
                    borderRadius={"100px"}
                    onClick={formik.handleSubmit}
                    colorScheme="whatsapp"
                    color={"black"}
                    cursor={"pointer"}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Center>
              {/* </Box> */}
            </Flex>

            <Center w={"100%"} paddingBottom={"10%"}>
              <Flex
                justifyContent={"center"}
                textAlign={"center"}
                fontSize={"14px"}
                fontWeight={"700"}
                gap={"10px"}
              >
                Have an account?
                <Link to={"/login"}>
                  <Flex color={"green"} textDecor={"underline"}>
                    Log in
                  </Flex>
                </Link>
              </Flex>
            </Center>
          </Flex>
        </Center>
      </Center>
    </>
  );
}
