import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ShowSearchListProvider } from "./contexts/ShowSearchListContext";
import { AllUsersProvider } from "./contexts/AllUsersContext";

ReactDOM.render(
  <>
    <AuthProvider>
      <CurrentUserProvider>
        <AllUsersProvider>
          <ShowSearchListProvider>
            <App />
          </ShowSearchListProvider>
        </AllUsersProvider>
      </CurrentUserProvider>
    </AuthProvider>
  </>,

  document.getElementById("root")
);
