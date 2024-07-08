import { Routes, Route } from 'react-router-dom';
import Pricing from '../pages/Pricing';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';


const AllRoutes = (): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Pricing />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/success' element={<Success />} />
                <Route path='/cancel' element={<Cancel />} />
            </Routes>
        </>
    );
};

export default AllRoutes;