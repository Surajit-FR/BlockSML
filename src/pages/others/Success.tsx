import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled, darken } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentSuccess } from "../../services/slices/SubscriptionSlice";
import { DecryptData } from "../../helper/EncryptDecrypt";
import { useEffect, useMemo } from "react";
import { getUserDetails } from "../../services/slices/AuthSlice";

const PlanButton = styled(Button)(({ theme }) => {
    const backgroundColor = '#00b200';
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

const Success = (): JSX.Element => {
    const { user_data } = useSelector((state: any) => state.authSlice);
    const _sessionID = user_data?.subscription?.sessionId;

    const token: string | null = window.localStorage.getItem("token");
    const _TOKEN = DecryptData(token ?? 'null');
    const header = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${_TOKEN}`
        }
    }), [_TOKEN]);


    const dispatch: Dispatch<any> = useDispatch();
    const navigate: any = useNavigate();

    // handleProceed func.
    const handleProceed = () => {
        dispatch(paymentSuccess({ _sessionID, header, navigate }));
    }

    useEffect(() => {
        dispatch(getUserDetails(header));
    }, [dispatch, header]);


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <Card sx={{
                width: 500,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: "#e7ffd5",
            }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#00b200', mb: 2 }} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Payment Successfull
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <PlanButton size="medium" color="primary" onClick={handleProceed}>
                        Proceed
                    </PlanButton>
                </CardActions>
            </Card>
        </Box>
    );
};

export default Success;