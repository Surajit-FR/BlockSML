import { Container, Paper, Typography, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { DecryptData } from '../../helper/EncryptDecrypt';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '../../config/App.config';
import { showToast } from '../../helper/Toast';

const ProfileContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
});

const ProfilePaper = styled(Paper)({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 400,
    width: 400,
});

const ProfileAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
});

type profilePage_props = {
    _TOKEN: string;
}

const Profile = ({ _TOKEN }: profilePage_props): JSX.Element => {
    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');


    const handleViewPlan = async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${_TOKEN}`
        };
        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/billing-portal`, {
                headers: headers,
            });
            window.location.href = response?.data?.data?.url;
        } catch (error: any) {
            console.error('Error opening billing portal:', error);
            showToast({
                message: error?.response?.data?.message,
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        };
    };

    return (
        <>
            <ProfileContainer>
                <ProfilePaper>
                    <ProfileAvatar alt="User Avatar" src="/path/to/avatar.jpg" />
                    <Typography variant="h5" component="h1">
                        {_USER_DATA?.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {_USER_DATA?.email}
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: '5rem' }} onClick={handleViewPlan}>
                        View My Plan
                    </Button>
                </ProfilePaper>
            </ProfileContainer>
        </>
    );
};

export default Profile;