import AddModal from "./AddModal.jsx";
import wishlistData from "../data/wishlist_categories.json";
import {Box, Grid, Paper} from "@mui/material";
import {useQuery} from "@tanstack/react-query";


async function fetchWishlist() {
    const res = await fetch('http://localhost:8080/api/wlitems/me', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch wl items');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}

export default function WishlistList() {

    const { data: wlitems = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['wlitems'],
            queryFn: fetchWishlist,
            retry: 2,
            staleTime: 1000 * 60,
        });


    if (isLoading) return <div>Loading wishlist items...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
    <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
            {wlitems.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item}>
                    <Paper
                        elevation={3}
                        sx={{
                            height: 240,
                            width: 240,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 2,
                            textAlign: "center",
                        }}
                    >
                        {item.description}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    </Box>
    )
}