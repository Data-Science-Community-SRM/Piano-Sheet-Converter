import './assets/CSS/output.css';
import './assets/CSS/input.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing/Landing';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg">
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
