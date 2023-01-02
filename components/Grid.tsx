"use client";
import { Grid as LayoutGrid } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
const Grid = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutGrid
            container
            justifyContent='flex-start'
            alignItems='flex-start'>
            <LayoutGrid
                sx={{
                    position: "sticky",
                    top: "0.8rem",
                }}
                item
                xs={3}>
                <Navbar />
            </LayoutGrid>
            <LayoutGrid
                sx={{
                    borderRight: "1px solid #2f3336",
                    borderLeft: "1px solid #2f3336",
                    minHeight: "100vh",
                }}
                item
                xs={9}
                md={6}>
                {children}
            </LayoutGrid>
            <LayoutGrid
                item
                xs={0}
                md={3}
                sx={{
                    top: "0.8rem",
                    display: { xs: "none", md: "block" },
                }}>
                <aside>
                    <Sidebar />
                </aside>
            </LayoutGrid>
        </LayoutGrid>
    );
};

export default Grid;
