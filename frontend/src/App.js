import { Route, Switch } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <Switch>
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </Switch>
  );
}

export default App;
