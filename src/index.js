import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ShowSearchListProvider } from "./contexts/ShowSearchListContext";
import { AllUsersProvider } from "./contexts/AllUsersContext";
import { AllRoomsArrayProvider } from "./contexts/AllRoomsArrayContext";
import { ChatSettingsModalProvider } from "./contexts/ChatSettingsModalContext";
import { MemberSearchProvider } from "./contexts/MemberSearchModalContext";

ReactDOM.render(
  <>
    <AuthProvider>
      <CurrentUserProvider>
        <AllUsersProvider>
          <ShowSearchListProvider>
            <AllRoomsArrayProvider>
              <ChatSettingsModalProvider>
                <MemberSearchProvider>
                  <App />
                </MemberSearchProvider>
              </ChatSettingsModalProvider>
            </AllRoomsArrayProvider>
          </ShowSearchListProvider>
        </AllUsersProvider>
      </CurrentUserProvider>
    </AuthProvider>
  </>,

  document.getElementById("root")
);
