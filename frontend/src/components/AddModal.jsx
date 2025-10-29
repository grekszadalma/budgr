import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, MenuItem} from "@mui/material";
import {useState} from "react";

export default function AddModal({ open, onClose, onSubmit, type, categories, defaultTitle = "" }) {

    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [goalAmount, setGoalAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {}
        if(type === "Wishlist") {
            payload = {
                ...(name && { name }),
                ...(category && { category }),
            };
        } else if (type === "Expense" || type === "Income" ){
            payload = {
                ...(company && { company }),
                ...(amount && { amount: Number(amount) }),
                ...(description && { description }),
                ...(category && { category }),

            };
        } else if (type === "Saving") {
            payload = {
                ...(amount && { amount: Number(amount) }),
                ...(goalAmount && {goalAmount: Number(goalAmount)}),
                ...(description && { description }),
                ...(category && { category }),
            }
        }
        else {
            payload = {
                ...(amount && { amount: Number(amount) }),
                ...(name && { name }),
            }
        }
        onSubmit(payload);
        setCompany("")// send data to parent
        setDescription("");
        setName("");
        setAmount(0);
        setCategory("");
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{defaultTitle}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                    {(type === "Expense" || type === "Income" || type === "Saving" || type == "Wishlist") && (
                        <TextField
                            select
                            label="Category"
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                        >
                            {type === "Expense" ? (
                                categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </MenuItem>
                                ))
                            ) : (
                                categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.category}>
                                        {cat.category}
                                    </MenuItem>
                                ))
                            )}

                        </TextField>
                    )}

                    {(type === "Expense" || type === "Income") && (
                        <TextField
                            label="Company"
                            fullWidth
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    )}

                    {(type === "Wishlist" || type === "Budget") && (<TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    )}

                    {(type === "Expense" || type === "Income" || type === "Saving") && (
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />)}

                    {(type === "Saving") && (
                        <TextField
                            label="Goal amount"
                            type="number"
                            fullWidth
                            value={goalAmount}
                            onChange={(e) => setGoalAmount(e.target.value)}
                        />
                    )}

                    {(type === "Expense" || type === "Income" || type === "Saving" || type == "Budget") && (
                        <TextField
                            label="Amount"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
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
