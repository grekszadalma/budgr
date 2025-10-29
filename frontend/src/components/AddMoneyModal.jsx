import {Modal, Box, TextField, Button, Typography} from "@mui/material";
import { useState } from "react";

export default function AddMoneyModal({ open, onClose, onSubmit }) {
    const [amount, setAmount] = useState("");

    const handleSubmit = () => {
        onSubmit(Number(amount));
        setAmount("");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                p: 3, backgroundColor: "white", width: 300,
                mx: "auto", mt: "20%", borderRadius: 2
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Put Money</Typography>
                <TextField
                    label="Amount"
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
}
