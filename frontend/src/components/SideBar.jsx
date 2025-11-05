import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import SavingsIcon from '@mui/icons-material/Savings';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from "../AuthContext.jsx";

export default function SideBar() {

    const {logout} = useAuth()
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: 230,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 230,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 2,

                },
            }}
            variant="permanent"
            anchor="left"
        >

            <Box display="flex" mb={2} >
                <SavingsIcon fontSize="large" sx = {{ mr: 1}} />
                <Typography variant="h6">Budgr</Typography>
            </Box>


            <List>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/dashboard")}>
                    <ListItemIcon>
                        <DashboardOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/incomes")}>
                    <ListItemIcon>
                        <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Incomes" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/expenses")}>
                    <ListItemIcon>
                        <RemoveCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Expenses" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/budget")}>
                    <ListItemIcon>
                        <AccountBalanceWalletOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Budget" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/savings")}>
                    <ListItemIcon>
                        <SavingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Savings" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => navigate("/wishlist")}>
                    <ListItemIcon>
                        <FavoriteBorderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" />
                </ListItem>
                <ListItem button sx={{width: 230}} onClick={() => logout()}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItem>
            </List>
        </Drawer>
    );
}
