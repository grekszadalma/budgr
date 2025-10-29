import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import {Box, Button, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import expensesData from "../data/expenses_categories.json";
import { LineChart } from '@mui/x-charts/LineChart';
import {useQuery} from "@tanstack/react-query";



async function fetchMonthlyExpenses() {
    const res = await fetch('http://localhost:8080/api/expenses/monthly/me', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();



    console.log(data);
    return data;
}

const margin = { right: 24 };


export default function ExpensesGraph() {

    const { data: mthexpenses = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['mthexpenses'],
            queryFn: fetchMonthlyExpenses,
            retry: 2,
            staleTime: 1000 * 60,
        });

    const days = [];
    const amounts = [];


    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long' });;
    const year = date.getFullYear();

    const sortedExpenses = [...mthexpenses].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    sortedExpenses.forEach(expense => {
        days.push(new Date(expense.date).getDate().toString());
        amounts.push(expense.amount);
    });



    if (isLoading) return <div>Loading budget...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Paper sx={{ borderRadius: 2}}>
            <Stack direction="column" spacing={1} alignItems="center">
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ textAlign: 'left', pl: 2 }}>
                        Expenses of {month} {year}
                    </Typography>
                </Box>

                {/* Chart container */}
                <Box sx={{ width: '100%', height: 362 }}>
                    <LineChart
                        series={[{ data: amounts }]}
                        xAxis={[{
                            scaleType: 'point',
                            data: days, // convert numbers to strings for x-axis
                            format: value => value // you can format if needed
                        }]}
                        yAxis={[{ width: 20 }]}
                        margin={{ right: 20 }}
                    />
                </Box>
            </Stack>
        </Paper>
    );
}