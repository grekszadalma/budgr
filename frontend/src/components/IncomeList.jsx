import { Box, Card, IconButton } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import CloseIcon from "@mui/icons-material/Close";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchMonthlyIncomes} from "../api/get.js";
import {deleteExpense, deleteIncome} from "../api/delete.js";



export default function IncomeList() {
    const queryClient = useQueryClient();

    const { data: incomes = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['incomes'],
            queryFn: fetchMonthlyIncomes,
            retry: 2,
            staleTime: 1000 * 60,

        });

    const deleteMutation = useMutation({
        mutationFn: deleteIncome,
        onSuccess: () => {
            // refetch or update cache after deletion
            queryClient.invalidateQueries(["incomes"]);
        },
        onError: (error) => {
            console.error("Error deleting income:", error);
            alert("Failed to delete income");
        },
    });

    if (isLoading) return <div>Loading incomes...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {incomes.map((income) => (
                <Card key={income.id} sx={{ mb: 1, p: 1, "&:hover .delete-btn": { opacity: 1 }, }} >
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
                        <IconButton
                            className="delete-btn"
                            size="small"
                            sx={{
                                color: "red",
                                opacity: 0,
                                transition: "opacity 0.3s",
                                ml: 1,
                            }}
                            onClick={() => deleteMutation.mutate(income.id)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Card>
            ))}
        </>
    );
}
