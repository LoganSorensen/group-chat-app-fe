import Sidebar from "./components/sidebar";
import ChatWindow from "./components/chatWindow";
import AddChannelForm from "./components/addChannelForm";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ChatWindow />
      <AddChannelForm />
    </div>
  );
}

export default App;
