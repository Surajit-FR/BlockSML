import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../../services/slices/AuthSlice';
import { showToast } from '../../helper/Toast';
import { Dispatch } from 'redux';
import { DecryptData } from '../../helper/EncryptDecrypt';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tools', label: 'Tools' },
    { to: '/downloads', label: 'Download Plugins' },
    { to: '/resource', label: 'Resource' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about-us', label: 'About Us' },
    { to: '/contact-us', label: 'Contact Us' },
    { to: '/career', label: 'Career' },
];

const StyledAppBar = styled(AppBar)({
    boxShadow: '0px 2px 8px rgb(95 104 111)',
    backgroundColor: '#3373A0',
});

const StyledLink = styled(RouterLink)(({ theme }) => ({
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginRight: '20px',
    transition: '0.3s ease',
    padding: '5px',
    borderRadius: '4px',
    textDecoration: 'none',
    '&:hover': {
        color: '#3373A0',
        backgroundColor: '#fff',
    },
}));

const Logo = styled('img')({
    width: '100px',
});

const Navbar = (): JSX.Element => {
    const token: string | null = window.localStorage.getItem('token');
    const _TOKEN = DecryptData(token ?? 'null');

    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');

    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();

    // Logout function
    const userLogout = () => {
        dispatch(logoutUser(navigate));
    };

    useEffect(() => {
        if (_TOKEN) {
            const decodedJwt = jwtDecode(_TOKEN);
            const isExpired = decodedJwt?.exp ? decodedJwt.exp < Date.now() / 1000 : false;
            if (isExpired) {
                dispatch(logoutUser(navigate));
                showToast({
                    message: "Session Expired. You've been logged out. Please sign in again.",
                    type: 'error',
                    durationTime: 4000,
                    position: 'top-center',
                });
            }
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, _TOKEN]);


    return (
        <StyledAppBar position="static">
            <Toolbar>
                <RouterLink to="/">
                    <Logo src="https://blocksml.com/img/bdfs_logo.jpeg" alt="Logo" />
                </RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {navLinks.map((link, index) => (
                        <StyledLink key={index} to={link.to}>
                            {link.label}
                        </StyledLink>
                    ))}
                </Box>
                {_TOKEN ? (
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <StyledLink to="/profile" style={{ marginLeft: '10px' }}>
                            {_USER_DATA?.name}
                        </StyledLink>
                        <StyledLink
                            to="#"
                            onClick={userLogout}
                        >
                            Logout
                        </StyledLink>
                    </Box>
                ) : (
                    <StyledLink to="/login">
                        Login
                    </StyledLink>
                )}

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;