import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Pricing from '../pages/others/Pricing';
import Success from '../pages/others/Success';
import { DecryptData } from '../helper/EncryptDecrypt';
import { useMemo } from 'react';
import Cancel from '../pages/others/Cancel';


const AllRoutes = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');
    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/pricing' element={<Pricing header={header} />} />
                <Route path='/success' element={<Success />} />
                <Route path='/cancel' element={<Cancel />} />
            </Routes>
        </>
    );
};

export default AllRoutes;