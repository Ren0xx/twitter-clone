'use client'
import Grid from "@/components/Grid"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Grid>
            {children}
        </Grid>
    )
}