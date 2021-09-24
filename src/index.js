import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CurrentUserProvider} from "./contexts/CurrentUserContext";

ReactDOM.render(

    <>
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>
  </>,

  document.getElementById("root")
);
