import { Box, Card } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import { useQuery } from "@tanstack/react-query";

async function fetchExpenses() {
    const res = await fetch('http://localhost:8080/api/expenses/me', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}


export default function ExpenseList() {
    const { data: expenses = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['expenses'],
            queryFn: fetchExpenses,
            retry: 2,
            staleTime: 1000 * 60,
        });


    if (isLoading) return <div>Loading expenses...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {expenses.map((expense) => (
                <Card key={expense.id} sx={{ mb: 1, p: 1, m:2 }}>
                    <Box display="flex" alignItems="center">
                        <Box mr={3} display="flex" alignItems="center">
                            <SavingsIcon />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <p style={{ margin: 0 }}>{expense.company}</p>
                            <p style={{ margin: 0 }}>
                                {expense.date ? new Date(expense.date).toLocaleDateString() : ""}
                            </p>
                        </Box>
                        <Box ml="auto">{expense.amount} €</Box>
                    </Box>
                </Card>
            ))}
        </>
    );
}
