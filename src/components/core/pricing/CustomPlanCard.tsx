import { Button, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { styled, darken } from '@mui/system';
import { Link } from 'react-router-dom';

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

const CustomPlanCard = (): JSX.Element => {
    return (
        <>
            <Card sx={{
                minHeight: '100px',
                backgroundColor: '#fff',
                boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
            }}>
                <CardHeader
                    sx={{ backgroundColor: '#0074D4', color: '#fff', textAlign: 'center' }}
                    title={<Typography variant="h6" component="h2">Custom Plan</Typography>}
                />
                <CardContent>
                    <ul style={{ listStyleType: 'none', padding: '20px', margin: '2px', minHeight: '260px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                For Custom or business usage or for API
                            </Typography>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Typography variant="body1">
                                Please contact us at{' '}
                                <Link to={`mailto: admin@blocksml.com`} style={{ color: '#0074D4' }}>
                                    admin@blocksml.com
                                </Link>
                            </Typography>
                        </li>
                    </ul>
                    <div style={{ borderTop: '1px solid #eee', margin: '0 auto 30px auto', width: '80%', textAlign: 'center' }}>
                        <Typography variant="h3" component="div" sx={{ fontSize: '82px', lineHeight: 1, color: '#413b3b' }}>
                            <span style={{ fontSize: '38px', margin: '6px 0 0 -7px', display: 'inline-block' }}>
                                $ Custom Price
                            </span>
                        </Typography>
                        <Typography variant="h6" component="h4" sx={{ color: '#aaa', fontSize: '14px' }}>Per month</Typography>
                    </div>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PlanButton variant="contained">Contact Us</PlanButton>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default CustomPlanCard;