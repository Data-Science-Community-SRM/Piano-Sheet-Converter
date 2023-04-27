import React from 'react';
import './assets/CSS/output.css';
import './assets/CSS/input.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing/Landing';
import Footer from './components/Footer';
import Modal from './components/UI/Modal';
import Form from './components/Landing/Form';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App bg">
      <Navbar />
      <Landing />
      <Footer />
      {ReactDOM.createPortal(<Modal children={<Form />} />, document.getElementById("modal"),)}
    </div>
  );
}

export default App;
