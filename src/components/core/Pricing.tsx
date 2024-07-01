import React from 'react';
import { Grid, Container } from '@mui/material';
import PlanCard from './PlanCard';

const plans = [
    {
        name: 'Essentials',
        users: 1,
        chatInference: 'Unlimited',
        imageGeneration: 'Up to 10',
        videoSummarization: 'Unlimited',
        price: 5,
    },
    {
        name: 'Pro',
        users: 1,
        chatInference: 'Unlimited',
        imageGeneration: 'Up to 30',
        videoSummarization: 'Unlimited',
        financialData: true,
        newsAggregator: '5-website per day',
        price: 20,
    },
    {
        name: 'Advanced',
        users: 1,
        chatInference: 'Unlimited',
        imageGeneration: 'Up to 130',
        videoSummarization: 'Unlimited',
        financialData: true,
        newsAggregator: '5-website per day',
        price: 50,
    },
    {
        name: 'Custom',
        contactEmail: 'admin@blocksml.com',
    },
];

const Pricing: React.FC = () => {
    return (
        <Container
            maxWidth={false}
            sx={{ px: 5, py: 5, mx: 'auto' }}
        >
            <Grid container spacing={3}>
                {plans.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <PlanCard plan={plan} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Pricing;