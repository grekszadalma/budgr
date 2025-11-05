import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import budgetData from "../data/budget_categories.json";
import {useQuery} from "@tanstack/react-query";

async function fetchBudgets() {
    const res = await fetch('http://localhost:8080/api/budgets/me', {
        method: "GET",
        credentials: "include"
    });
    if (!res.ok) throw new Error('Failed to fetch budgets');
    const data = await res.json();   // parse JSON once
    console.log(data);               // now this logs the actual array
    return data;
}

export default function Expenses() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data: budgets = [], isLoading, error } = // v5
        useQuery({
            queryKey: ['budgets'],
            queryFn: fetchBudgets,
            retry: 2,
            staleTime: 1000 * 60,
        });
    const handleSubmit = async (formData) => {
        console.log("Form submitted!", formData);

        try {
            const response = await fetch("http://localhost:8080/api/expenses/me", {
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
            <SideBar />

            <Box
                sx={{
                    width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
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
                    <Typography variant="h4">Expenses</Typography>
                    <Button sx={{width: 150}} variant="contained" onClick={handleOpen}>
                        Add Expense
                    </Button>
                </Box>

                <Divider />

                {/* List Section */}
                <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    <ExpenseList />
                </Box>

                {/* Modal */}
                <AddModal
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    type="Expense"
                    categories={budgets}
                    defaultTitle="Add New Expense"
                />
            </Box>
        </Box>
    );
}
