import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Typography, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";


async function fetchMonthlyExpenses() {
    const res = await fetch("http://localhost:8080/api/expenses/monthly/me", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch monthly expenses");
    return res.json();
}

export default function ExpenseWidget() {

    const {
        data: expenses = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["expenses"],
        queryFn: fetchMonthlyExpenses,
        retry: 2,
        staleTime: 1000 * 60,
    });

    if (isLoading) return <div>Loading sum...</div>;
    if (error) return <div>Error: {error.message}</div>;

    let sum = 0
    expenses.forEach(expense => {

        sum += expense.amount

    });

    return (
        <Paper
            sx={{
                height: 196,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pl: 1
            }}
        >

            <Box>
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                    Expense
                </Typography>
            </Box>


            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    €{sum.toFixed(2)}
                </Typography>
            </Box>
        </Paper>
    );
}