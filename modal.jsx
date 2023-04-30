import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

export function CreatePlaylist(props) {
  const userSelector = useSelector((state) => state.auth);

  const [imgUrl, setImgUrl] = useState(
    require("../assets/default-spotify.png")
  );

  function inputHandler(event) {
    const id = event.target.id;
    const value = event.target.value;
    const tempObj = { ...props.details };
    tempObj[id] = value;
    props.setDetails(tempObj);
    console.log(tempObj);
  }

  async function save() {
    const { imgURL, playlist, desc, createBy, list } = props.details;
    await axios.post("http://localhost:2000/playlist", props.details);
  }

  function input(e) {
    if (!e.target.value) {
      setImgUrl(require("../assets/album1.jpeg"));
      return;
    }
    setImgUrl(e.target.value);
  }

  return (
    <>
      <Flex
        bgColor={"#282828"}
        color={"white"}
        maxW={"524px"}
        // maxH={'389px'}
        w={"700px"}
        h="100%"
        borderRadius={"5px"}
        flexDir={"column"}
        pb="20px"
      >
        <Flex
          justifyContent={"space-between"}
          w="100%"
          fontSize="24px"
          padding={"24px"}
        >
          <Flex fontWeight={"bold"}>Playlist details</Flex>
          <Flex alignItems={"end"}>
            <Icon
              as={IoMdClose}
              color="#87878"
              cursor={"pointer"}
              onClick={() => props.onClose()}
            ></Icon>
          </Flex>
        </Flex>
        <Flex padding={"0px 24px 24px 24px"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} gap="10px">
            <Image
              w={"180px"}
              h="180px"
              src={imgUrl}
              boxShadow={"0px 0px 20px black"}
            ></Image>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="180px"
              h="40px"
              placeholder="Image URL"
              onChange={(e) => {
                input(e);
                inputHandler(e);
              }}
              id="imgURL"
            ></Input>
          </Flex>
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              h="40px"
              placeholder="Title"
              id="playlist"
              onChange={inputHandler}
            ></Input>
            <Textarea
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              maxH="75%"
              h={"100%"}
              resize={"none"}
              placeholder="Description"
              id="desc"
              onChange={inputHandler}
            ></Textarea>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <Flex paddingX={"24px"} fontWeight={"bold"}>
            Add Musics
          </Flex>
          <ListMusics
            listLagu={props.listLagu}
            getData={props.getData}
            details={props.details}
          />
        </Flex>

        <Center w="100%">
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"#1ED760"}
            h="48px"
            w="90%"
            cursor={"pointer"}
            onClick={() => {
              save();
              props.fetchSide();
              props.onClose();
            }}
          >
            SAVE
          </Center>
        </Center>
      </Flex>
    </>
  );
}

export function ListMusics(props) {
  const [pages, setPages] = useState(1);

  return (
    <>
      <Flex flexDir={"column"} paddingBottom="10px" gap={"10px"} W="100%">
        <Grid
          templateColumns="1fr 2fr 1fr"
          columnGap={5}
          maxH={"550px"}
          overflow={"hidden"}
          W="100%"
        >
          <GridItem w="100%" h="25px"></GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Title
          </GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Artist
          </GridItem>

          {props?.listLagu?.map((val) => (
            <>
              <GridItem w="100%" h="25px" fontWeight={"bold"}>
                <Center onClick={() => props.details.list.push(val)}>
                  Add
                </Center>
              </GridItem>
              <GridItem w="100%" h="25px" overflow={"hidden"}>
                {val.title}
              </GridItem>
              <GridItem w="100%" h="25px" overflow={"hidden"}>
                {val.singer}
              </GridItem>
            </>
          ))}
        </Grid>

        <Flex gap={"20px"} w="100%" justifyContent={"center"}>
          <Flex
            cursor={"pointer"}
            onClick={async () => {
              const p = await props.getData(pages - 1);
              // alert(p);
              setPages(p);
            }}
          >
            Prev
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={async () => {
              const p = await props.getData(pages + 1);
              // alert(p);
              setPages(p);
            }}
          >
            Next
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
