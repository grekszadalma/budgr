import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Typography, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";


async function fetchMonthlyIncomes() {
    const res = await fetch("http://localhost:8080/api/incomes/monthly/me", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch income sum");
    return res.json();
}

export default function IncomeWidget() {

    const {
        data: incomes = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["incomes"],
        queryFn: fetchMonthlyIncomes,
        retry: 2,
        staleTime: 1000 * 60,
    });

    if (isLoading) return <div>Loading sum...</div>;
    if (error) return <div>Error: {error.message}</div>;

    let sum = 0
    incomes.forEach(income => {

    sum += income.amount

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
                    Income
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