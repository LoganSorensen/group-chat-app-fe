import { Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./components/profilePage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/chat" component={Sidebar} />
      <PrivateRoute path="/chat" component={AddChannelForm} />
      <Route exact path="/chat">
        <div className="join-channel-msg">
          Join a channel to start chatting!
        </div>
      </Route>
      <PrivateRoute exact path="/chat/:channelId" component={ChatWindow} />
      <PrivateRoute path="/profile" component={ProfilePage} />
    </div>
  );
}

export default App;
