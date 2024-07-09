import { Grid, Container } from '@mui/material';
import PlanCard from '../components/core/pricing/PlanCard';

const plans = [
    {
        _id: "01",
        name: 'Essentials',
        users: 1,
        chatInference: 'Unlimited',
        imageGeneration: 'Up to 10',
        videoSummarization: 'Unlimited',
        price: 5,
    },
    {
        _id: "02",
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
        _id: "03",
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
        _id: "04",
        name: 'Custom',
        contactEmail: 'admin@blocksml.com',
    },
];

const Pricing = (): JSX.Element => {
    return (
        <Container
            maxWidth={false}
            sx={{ px: 5, py: 5, mx: 'auto' }}
        >
            <Grid container spacing={3}>
                {
                    plans?.map((plan, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <PlanCard plan={plan} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    );
};

export default Pricing;