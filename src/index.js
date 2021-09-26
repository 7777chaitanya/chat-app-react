import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <>
    <AuthProvider>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </AuthProvider>
  </>,

  document.getElementById("root")
);
