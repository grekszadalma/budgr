import {Box, Button, Link, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import SavingsIcon from '@mui/icons-material/Savings';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

import { API_URL } from "../config/api";


export default function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/authenticate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }


            await login();

            navigate("/dashboard")
            // Optionally redirect to login
        } catch (error) {
            console.error(error);
            alert("Error logging in user");
        }
    };

    return(
        <Stack spacing={2}>
            <Box display="flex" mb={2} justifyContent="center" alignItems="center" >
                <SavingsIcon fontSize="large" sx = {{ mr: 1}} />
                <Typography variant="h6">Budgr</Typography>
            </Box>
            <TextField
                sx ={{mb: 3}}
                required
                id="outlined-required"
                label="Required"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <p>
                Don't have an account? <Link onClick={() => navigate("/register")}>Register here</Link>
            </p>
            <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
        </Stack>
    )
}