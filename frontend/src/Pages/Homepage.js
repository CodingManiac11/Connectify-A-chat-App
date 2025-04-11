import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Text } from "@chakra-ui/layout";

const Homepage = () => {
  const { user } = ChatState();
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) history.push("/");
  }, [history]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
      <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
        Connectify
      </Text>
    </div>
  );
};

export default Homepage;
