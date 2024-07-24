import React, { useState, useEffect, useMemo } from 'react';
import { Container, Paper, Typography, Avatar, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { DecryptData } from '../../helper/EncryptDecrypt';
import axios from 'axios';
import { REACT_APP_BASE_URL } from '../../config/App.config';
import { showToast } from '../../helper/Toast';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSub, getSubDetails } from '../../services/slices/SubscriptionSlice';
import ConfModal from '../../util/ConfModal';

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
    minHeight: '480px',
    width: 400,
    textAlign: 'center',
});

const ProfileAvatar = styled(Avatar)({
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
});

type ProfilePageProps = {
    _TOKEN: string;
}

const Profile = ({ _TOKEN }: ProfilePageProps): JSX.Element => {
    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');
    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);
    const { subs_details_data } = useSelector((state: any) => state.subscriptionSlice);
    const dispatch: Dispatch<any> = useDispatch();

    const [isModalOpen, setModalOpen] = useState(false);

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
            showToast({
                message: error?.response?.data?.message,
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        };
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmCancel = () => {
        dispatch(cancelSub(header));
        setModalOpen(false);
    };

    useEffect(() => {
        if (_USER_DATA?.subscription?.customerId) {
            dispatch(getSubDetails(header));
        }
    }, [dispatch, header, _USER_DATA?.subscription?.customerId]);

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
                    {_USER_DATA?.is_subscribed ?
                        <Box sx={{ marginTop: "25px" }}>
                            <Typography variant="h4" color="textSecondary">
                                Plan Details
                            </Typography>
                            <Typography variant="subtitle1">
                                Package Name: {subs_details_data?.product?.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                Amount: ${subs_details_data?.subscription?.plan?.amount / 100} USD/month
                            </Typography>
                            <Typography variant="subtitle1">
                                Start Date: {new Date(subs_details_data?.subscription?.start_date * 1000).toLocaleDateString()}
                            </Typography>
                            <Typography variant="subtitle1">
                                End Date: {new Date(subs_details_data?.subscription?.current_period_end * 1000).toLocaleDateString()}
                            </Typography>
                        </Box>
                        : <Typography variant="h4" color="textSecondary" sx={{ marginTop: 10 }}>
                            No Plan Activated
                        </Typography>
                    }
                    {_USER_DATA?.is_subscribed &&
                        <div style={{ marginTop: '2rem' }}>
                            <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={handleViewPlan}>
                                View Plan
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleOpenModal}>
                                Cancel Plan
                            </Button>
                        </div>
                    }
                </ProfilePaper>
            </ProfileContainer>

            {/* Confirmation Modal */}
            <ConfModal
                modalId="confirm-cancel-modal"
                modalHeading="Confirm Cancellation"
                modalContent="Are you sure you want to cancel your subscription?"
                onDelete={handleConfirmCancel}
                open={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Profile;