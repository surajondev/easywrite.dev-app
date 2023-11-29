import { extendTheme } from "@chakra-ui/react";
import { Button } from "./Button";
import { Text } from "./Text";
import { Heading } from "./Heading";
import { Box } from "./Box";
import { Tabs } from "./Tabs";
import { Input } from "./Input";
import { Colors } from "./Colors";
import { Accordion } from "./Accordion";
import { Textarea } from "./Textarea";

const theme = extendTheme({
  colors: Colors,
  components: {
    Button: Button,
    Text: Text,
    Heading: Heading,
    Box: Box,
    Tabs: Tabs,
    Input: Input,
    Accordion: Accordion,
    Textarea: Textarea
  },
});

export default theme;
