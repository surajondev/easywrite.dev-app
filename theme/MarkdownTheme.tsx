import { Text, Heading } from '@chakra-ui/react';

const newTheme = {
    p: (props:any) => {
      const { children } = props;
      return (
        <Text  variant={"secondary-text"} lineHeight={2}>
          {children}
        </Text>
      );
    },
    h1: (props:any) => {
      const { children } = props;
      return (
        <Text  variant={"secondary-text"} lineHeight={2}>
          {children}
        </Text>
      );
    },
    h2: (props:any) => {
      const { children } = props;
      return (
        <Heading  variant={"secondary-heading"} lineHeight={2}>
          {children}
        </Heading>
      );
    },
  };
  
  export default newTheme;