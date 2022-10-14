import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <SignUp /> */}
      <SignIn />
      <Footer />
    </div>
  );
}

export default App;
