import { Button, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { styled, darken } from '@mui/system';
import { loadStripe } from '@stripe/stripe-js';
import { REACT_APP_BASE_URL, REACT_APP_PUBLISHABLE_KEY } from '../../../config/App.config';
import { CustomHeadersType, SubscriptionPlanData } from '../../../config/DataTypes';
import { DecryptData, EncryptData } from '../../../helper/EncryptDecrypt';
import { useEffect, useState } from 'react';
import { showToast } from '../../../helper/Toast';
import axios from 'axios';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { getSubsPlans } from '../../../services/slices/SubscriptionSlice';

interface PlanProps {
    plan: SubscriptionPlanData;
    header: CustomHeadersType;
};

const PlanButton = styled(Button)(({ theme }) => {
    const backgroundColor = '#0074D4';
    const hoverColor = darken(backgroundColor, 0.2);

    return {
        padding: '10px 30px',
        textTransform: 'uppercase',
        fontWeight: 500,
        backgroundColor,
        color: '#fff',
        '&:hover': {
            backgroundColor: hoverColor,
        },
    };
});

const ActiveDiv = styled("div")(({ theme }) => {
    const backgroundColor = '#1bd764';

    return {
        padding: '10px 30px',
        textTransform: 'uppercase',
        fontWeight: 500,
        backgroundColor,
        borderRadius: 4,
        color: '#fff',
        width: "100%",
        height: "100%"
    };
});


const PlanCard = ({ plan, header }: PlanProps): JSX.Element => {
    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');

    const user: string | null = window.localStorage.getItem("user");
    const _USER_DATA = DecryptData(user ?? 'null');
    const [isActive, setIsActive] = useState<boolean>(_USER_DATA?.subscription?.planId === plan?.stripe_price_id);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(_USER_DATA?.is_subscribed);

    const dispatch: Dispatch<any> = useDispatch();

    // handlePayment
    const handlePayment = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) {
                throw new Error("Stripe could not be loaded.");
            }

            const body = {
                product: plan,
            };

            const headers = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${_TOKEN}`
            };

            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/create-checkout-session`, body, { headers });

            const session = response.data;
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result?.error) {
                console.error("Redirect to checkout error:", result.error);
            }
        } catch (error: any) {
            console.error("Error in payment integration:", error);
            showToast({
                message: error?.response?.data?.message,
                type: 'error',
                durationTime: 4000,
                position: 'top-center',
            });
        }
    };

    // handleUpgrade
    const handleUpgrade = async () => {
        try {
            const stripe = await loadStripe(REACT_APP_PUBLISHABLE_KEY);
            if (!stripe) throw new Error("Stripe could not be loaded.");

            const body = { product: plan };
            const headers = { "Content-Type": "application/json", "authorization": `Bearer ${_TOKEN}` };

            const response = await axios.post(`${REACT_APP_BASE_URL}/user/api/v1/update-subscription`, body, { headers });
            const result = response.data;

            if (result.success) {
                showToast({
                    message: "Subscription updated successfully!",
                    type: 'success',
                    durationTime: 4000,
                    position: 'top-center'
                });
                const user = EncryptData(result?.data);
                const token = EncryptData(result?.token);

                window.localStorage.setItem("token", token);
                window.localStorage.setItem("user", user);

                dispatch(getSubsPlans(header));
            } else {
                showToast({
                    message: result.message || "Unexpected response from server.",
                    type: 'error',
                    durationTime: 4000,
                    position: 'top-center'

                });
            }
        } catch (error: any) {
            console.error("Error in upgrade integration:", error);
            showToast({
                message: error?.response?.data?.message || error.message,
                type: 'error',
                durationTime: 4000,
                position: 'top-center'
            });
        }
    };

    useEffect(() => {
        setIsActive(_USER_DATA?.subscription?.planId === plan?.stripe_price_id);
        setIsSubscribed(_USER_DATA?.is_subscribed);
    }, [_USER_DATA?.subscription?.planId, plan?.stripe_price_id, _USER_DATA?.is_subscribed]);

    return (
        <>
            <Card sx={{
                minHeight: '100px',
                backgroundColor: isActive ? '#ccf6dc' : '#fff',
                boxShadow: isActive ? '0px 5px 20px rgba(0, 0, 0, 0.2)' : '0px 3px 15px rgba(0, 0, 0, 0.1)',
            }}>
                <CardHeader
                    sx={{ backgroundColor: isActive ? '#1bd764' : '#0074D4', color: '#fff', textAlign: 'center' }}
                    title={<Typography variant="h6" component="h2">{plan?.name}</Typography>}
                />
                <CardContent>
                    <ul style={{ listStyleType: 'none', padding: '20px', margin: '2px', minHeight: '260px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan?.user_count}</span> user
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan?.chat_inference}</span> Chat inference
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan?.image_generation}</span> Image generation
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan?.youtube_video_summarization}</span> Youtube Video Summarization
                            </Typography>
                        </li>
                        {plan?.financial_data_insight_for_stocks && (
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">Financial data insight for stocks</Typography>
                            </li>
                        )}
                        {plan?.news_aggregator_per_day > 0 && (
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">{plan?.news_aggregator_per_day} News aggregator per day</Typography>
                            </li>
                        )}
                    </ul>
                    <div style={{ borderTop: '1px solid #eee', margin: '0 auto 30px auto', width: '80%', textAlign: 'center' }}>
                        <Typography variant="h3" component="div" sx={{ fontSize: '82px', lineHeight: 1, color: '#413b3b' }}>
                            <span style={{ fontSize: '38px', margin: '6px 0 0 -7px', display: 'inline-block' }}>
                                {plan?.name !== 'Custom' ? "$" : "$ Custom Price"}
                            </span>
                            {plan?.name !== 'Custom' ? plan?.amount : null}
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ color: '#aaa', fontSize: '14px' }}>Per month</Typography>
                    </div>
                    {
                        isActive ?
                            <ActiveDiv sx={{ display: 'flex', justifyContent: 'center' }}>Subscribed</ActiveDiv>
                            : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PlanButton variant="contained" onClick={isSubscribed ? handleUpgrade : handlePayment}>
                                    {isSubscribed ? 'Update' : 'Subscribe'}
                                </PlanButton>
                            </Box>
                    }
                </CardContent>
            </Card>
        </>
    );
};

export default PlanCard;