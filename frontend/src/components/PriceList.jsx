import { Box, Card } from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import { useQuery } from "@tanstack/react-query";



export default function PriceList({item, category}) {


    // Dynamic fetch function
    const fetchPrices = async () => {
        if (!item) return [];
        const url = `http://localhost:8080/api/wishlist/items/prices?itemName=${encodeURIComponent(item)}&category=${encodeURIComponent(category)}`;
        const res = await fetch(url, {
            credentials: "include" // if your backend requires cookies/auth
        });
        if (!res.ok) throw new Error("Failed to fetch prices");
        const data = await res.json();
        console.log(data)
        return data;
    };


    const { data: prices = [], isLoading, error, refetch } = useQuery({
        queryKey: ['prices'],
        queryFn: fetchPrices,
        retry: 2,
        staleTime: 1000 * 60,
    });



    if (isLoading) return <div>Loading prices...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {prices.map((priceItem) => (
                <Card sx={{ mb: 1, p: 1 }}>
                    <Box display="flex" alignItems="center">
                        <Box mr={3} display="flex" alignItems="center">
                            <SavingsIcon />
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <p style={{ margin: 0 }}>{priceItem.productUrl}</p>
                            <p style={{ margin: 0 }}>{priceItem.price}</p>
                        </Box>

                    </Box>
                </Card>
            ))}
        </>
    );
}
