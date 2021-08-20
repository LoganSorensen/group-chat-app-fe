import { Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/profilePage";

function App() {
  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.add("sidebar--open");
  };
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/chat" component={Sidebar} />
      <PrivateRoute path="/chat" component={AddChannelForm} />
      <Route exact path="/chat">
        <div className="no-channel-page">
          <div className="channel-name-tab top-tab">
            <button className="open-sidebar-btn" onClick={openSidebar}>
              <span className="material-icons-outlined">menu</span>
            </button>
            <span className="channels-span">Channels</span>
          </div>
          <div className="join-channel-msg">
            Join a channel to start chatting!
          </div>
        </div>
      </Route>
      <PrivateRoute exact path="/chat/:channelId" component={ChatWindow} />
      <PrivateRoute path="/profile" component={ProfilePage} />
    </div>
  );
}

export default App;
