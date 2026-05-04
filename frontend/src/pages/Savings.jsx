import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import SavingList from "../components/SavingList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import savingsData from "../data/savings_categories.json";
import AddMoneyModal from "../components/AddMoneyModal.jsx";
import { API_URL } from "../config/api";

export default function Savings() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData) => {
        console.log("Form submitted!", formData);

        try {
            const response = await fetch(`${API_URL}/api/savings/me`, {
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

    const [depositModalOpen, setDepositModalOpen] = useState(false);
    const [selectedSaving, setSelectedSaving] = useState(null);

    const handlePutMoneyOpen = (saving) => {
        setSelectedSaving(saving);
        setDepositModalOpen(true);
    };

    const handlePutMoneyClose = () => {
        setSelectedSaving(null);
        setDepositModalOpen(false);
    };

    const handleDeposit = async (amount) => {
        if (!selectedSaving) return;

        try {
            const response = await fetch(`${API_URL}/api/savings/${selectedSaving.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ amount: amount }),
            });

            if (!response.ok) throw new Error("Failed to update saving");

            const data = await response.json();
            console.log("Saving updated:", data);

            // Optionally refresh your savings list here
            handlePutMoneyClose();
        } catch (error) {
            console.error("Error updating saving:", error);
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
                    <Typography sx={{mr: 50}} variant="h5">Savings</Typography>
                    <Button sx={{width: 150, ml: 40}} variant="contained" onClick={handleOpen}>
                        Add Saving
                    </Button>
                </Box>

                <Divider />

                {/* List Section */}
                <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    <SavingList onPutMoney={handlePutMoneyOpen}/>
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

                <AddMoneyModal
                    open={depositModalOpen}
                    onClose={handlePutMoneyClose}
                    onSubmit={handleDeposit}
                />
            </Box>
        </Box>
    );
}
