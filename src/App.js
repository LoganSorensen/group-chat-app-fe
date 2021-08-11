import { Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/chat">
        <Sidebar />
        <Route exact path="/chat/:channelId" component={ChatWindow} />
        <Route exact path="/chat">
          <div className="join-channel-msg">
            Join a channel to start chatting!
          </div>
        </Route>
        <AddChannelForm />
      </Route>
    </div>
  );
}

export default App;
