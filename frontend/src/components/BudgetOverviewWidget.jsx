import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Typography, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";

import { API_URL } from "../config/api";

async function fetchBudgets() {
    const res = await fetch(`${API_URL}/api/budgets/me/with-spent`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch budgets");
    return res.json();
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

export default function BudgetOverviewWidget() {
    const {
        data: budgets = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["budgets"],
        queryFn: fetchBudgets,
        retry: 2,
        staleTime: 1000 * 60,
    });

    if (isLoading) return <div>Loading budget...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Paper
            sx={{
                height: 401,

                borderRadius: 2,
                overflowY: "auto", // 👈 enables scrolling

            }}
        >

            <Box>
                <Typography variant="h6" sx={{ textAlign: "left", mb: 1, ml: 2 }}>
                    Budget overview
                </Typography>
            </Box>
            {budgets.map((budget) => {
                const spentPercent =
                    budget.amount > 0
                        ? Math.min((budget.spentAmount / budget.amount) * 100, 100)
                        : 0;

                return (
                    <Paper
                        key={budget.id}

                        sx={{
                            p: 2,
                            m: 2,
                            borderRadius: 3,
                            textAlign: "center",
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
                                Spent: €{budget.spentAmount.toFixed(2)} / €
                                {budget.amount.toFixed(2)}
                            </Typography>
                            <BorderLinearProgress
                                variant="determinate"
                                value={spentPercent}
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    </Paper>
                );
            })}
        </Paper>
    );
}
