import { Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Route exact path='/:channelId' component={ChatWindow}/>
      {/* <ChatWindow /> */}
      <AddChannelForm />
    </div>
  );
}

export default App;
