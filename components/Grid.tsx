"use client";
import { Grid as LayoutGrid } from "@mui/material";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const Grid = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutGrid
            container
            sx={{ mt: "0.8rem" }}
            justifyContent='center'
            alignItems='flex-start'>
            <LayoutGrid sx={{ position: "sticky", top: "0.8rem" }} item xs={3}>
                <Navbar />
            </LayoutGrid>
            <LayoutGrid item xs={6}>
                {children}
            </LayoutGrid>
            <LayoutGrid item xs={3} sx={{ position: "sticky", top: "0.8rem" }}>
                <aside>Sidebar</aside>
            </LayoutGrid>
        </LayoutGrid>
    );
};

export default Grid;
