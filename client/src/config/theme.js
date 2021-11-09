import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#17213D",
  secondary: "#CCD2E3",
};

const styles = {
  global: (props) => ({
    body: {
      bg: "#17213D",
    },
  }),
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors });
export default theme;
