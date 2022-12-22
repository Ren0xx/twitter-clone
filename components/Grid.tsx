"use client";
import {  Grid as LayoutGrid} from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";

const Grid = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutGrid
            container
            justifyContent='flex-start'
            alignItems='flex-start'>
            <LayoutGrid sx={{ position: "sticky", top: "0.8rem" }} item xs={3}>
                <Navbar />
            </LayoutGrid>
            <LayoutGrid item xs={9} md={6} >
                {children}
            </LayoutGrid>
            <LayoutGrid
                item
                xs={0}
                md={3}
                sx={{
                    position: "sticky",
                    top: "0.8rem",
                    visibility: { xs: "hidden", md: "visible" },
                }}>
                <aside>Sidebar</aside>
            </LayoutGrid>
        </LayoutGrid>
    );
};

export default Grid;
