import { Box, Card } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import { useQuery } from "@tanstack/react-query";

async function fetchSavings() {
    const res = await fetch('http://localhost:8080/api/savings/me', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch expenses');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}


export default function SavingList() {
    const { data: savings = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['savings'],
            queryFn: fetchSavings,
            retry: 2,
            staleTime: 1000 * 60,
        });


    if (isLoading) return <div>Loading savings...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {savings.map((saving) => (
                <Card key={saving.id} sx={{ mb: 1, p: 1 }}>
                    <Box display="flex" alignItems="center">
                        <Box mr={3} display="flex" alignItems="center">
                            <SavingsIcon />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <p style={{ margin: 0 }}>{saving.description}</p>
                            <p style={{ margin: 0 }}>
                                {saving.date ? new Date(saving.date).toLocaleDateString() : ""}
                            </p>
                        </Box>
                        <Box ml="auto">{saving.amount} €</Box>
                    </Box>
                </Card>
            ))}
        </>
    );
}
