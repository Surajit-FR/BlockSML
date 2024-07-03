import Navbar from './components/common/Navbar';
import Pricing from './components/core/Pricing';
import Footer from './components/common/Footer';

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Pricing />
      <Footer />
    </>
  );
};

export default App;