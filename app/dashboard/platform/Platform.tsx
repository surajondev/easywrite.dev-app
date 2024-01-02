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
import { Formik } from "formik";
import { supabase } from "@/lib/supabase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import {
  checkIntegration,
  platformIntegrateDevto,
  platformIntegrateHashnode,
  updateDevto,
  updateHashnode,
  updateHashnodePublication
} from "@/services/api";

const Platform = () => {
  const [session, setSession] = useState<any>();
  const [checkData, setCheckData] = useState<any>({
    devto: false,
    hashnode: false,
  });
  const [devtoChange, setDevtoChange] = useState<boolean>(false);
  const [hashnodeChange, setHashnodeChange] = useState<boolean>(false);
  const [hashnodePublication, setHashnodePublication] =
    useState<boolean>(false);
  const [devtoOrganization, setDevtoOrganization] = useState<boolean>(false);
  const [HashnodeArray, setHashnodeArray] = useState<any>([0]);


  const handleSubmitDevto = async (values: any) => {
    console.log("running1");
    if (session) {
      console.log("running2");
      const response = await platformIntegrateDevto(
        session?.user.id,
        values?.devto
      );
      handlecheckIntegration();
    }
  };

  const handleSubmitHashnode = async (values: any) => {
    console.log("running1");
    if (session) {
      console.log("running2");
      const response = await platformIntegrateHashnode(
        session?.user.id,
        values?.hashnode
      );
      handlecheckIntegration();
    }
  };

  const handleUpdateHashnode = (key: string) => {
    console.log("sessionh", session?.user.id);
    const response = updateHashnode(session?.user.id, key);
    console.log(response);
  };

  const handleUpdateHashnodePublication = (values:any) => {
    console.log("sessionh", session?.user.id);
    const response = updateHashnodePublication(session?.user.id, values.label, values.value);
    console.log(response);
  };

  const handleUpdateDevto = (key: string) => {
    console.log("sessionh", session?.user.id);
    const response = updateDevto(session?.user.id, key);
    console.log(response);
  };

  const handlecheckIntegration = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      console.log("running");
      const response = await checkIntegration(session?.user.id);
      setCheckData(response.data);
      console.log(response);
    }
  };

  useEffect(() => {
    handlecheckIntegration();
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Formik
        initialValues={{
          devto: "",
          hashnode: "",
        }}
        onSubmit={(values) => console.log(values)}
        // validationSchema={LoginSchema}
      >
        {({ values, handleChange }) => (
          <Box bg="white" borderRadius="10px" p="18px 25px">
            <Center flexDir="column" gap="1em">
              <Avatar
                name={PlatfromData.devto.name}
                src={PlatfromData.devto.image}
              />
              <Text variant="secondary-text">{PlatfromData.devto.name}</Text>
              {checkData !== null && (devtoChange || !checkData.devto) && (
                <FormControl>
                  <FormLabel textAlign="center">API Key</FormLabel>
                  <InputGroup>
                    <Input
                      id="devto"
                      name="devto"
                      type="text"
                      variant="form-input"
                      placeholder="Enter API Keys"
                      onChange={handleChange}
                      value={values.devto}
                    />
                  </InputGroup>
                </FormControl>
              )}
              {!devtoChange && checkData.devto && (
                <Stack flexDir="row" gap={3}>
                  <Button
                    disabled
                    variant="secondary-button"
                    backgroundColor="gray.300"
                  >
                    Connected
                  </Button>
                  <Button
                    variant="primary-button"
                    onClick={() => setDevtoChange(true)}
                  >
                    Change
                  </Button>
                </Stack>
              )}
              {(!checkData.devto || devtoChange) &&
                (!checkData.devto ? (
                  <Button
                    variant="primary-button"
                    onClick={() => handleSubmitDevto(values)}
                  >
                    Connect
                  </Button>
                ) : (
                  <Button
                    variant="primary-button"
                    onClick={() => handleUpdateDevto(values.devto)}
                  >
                    Connect
                  </Button>
                ))}
            </Center>
          </Box>
        )}
      </Formik>
      <Formik
        initialValues={{
          devto: "",
          hashnode: "",
          label: [],
          value:[],
        }}
        onSubmit={(values) => console.log(values)}
        // validationSchema={LoginSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Box bg="white" borderRadius="10px" p="18px 25px">
            <Center flexDir="column" gap="1em">
              <Avatar
                name={PlatfromData.hashnode.name}
                src={PlatfromData.hashnode.image}
              />
              <Text variant="secondary-text">{PlatfromData.hashnode.name}</Text>
              {(!checkData.hashnode || hashnodeChange) && (
                <FormControl>
                  <FormLabel textAlign="center">API Key</FormLabel>
                  <InputGroup>
                    <Input
                      id="hashnode"
                      name="hashnode"
                      type="text"
                      variant="form-input"
                      placeholder="Enter API keys"
                      onChange={handleChange}
                      value={values.hashnode}
                    />
                  </InputGroup>
                </FormControl>
              )}
              {hashnodePublication && (
                <Box>
                  <TableContainer>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Label</Th>
                          <Th>Publication ID</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          HashnodeArray.map((item:any, index:any) => {
                            console.log(item)
                            return(
                              <Tr>
                          <Td>
                            <FormControl>
                              <InputGroup>
                                <Input
                                  id="label"
                                  name="label"
                                  type="text"
                                  variant="form-input"
                                  placeholder="Personal"
                                  onChange={(e) => {
                                    const newArray  = [...values.label];
                                    //@ts-ignore
                                    newArray[index] = e.target.value;
                                    setFieldValue("label", newArray);
                                  }}
                                  value={values.label[index]}
                                />
                              </InputGroup>
                            </FormControl>
                          </Td>
                          <Td><FormControl>
                              <InputGroup>
                                <Input
                                  id="value"
                                  name="value"
                                  type="text"
                                  variant="form-input"
                                  placeholder="asd6f5asd65fasd9fa"
                                  onChange={(e) => {
                                    const newArray  = [...values.value];
                                    //@ts-ignore
                                    newArray[index] = e.target.value;
                                    setFieldValue("value", newArray);
                                  }}
                                  value={values.value[index]}
                                />
                              </InputGroup>
                            </FormControl>
                            </Td>
                          <Td>
                            <Button variant="secondary-button" backgroundColor="gray.300" onClick={() => {
                              const newArray = HashnodeArray.filter((item:any, i:any) => i !== index);
                              setHashnodeArray(newArray)

                              const arrayLable  = [...values.label];
                              const arrayValue  = [...values.value];

                              const newArrayLabel = arrayLable.filter((item:any, i:any) => i !== index);
                              const newArrayValue = arrayValue.filter((item:any, i:any) => i !== index);
                              setFieldValue("label", newArrayLabel);
                              setFieldValue("value", newArrayValue);
                            }}>
                              X
                            </Button>
                            </Td>
                        </Tr>
                            )
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Center>
                  <Stack flexDir="row" gap={3}>
                  <Button
                    disabled
                    variant="secondary-button"
                    backgroundColor="gray.300"
                    onClick={() => {
                      const newArray = [...HashnodeArray, "a"];
                      setHashnodeArray(newArray)
                    }}
                  >
                    Add More Publication
                  </Button>
                  <Button
                    variant="primary-button"
                    onClick={() => handleUpdateHashnodePublication(values)}
                  >
                    Update
                  </Button>
                </Stack>
                </Center>
                </Box>
              )}
              {!hashnodeChange && checkData.hashnode && !hashnodePublication && (
                <Stack flexDir="row" gap={3}>
                  <Button
                    disabled
                    variant="secondary-button"
                    backgroundColor="gray.300"
                    onClick={() => setHashnodePublication(true)}
                  >
                    Add Publication
                  </Button>
                  <Button
                    variant="primary-button"
                    onClick={() => setHashnodeChange(true)}
                  >
                    Change
                  </Button>
                </Stack>
              )}
              {(!checkData.hashnode || hashnodeChange) &&
                (!checkData.hashnode ? (
                  <Button
                    variant="primary-button"
                    onClick={() => handleSubmitHashnode(values)}
                  >
                    Connect
                  </Button>
                ) : (
                  <Button
                    variant="primary-button"
                    onClick={() => handleUpdateHashnode(values.hashnode)}
                  >
                    Connect
                  </Button>
                ))}
            </Center>
          </Box>
        )}
      </Formik>
    </Grid>
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
