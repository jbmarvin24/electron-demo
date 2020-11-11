import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#dc004e",
    },
    error: {
      main: "#e53935",
    },
    success: {
      main: "#43a047",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
