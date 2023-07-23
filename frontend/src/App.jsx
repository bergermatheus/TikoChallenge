import './App.css';
import { BrowserRouter } from "react-router-dom";
import Content from './components/layout/Content';
import NavigationBar from './components/layout/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
