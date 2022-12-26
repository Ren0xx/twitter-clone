"use client";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { AppBar, Button, Tabs, Tab } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import UserList from "@/components/Profile/UserList";

const FollowersFollowing = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<string>("followers");
    const pathname = usePathname();
    const userId = pathname !== null ? pathname.split("/")[3] : "no-user";

    const userUrlFwr =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/userFollowers/${userId}`;
    const userUrlFlg =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/userFollowing/${userId}`;

    const { data: followersData, error: FwrError } = useSWR(
        userUrlFwr,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: followingData, error: FlgError } = useSWR(
        userUrlFlg,
        fetcher,
        {
            suspense: true,
        }
    );

    if (FwrError || FlgError) {
        return <div>An error occurred</div>;
    }
    if (!followersData || !followingData) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Button
                color='secondary'
                onClick={() => router.back()}
                startIcon={<ArrowBackIcon />}></Button>
            <AppBar position='static' sx={{ flexGrow: 1 }}>
                <Tabs
                    variant='fullWidth'
                    centered
                    value={selectedTab}
                    textColor='secondary'
                    indicatorColor='secondary'
                    onChange={(_, newValue) => setSelectedTab(newValue)}>
                    <Tab label='Followers' value='followers' />
                    <Tab label='Following' value='following' />
                </Tabs>
            </AppBar>
            {selectedTab === "followers" ? (
                <UserList users={followersData} />
            ) : (
                <UserList users={followingData} />
            )}
        </>
    );
};

export default FollowersFollowing;
