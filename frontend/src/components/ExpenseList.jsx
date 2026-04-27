import {Box, Card, IconButton} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import {fetchMonthlyExpenses} from "../api/get.js";
import {deleteExpense} from "../api/delete.js";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL } from "../config/api";


export default function ExpenseList() {
    const queryClient = useQueryClient();

    const { data: expenses = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['expenses'],
            queryFn: fetchMonthlyExpenses,
            retry: 2,
            staleTime: 1000 * 60,
        });

    const deleteMutation = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            // refetch or update cache after deletion
            queryClient.invalidateQueries(["expenses"]);
        },
        onError: (error) => {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense");
        },
    });


    if (isLoading) return <div>Loading expenses...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {expenses.map((expense) => (
                <Card key={expense.id} sx={{ mb: 1, p: 1, m:2, "&:hover .delete-btn": { opacity: 1 }, }}>
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
                        <IconButton
                            className="delete-btn"
                            size="small"
                            sx={{
                                color: "red",
                                opacity: 0,
                                transition: "opacity 0.3s",
                                ml: 1,
                            }}
                            onClick={() => deleteMutation.mutate(expense.id)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Card>
            ))}
        </>
    );
}
