import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import { Box, Button, Divider, Typography, Grid, Paper } from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import wishlistData from "../data/wishlist_categories.json";
import WishlistList from "../components/WishlistList.jsx";
import { API_URL } from "../config/api";


export default function Wishlist() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData) => {
        
        try {
            const response = await fetch(`${API_URL}/api/wlitems/me`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            if (!response.ok) throw new Error("Failed to create wishlist item");
            const data = await response.json();
            
            handleClose();
        } catch (error) {
            console.error("Error creating wishlist item:", error);
        }
    };

    const SIDEBAR_WIDTH = 230; // same as your SideBar component

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <SideBar />

            {/* Main content — uses calc to subtract sidebar width */}
            <Box
                sx={{
                    width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Typography variant="h4">Wishlist</Typography>
                    <Button variant="contained" onClick={handleOpen}>
                        Add Item
                    </Button>
                </Box>

                <Divider />

                <WishlistList />

                {/* Modal */}
                <AddModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    type="Wishlist"
                    categories={wishlistData}
                    defaultTitle="Add New Wishlist Item"
                />
            </Box>
        </Box>
    );
}
