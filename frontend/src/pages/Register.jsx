import {Stack, TextField, Button, Typography, Box} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import SavingsIcon from '@mui/icons-material/Savings';

export default function Register() {

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log("User registered:", data);
            alert("Registration successful!");
            // Optionally redirect to login
        } catch (error) {
            console.error(error);
            alert("Error registering user");
        }
    };

    return(
        <form onSubmit={handleRegister}>
            <Stack spacing={2}>
                <Box display="flex" mb={2} justifyContent="center" alignItems="center" >
                    <SavingsIcon fontSize="large" sx = {{ mr: 1}} />
                    <Typography variant="h6">Budgr</Typography>
                </Box>
                <TextField
                    required
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Stack>
        </form>
    )
}