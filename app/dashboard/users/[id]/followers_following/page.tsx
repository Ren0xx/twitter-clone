"use client";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { AppBar, Button, Tabs, Tab } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Error from "@/components/Error";
import Loader from "@/components/Loading";
import UserList from "@/components/Profile/UserList";

const FollowersFollowing = () => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<string>("followers");
    const pathname = usePathname();
    const userId =
        pathname !== null && pathname.split("/")[3]
            ? pathname.split("/")[3]
            : "no-user";

    const { data: followersData, error: e1 } = useSWR(
        `/api/userFollowers/${userId}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: followingData, error: e2 } = useSWR(
        `/api/userFollowing/${userId}`,
        fetcher,
        {
            suspense: true,
        }
    );

    if (e1 || e2) {
        return <Error />;
    }
    if (!followersData || !followingData) {
        return <Loader />;
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
