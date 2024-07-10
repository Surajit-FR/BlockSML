import { Button, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { darken } from '@mui/system';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { REACT_APP_BASE_URL, REACT_APP_PUBLISHABLE_KEY } from '../../../config/App.config';
import { SubscriptionPlanData } from '../../../config/DataTypes';

interface PlanProps {
    plan: SubscriptionPlanData;
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


const PlanCard = ({ plan }: PlanProps): JSX.Element => {

    // Payment integration
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
                "Content-Type": "application/json"
            };

            const resp = await fetch(`${REACT_APP_BASE_URL}/user/api/create-checkout-session`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            });

            if (!resp.ok) {
                throw new Error("Failed to create checkout session.");
            }

            const session = await resp.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result?.error) {
                console.error("Redirect to checkout error:", result.error);
            }
        } catch (error) {
            console.error("Error in payment integration:", error);
        }
    };

    return (
        <>
            <Card sx={{ minHeight: '100px', backgroundColor: '#fff', borderRadius: 1, boxShadow: 10 }}>
                <CardHeader
                    sx={{ backgroundColor: '#0074D4', color: '#fff', textAlign: 'center' }}
                    title={<Typography variant="h6" component="h2">{plan?.subscription?.name}</Typography>}
                />
                <CardContent>
                    {plan?.subscription?.name !== 'Custom' ? (
                        <ul style={{ listStyleType: 'none', padding: '20px', margin: '2px', minHeight: '260px' }}>
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">
                                    <span style={{ fontWeight: "800" }}>{plan?.user}</span> user
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
                    ) : (
                        <ul style={{ listStyleType: 'none', padding: '20px', margin: '2px', minHeight: '260px' }}>
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">
                                    For Custom or business usage or for API
                                </Typography>
                            </li>
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">
                                    Please contact us at{' '}
                                    <Link to={`mailto:admin@blocksml.com`} style={{ color: '#0074D4' }}>
                                        admin@blocksml.com
                                    </Link>
                                </Typography>
                            </li>
                        </ul>
                    )}
                    <div style={{ borderTop: '1px solid #eee', margin: '0 auto 30px auto', width: '80%', textAlign: 'center' }}>
                        <Typography variant="h3" component="div" sx={{ fontSize: '82px', lineHeight: 1, color: '#413b3b' }}>
                            <span style={{ fontSize: '38px', margin: '6px 0 0 -7px', display: 'inline-block' }}>
                                {plan?.subscription?.name !== 'Custom' ? "$" : "$ Custom Price"}
                            </span>
                            {plan?.subscription?.name !== 'Custom' ? plan?.subscription?.amount : null}
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ color: '#aaa', fontSize: '14px' }}>Per month</Typography>
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {plan?.subscription?.name !== 'Custom' ? (
                            <PlanButton variant="contained" onClick={handlePayment}>Subscribe</PlanButton>
                        ) : (
                            <PlanButton variant="contained">Contact Us</PlanButton>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default PlanCard;