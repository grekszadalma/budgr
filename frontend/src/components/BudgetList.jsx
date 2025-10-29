import AddModal from "./AddModal.jsx";
import wishlistData from "../data/wishlist_categories.json";
import {Box, Grid, Paper, styled, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import { useDispatch } from 'react-redux';
import { setSelectedItem, clearSelectedItem } from "../features/selectedItemSlice";
import { useNavigate } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

async function fetchBudgets() {
    const res = await fetch('http://localhost:8080/api/budgets/me/with-spent', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch budgets');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "#1a90ff",
    },
}));

export default function BudgetList() {


    const { data: budgets = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['budgets'],
            queryFn: fetchBudgets,
            retry: 2,
            staleTime: 1000 * 60,
        });




    if (isLoading) return <div>Loading budget...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {budgets.map((budget) => {
                    const spentPercent = budget.amount > 0
                        ? Math.min((budget.spentAmount / budget.amount) * 100, 100)
                        : 0;

                    return (
                        <Grid item xs={12} sm={6} md={3} key={budget.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    height: 180,
                                    width:210,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    {budget.name}
                                </Typography>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Spent: €{budget.spentAmount.toFixed(2)} / €{budget.amount.toFixed(2)}
                                    </Typography>
                                    <BorderLinearProgress variant="determinate" value={spentPercent} sx={{ mt: 1 }} />

                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}