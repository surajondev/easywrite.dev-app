import React, { useState } from "react";
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
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";

const Platform = () => {
  const formik = useFormik({
    initialValues: {
      devto: "",
      hashnode: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box bg="white" borderRadius="10px" p="18px 25px">
          <Center flexDir="column" gap="1em">
            <Avatar name={PlatfromData.devto.name} src={PlatfromData.devto.image} />
            <Text variant="secondary-text">{PlatfromData.devto.name}</Text>
            <FormControl>
                <FormLabel textAlign="center">API Key</FormLabel>
              <InputGroup>
                <Input
                  id="devto"
                  name="devto"
                  type="text"
                  variant="form-input"
                  placeholder="Generate topic ideas"
                  onChange={formik.handleChange}
                  value={formik.values.devto}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" variant="primary-button">
              Connect
            </Button>
          </Center>
        </Box>
        <Box bg="white" borderRadius="10px" p="18px 25px">
          <Center flexDir="column" gap="1em">
            <Avatar name={PlatfromData.hashnode.name} src={PlatfromData.hashnode.image} />
            <Text variant="secondary-text">{PlatfromData.hashnode.name}</Text>
            <FormControl>
                <FormLabel textAlign="center">API Key</FormLabel>
              <InputGroup>
                <Input
                  id="hashnode"
                  name="hashnode"
                  type="text"
                  variant="form-input"
                  placeholder="Generate topic ideas"
                  onChange={formik.handleChange}
                  value={formik.values.hashnode}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" variant="primary-button">
              Connect
            </Button>
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
