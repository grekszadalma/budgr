import { useQuery } from "@tanstack/react-query";
import { Box, Paper, Typography, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import ExpenseList from "./ExpenseList.jsx";


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "#1a90ff",
    },
}));

export default function RecentPaymentsWidget() {


    return (
        <Paper
            sx={{

                borderRadius: 2,
                overflowY: "auto", // 👈 enables scrolling
                maxHeight: 196, // 👈 optional: limit height for scroll area
            }}
        >
            <Box>
                <Typography variant="h6" sx={{ textAlign: "left", mb: 1, ml: 2 }}>
                    Recent payments
                </Typography>
            </Box>
           <ExpenseList/>
        </Paper>
    );
}
