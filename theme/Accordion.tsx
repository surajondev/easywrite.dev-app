import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const accordionLight = definePartsStyle({
  container: {
    background: "white",
    border: "none",
    _hover: {
      background: "white",
    },
  },
});

const variants = {
  "light-accordion": accordionLight,
};

export const Accordion = defineMultiStyleConfig({ variants });
