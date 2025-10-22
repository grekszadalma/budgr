import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem} from "@mui/material";
import {useState} from "react";

export default function AddModal({ open, onClose, onSubmit, type, categories, defaultTitle = "" }) {

    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");

    console.log(description)
    console.log(amount)
    console.log(category)

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {}
        if(type === "Wishlist") {
            payload = {
                ...(description && { description }),
            };
        } else {
            payload = {
                ...(type === "Expense" && company && { company }),
                ...(amount && { amount: Number(amount) }),
                ...(description && { description }),
                ...(category && { category }),

            };
        }
        onSubmit(payload);
        setCompany("")// send data to parent
        setDescription("");
        setAmount(0);
        setCategory("");
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{defaultTitle}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    {(type === "Expense" || type === "Income") && (
                        <TextField
                            label="Company"
                            fullWidth
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    )}

                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {(type === "Expense" || type === "Income" || type === "Saving") && (
                        <TextField
                            label="Amount"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    )}

                    {(type === "Expense" || type === "Income" || type === "Saving") && (
                        <TextField
                            select
                            label="Category"
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.category}>
                                    {cat.category}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
