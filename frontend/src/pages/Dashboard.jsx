import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import {Box, Button, Divider, Grid, Paper, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import expensesData from "../data/expenses_categories.json";
import { LineChart } from '@mui/x-charts/LineChart';
import ExpensesGraph from "../components/ExpensesGraph.jsx";
import BudgetOverviewWidget from "../components/BudgetOverviewWidget.jsx";
import RecentPaymentsWidget from "../components/RecentPaymentsWidget.jsx";
import IncomeWidget from "../components/IncomeWidget.jsx";
import ExpenseWidget from "../components/ExpenseWidget.jsx";



export default function Dashboard() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const SIDEBAR_WIDTH = 230;
    return (
        <Box sx={{ display: "flex", height: "100vh"}}>
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
                    <Typography sx={{mr: 50}} variant="h4">Dashboard</Typography>

                </Box>

                <Divider sx={{mb: 2}} />

            <Grid container spacing={2}>
                <Grid size={7}>
                   <ExpensesGraph />
                </Grid>
                <Grid size={5}>

                        <BudgetOverviewWidget />



                </Grid>
                <Grid size={3}>
                    <IncomeWidget />


                </Grid>
                <Grid size={3}>
                    <ExpenseWidget />


                </Grid>
                <Grid size={6}>
                    <RecentPaymentsWidget/>
                </Grid>
            </Grid>
            </Box>

        </Box>
    );
}
