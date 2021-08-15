import { Route } from "react-router-dom";

import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./components/PrivateRoute";
import EditUserProfile from "./components/editUserProfile";
import UserProfile from "./components/userProfile";

import ProfilePage from "./components/profilePage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/chat" component={Sidebar} />
      <PrivateRoute path="/chat" component={AddChannelForm} />
      <PrivateRoute exact path="/chat/:channelId" component={ChatWindow} />
      <PrivateRoute path="/profile" component={ProfilePage} />
      {/* <PrivateRoute
        exact
        path="/profile"
        component={UserProfile}
      ></PrivateRoute> */}
      {/* <PrivateRoute exact path="/profile/edit" component={EditUserProfile} /> */}

    </div>
  );
}

export default App;
