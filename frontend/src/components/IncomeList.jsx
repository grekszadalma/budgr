import { Box, Card } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import { useQuery } from "@tanstack/react-query";
import {fetchIncomes} from "../api/get.js";



export default function IncomeList() {
    const { data: incomes = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['incomes'],
            queryFn: fetchIncomes,
            retry: 2,
            staleTime: 1000 * 60,

        });


    if (isLoading) return <div>Loading incomes...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {incomes.map((income) => (
                <Card key={income.id} sx={{ mb: 1, p: 1 }}>
                    <Box display="flex" alignItems="center">
                        <Box mr={3} display="flex" alignItems="center">
                            <SavingsIcon />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <p style={{ margin: 0 }}>{income.description}</p>
                            <p style={{ margin: 0 }}>
                                {income.date ? new Date(income.date).toLocaleDateString() : ""}
                            </p>
                        </Box>
                        <Box ml="auto">{income.amount} €</Box>
                    </Box>
                </Card>
            ))}
        </>
    );
}
