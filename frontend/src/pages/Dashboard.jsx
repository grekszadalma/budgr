import { useState } from "react";
import SideBar from "../components/SideBar.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import {Box, Button, Divider, Typography} from "@mui/material";
import AddModal from "../components/AddModal.jsx";
import expensesData from "../data/expenses_categories.json";

export default function Dashboard() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const SIDEBAR_WIDTH = 230;
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <SideBar />

            <div>Hello</div>
        </Box>
    );
}
