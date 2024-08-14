import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {
  const [searchItem, setSearchItem] = useState("");

  return (
    <div className="container" style={{ backgroundColor: 'rgb(213,213,213)', color: 'white' }}>
      <Header searchItem={searchItem} setSearchItem={setSearchItem} />
      <Dashboard searchItem={searchItem} />
    </div>
  )
};

export default App;