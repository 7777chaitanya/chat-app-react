import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ShowSearchListProvider } from "./contexts/ShowSearchListContext";
import { AllUsersProvider } from "./contexts/AllUsersContext";
import { AllRoomsArrayProvider } from "./contexts/AllRoomsArrayContext";

ReactDOM.render(
  <>
    <AuthProvider>
      <CurrentUserProvider>
        <AllUsersProvider>
          <ShowSearchListProvider>
            <AllRoomsArrayProvider>
            <App />
            </AllRoomsArrayProvider>
          </ShowSearchListProvider>
        </AllUsersProvider>
      </CurrentUserProvider>
    </AuthProvider>
  </>,

  document.getElementById("root")
);
