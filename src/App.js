import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages";
import { Navbar } from "./containers";
import { UserContextProvider } from "./contexts/user";

function App() {
  return (
    <UserContextProvider>
      <div className="app">
        <Home />
      </div>
    </UserContextProvider>
  );
}

export default App;
