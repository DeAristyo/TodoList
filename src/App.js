import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoPage from "./Pages/todoPages";
import Navbar from "./components/myNavBar"

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <TodoPage />
      </div>
    );
  }
}
export default App;