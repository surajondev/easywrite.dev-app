import React, { useEffect, useState } from "react";
import { Stack, Heading, Text } from "@chakra-ui/react";

const EmailUpdated = () => {
  return (
    <Stack
      spacing={10}
      width="100%"
      flexDir="column"
      alignItems="center"
      padding="4em 4em"
    >
      <Heading variant="secondary-heading">Update Password</Heading>
      <Text variant="primary-text" color="gray.400">
        You're email has been updated! You can now login with the new email.
      </Text>
    </Stack>
  );
};

export default EmailUpdated;
