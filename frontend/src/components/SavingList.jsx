import {Box, Button, Card, Grid, IconButton, Paper, styled, Typography} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import {useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";
import {fetchSavings} from "../api/get.js";
import CloseIcon from "@mui/icons-material/Close";
import {deleteIncome, deleteSaving} from "../api/delete.js";


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


export default function SavingList({onPutMoney}) {
    const queryClient = useQueryClient();

    const { data: savings = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['savings'],
            queryFn: fetchSavings,
            retry: 2,
            staleTime: 1000 * 60,
        });

    const deleteMutation = useMutation({
        mutationFn: deleteSaving,
        onSuccess: () => {
            // refetch or update cache after deletion
            queryClient.invalidateQueries(["savings"]);
        },
        onError: (error) => {
            console.error("Error deleting saving:", error);
            alert("Failed to delete saving");
        },
    });


    if (isLoading) return <div>Loading savings...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {savings.map((saving) => {
                    const spentPercent = saving.amount > 0
                        ? Math.min((saving.amount / saving.goalAmount) * 100, 100)
                        : 0;
                    return (
                        <Grid item xs={12} sm={6} md={3} key={saving.id}>
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
                                    position: "relative",
                                    justifyContent: "space-between",
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
                                    onClick={() => deleteMutation.mutate(saving.id)}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="h6" fontWeight="bold">
                                    {saving.description}
                                </Typography>

                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        €{saving.amount}
                                    </Typography>

                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Saved: €{saving.amount} / €{saving.goalAmount}
                                    </Typography>
                                    <BorderLinearProgress variant="determinate" value={spentPercent} sx={{ mt: 1 }} />

                                </Box>
                                <Box>
                                    <IconButton
                                        disableRipple
                                        sx={{
                                            color: "inherit",
                                            padding: 0,
                                            '&:hover': { backgroundColor: 'transparent' },
                                            '&:focus': { outline: 'none' },
                                            '&:focus-visible': { outline: 'none' },
                                        }}
                                        onClick={() => onPutMoney(saving)}
                                    >
                                        <AddCircleOutlineIcon/>
                                    </IconButton>

                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );

}
