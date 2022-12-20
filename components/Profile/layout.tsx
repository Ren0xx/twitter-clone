"use client";
import { Paper } from "@mui/material";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Paper variant='outlined'>{children}</Paper>;
}
