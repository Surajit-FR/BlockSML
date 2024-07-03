import { Button, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { darken } from '@mui/system';
import { Link } from 'react-router-dom';

interface PlanProps {
    plan: {
        name: string;
        users?: number;
        chatInference?: string;
        imageGeneration?: string;
        videoSummarization?: string;
        price?: number;
        financialData?: boolean;
        newsAggregator?: string;
        contactEmail?: string;
    };
}

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
    return (
        <Card sx={{ minHeight: '100px', backgroundColor: '#fff', borderRadius: 1, boxShadow: 10 }}>
            <CardHeader
                sx={{ backgroundColor: '#0074D4', color: '#fff', textAlign: 'center' }}
                title={<Typography variant="h6" component="h2">{plan.name}</Typography>}
            />
            <CardContent>
                {plan.name !== 'Custom' ? (
                    <ul style={{ listStyleType: 'none', padding: '20px', margin: '2px', minHeight: '260px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan.users}</span> user
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan.chatInference}</span> Chat inference
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan.imageGeneration}</span> Image generation
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                <span style={{ fontWeight: "800" }}>{plan.videoSummarization}</span> Youtube Video Summarization
                            </Typography>
                        </li>
                        {plan.financialData && (
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">Financial data insight for stocks</Typography>
                            </li>
                        )}
                        {plan.newsAggregator && (
                            <li style={{ marginBottom: '10px' }}>
                                <Typography variant="body1">{plan.newsAggregator} News aggregator per day</Typography>
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
                                <Link to={`mailto:${plan.contactEmail}`} style={{ color: '#0074D4' }}>
                                    {plan.contactEmail}
                                </Link>
                            </Typography>
                        </li>
                    </ul>
                )}
                <div style={{ borderTop: '1px solid #eee', margin: '0 auto 30px auto', width: '80%', textAlign: 'center' }}>
                    <Typography variant="h3" component="div" sx={{ fontSize: '82px', lineHeight: 1, color: '#413b3b' }}>
                        <span style={{ fontSize: '38px', margin: '6px 0 0 -7px', display: 'inline-block' }}>
                            {plan.price ? "$" : "$ Custom Price"}
                        </span>
                        {plan.price}
                    </Typography>
                    <Typography variant="h6" component="h4" sx={{ color: '#aaa', fontSize: '14px' }}>Per month</Typography>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {plan.name !== 'Custom' ? (
                        <PlanButton variant="contained">Subscribe</PlanButton>
                    ) : (
                        <PlanButton variant="contained">Contact Us</PlanButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default PlanCard;