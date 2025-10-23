import SideBar from "../components/SideBar.jsx";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import SavingList from "../components/SavingList.jsx";
import AddModal from "../components/AddModal.jsx";
import savingsData from "../data/savings_categories.json";
import PriceList from "../components/PriceList.jsx";



export default function WishListItem() {

    const dispatch = useDispatch();
    const item = useSelector((state) => state.selectedItem.item);

    if (!item) {
        return <p>No item selected. Please go back.</p>;
    }



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
                    <Typography sx={{mr: 50}} variant="h4">{item.name}</Typography>

                </Box>

                <Divider />


                <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
                    <PriceList item={item.name} category={"Beauty"}/>
                </Box>


            </Box>
        </Box>
    );

}