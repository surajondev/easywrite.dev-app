import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Grid,
  Center,
  Button,
  Input,
  InputGroup,
  FormControl,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { supabase } from "@/lib/supabase";
import { checkIntegration, platformIntegrate } from "@/services/api";

const Platform = () => {
  const [session, setSession] = useState<any>();
  const [checkData, setCheckData] = useState<any>(null);
  const [devtoChange, setDevtoChange] = useState<boolean>(false);
  const [hashnodeChange, setHashnodeChange] = useState<boolean>(false);
  const [updateDevto, setUpdateDevto] = useState(false)
  const [updateHashnode, setUpdateHashnode] = useState(false)

  const handleSubmit = async (values: any) => {
    if (session) {
      if(!updateDevto && !updateHashnode){
        const response = await platformIntegrate(
          session?.user.id,
          values?.devto,
          values?.hashnode
        );
        console.log("runningTrue");
      }
      if(updateDevto){
        console.log("runnning")
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      devto: "",
      hashnode: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    handlecheckIntegration();
  },[]);

  const handlecheckIntegration = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);
    
    if(session){
      console.log("running")   
      const response = await checkIntegration(session?.user.id)
      setCheckData(response.resData)
      console.log(response)
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box bg="white" borderRadius="10px" p="18px 25px">
          <Center flexDir="column" gap="1em">
            <Avatar
              name={PlatfromData.devto.name}
              src={PlatfromData.devto.image}
            />
            <Text variant="secondary-text">{PlatfromData.devto.name}</Text>
            {checkData !==null && (devtoChange || !checkData.devto) && <FormControl>
              <FormLabel textAlign="center">API Key</FormLabel>
              <InputGroup>
                <Input
                  id="devto"
                  name="devto"
                  type="text"
                  variant="form-input"
                  placeholder="Enter API Keys"
                  onChange={formik.handleChange}
                  value={formik.values.devto}
                />
              </InputGroup>
            </FormControl>}
            {
              checkData && !devtoChange && checkData.devto ?
              <Stack flexDir="row" gap={3}>
              <Button disabled variant="secondary-button" backgroundColor="gray.300">
              Connected
            </Button>
              <Button variant="primary-button" onClick={() => setDevtoChange(true)}>
              Change
            </Button>
            </Stack>
            :
            <Button type="submit" variant="primary-button" onClick={() => setUpdateDevto(true)}>
              Update
            </Button>
            }
          </Center>
        </Box>
        <Box bg="white" borderRadius="10px" p="18px 25px">
          <Center flexDir="column" gap="1em">
            <Avatar
              name={PlatfromData.hashnode.name}
              src={PlatfromData.hashnode.image}
            />
            <Text variant="secondary-text">{PlatfromData.hashnode.name}</Text>
            {checkData !==null && (hashnodeChange || !checkData.hahsnode) && <FormControl>
              <FormLabel textAlign="center">API Key</FormLabel>
              <InputGroup>
                <Input
                  id="hashnode"
                  name="hashnode"
                  type="text"
                  variant="form-input"
                  placeholder="Enter API keys"
                  onChange={formik.handleChange}
                  value={formik.values.hashnode}
                />
              </InputGroup>
            
            </FormControl>}
            {
              checkData && !hashnodeChange && checkData.devto ?
              <Stack flexDir="row" gap={3}>
              <Button disabled variant="secondary-button" backgroundColor="gray.300">
              Connected
            </Button>
              <Button variant="primary-button" onClick={() => setHashnodeChange(true)}>
              Change
            </Button>
            </Stack>
            :
            <Button type="submit" variant="primary-button">
              Connect
            </Button>
            }
          </Center>
        </Box>
      </Grid>
    </form>
  );
};

const PlatfromData = {
  devto: {
    name: "dev.to",
    image: "https://d2fltix0v2e0sb.cloudfront.net/dev-black.png",
  },
  hashnode: {
    name: "Hashnode",
    image:
      "https://play-lh.googleusercontent.com/NhWlAT4TbjIjirMZfl77W2B8Y1P0gpSNTui6aQYUXJNMhbe8OrUhnfjtccRF3eNFkRo",
  },
};

export default Platform;
