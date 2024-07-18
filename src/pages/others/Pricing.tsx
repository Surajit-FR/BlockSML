import { Grid, Container } from '@mui/material';
import PlanCard from '../../components/core/pricing/PlanCard';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSubsPlans } from '../../services/slices/SubscriptionSlice';
import { CustomHeadersType, SubscriptionPlanData } from '../../config/DataTypes';

type picing_props = {
    header: CustomHeadersType
}

const Pricing = ({ header }: picing_props): JSX.Element => {
    const [plans, setPlans] = useState<Array<SubscriptionPlanData>>([])
    const dispatch: Dispatch<any> = useDispatch();
    const { subsPlan_data } = useSelector((state: any) => state.subscriptionSlice);

    useEffect(() => {
        dispatch(getSubsPlans(header));
    }, [dispatch, header]);

    useEffect(() => {
        setPlans(subsPlan_data);
    }, [subsPlan_data]);


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