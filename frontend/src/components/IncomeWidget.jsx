import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Typography, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import {fetchMonthlyIncomes} from "../api/get.js";
import {fetchMonthlyExpenses} from "../api/get.js";
import {fetchMonthlySavings} from "../api/get.js";




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

    const {
        data: expenses = [],
        isLoadingExpenses,
        errorExpense,
    } = useQuery({
        queryKey: ["expenses"],
        queryFn: fetchMonthlyExpenses,
        retry: 2,
        staleTime: 1000 * 60,
    });

    const {
        data: savings = [],

    } = useQuery({
        queryKey: ["savings"],
        queryFn: fetchMonthlySavings,
        retry: 2,
        staleTime: 1000 * 60,
    });



    if (isLoading) return <div>Loading sum...</div>;
    if (error) return <div>Error: {error.message}</div>;



    let sum_income = 0
    incomes.forEach(income => {

    sum_income += income.amount

    });

    let sum_expense = 0
    expenses.forEach(expense => {

        sum_expense += expense.amount

    });

    let sum_saving = 0
    savings.forEach(saving => {

        sum_saving += saving.amount

    });



    let sum_remaining = sum_income-sum_expense-sum_saving;

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
                    €{sum_income.toFixed(2)}
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
                <Typography variant="body">
                    Remaining €{sum_remaining.toFixed(2)}
                </Typography>
            </Box>
        </Paper>
    );
}