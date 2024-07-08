import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AllRoutes from './routes/AllRoutes';

const App = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;