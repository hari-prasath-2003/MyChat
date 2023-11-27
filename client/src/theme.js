import { createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          "&::placeholder": {
            opacity: 1, // Set the desired opacity value here
          },
        },
      },
    },
  },
});

export default theme;
