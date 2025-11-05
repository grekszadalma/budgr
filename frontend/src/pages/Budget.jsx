import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import BudgetList from "../components/BudgetList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import savingsData from "../data/savings_categories.json";
import WishlistList from "../components/WishlistList.jsx";
import budgetData from "../data/budget_categories.json";

export default function Budget() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData) => {
        console.log("Form submitted!", formData);

        try {
            const response = await fetch("http://localhost:8080/api/budgets/me", {
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

    const SIDEBAR_WIDTH = 230;
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
                    <Typography variant="h4">Budget</Typography>
                    <Button variant="contained" onClick={handleOpen}>
                        Add Budget
                    </Button>
                </Box>

                <Divider />

                <BudgetList />

                {/* Modal */}
                <AddModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    type="Budget"
                    categories={budgetData}
                    defaultTitle="Add New Budget"
                />
            </Box>
        </Box>
    );
}
