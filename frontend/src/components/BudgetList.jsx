import AddModal from "./AddModal.jsx";
import wishlistData from "../data/wishlist_categories.json";
import {Box, Grid, IconButton, Paper, styled, Typography} from "@mui/material";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import { useDispatch } from 'react-redux';
import { setSelectedItem, clearSelectedItem } from "../features/selectedItemSlice";
import { useNavigate } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CloseIcon from "@mui/icons-material/Close";
import {deleteBudget} from "../api/delete.js";

import { API_URL } from "../config/api";

async function fetchBudgets() {
    const res = await fetch(`${API_URL}/api/budgets/me/with-spent`, {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch budgets');
    const data = await res.json();
    console.log(data);
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

    const queryClient = useQueryClient();

    const { data: budgets = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['budgets'],
            queryFn: fetchBudgets,
            retry: 2,
            staleTime: 1000 * 60,
        });

    const deleteMutation = useMutation({
        mutationFn: deleteBudget,
        onSuccess: () => {
            queryClient.invalidateQueries(["budgets"]);
        },
        onError: (error) => {
            console.error("Error deleting budget:", error);
            alert("Failed to delete budget");
        },
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
                                    position: "relative",
                                    "&:hover .delete-btn": { opacity: 1 },
                                }}
                            >

                                    <IconButton
                                        className="delete-btn"
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            color: "red",
                                            opacity: 0,
                                            transition: "opacity 0.3s",
                                        }}
                                        onClick={() => deleteMutation.mutate(budget.id)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>

                                <Typography variant="h6" fontWeight="bold">
                                    {budget.name}
                                </Typography>

                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Spent: €{budget.spentAmount} / €{budget.amount}
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