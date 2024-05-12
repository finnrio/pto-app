// include this line for mocking react-native-gesture-handler
import "react-native-gesture-handler/jestSetup";

const { resolve } = require("path");

require("dotenv").config({
  path: resolve(__dirname, ".env.test"),
});
