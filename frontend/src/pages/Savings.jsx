import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import SavingList from "../components/SavingList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import savingsData from "../data/savings_categories.json";

export default function Savings() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData) => {
        console.log("Form submitted!", formData);

        try {
            const response = await fetch("http://localhost:8080/api/savings/me", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to create expense");
            }

            const data = await response.json();
            console.log("Expense created:", data);

            // Optionally, refresh the expense list or update state here

            handleClose();
        } catch (error) {
            console.error("Error creating expense:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <SideBar />

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",

                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                    <Typography sx={{mr: 50}} variant="h4">Savings</Typography>
                    <Button sx={{width: 150, ml: 40}} variant="contained" onClick={handleOpen}>
                        Add Saving
                    </Button>
                </Box>

                <Divider />

                {/* List Section */}
                <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    <SavingList />
                </Box>

                {/* Modal */}
                <AddModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    type="Saving"
                    categories={savingsData}
                    defaultTitle="Add New Saving"
                />
            </Box>
        </Box>
    );
}
