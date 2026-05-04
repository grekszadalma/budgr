import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import IncomeList from "../components/IncomeList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import incomesData from "../data/incomes_categories.json";
import { API_URL } from "../config/api";

export default function Incomes() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData) => {


        try {
            const response = await fetch(`${API_URL}/api/incomes/me`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Failed to create income");
            }

            const data = await response.json();
            

            // Optionally, refresh the expense list or update state here

            handleClose();
        } catch (error) {
            console.error("Error creating income:", error);
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
                    <Typography sx={{mr: 50}} variant="h4">Incomes</Typography>
                    <Button sx={{width: 150, ml: 40}} variant="contained" onClick={handleOpen}>
                        Add Income
                    </Button>
                </Box>

                <Divider />

                {/* List Section */}
                <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    <IncomeList />
                </Box>

                {/* Modal */}
                <AddModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    type="Income"
                    categories={incomesData}
                    defaultTitle="Add New Income"
                />
            </Box>
        </Box>
    );
}
