"use client";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection, CollectionReference } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type Post from "../../components/types/Post";
import type User from "../../components/types/User";

import { usePosts } from "../../components/store";
export default function Profile() {
    const posts = collection(firestore, "posts");
    const mutationOnPosts = useFirestoreCollectionMutation(posts);

    const users = collection(firestore, "users");
    const mutationOnUsers = useFirestoreCollectionMutation(users);

    const getPosts = usePosts((state) => state.setPosts);

    useEffect(() => {
        getPosts();
    }, [getPosts]);
    const postss = usePosts((state) => state.posts);
    return (
        <>
            <button
                disabled={mutationOnPosts.isLoading}
                onClick={() => {
                    mutationOnPosts.mutate({
                        title: "Lemur, grey mouse",
                        body: "primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio",
                        owner: "e7e3c2ac-2f12-4145-b5ce-50df95a4c1cf",
                        timeAdded: new Date(),
                    });
                }}>
                Add posts
            </button>
            <button
                disabled={mutationOnUsers.isLoading}
                onClick={() => {
                    mutationOnUsers.mutate({
                        at: "Shepperd",
                        name: "Brodie",
                        joinedDate: new Date(),
                        following: [
                            "bd6b0607-de1f-418d-8426-17a583dace34",
                            "b332f333-3ec8-4636-baec-c5902dbc5835",
                            "851df5ba-c935-4de0-86bf-7f5e672ff28f",
                            "62a3fce3-3f5d-49e2-98cb-47059b686899",
                        ],
                        followers: [
                            "7b731f3b-db59-41b5-9062-6b22d5d01dc3",
                            "f9310d55-8b58-4821-8977-7b7b1832e3a5",
                            "9620a52e-fed8-4e55-b39d-4c4dc1a8f1d4",
                            "78f552f1-2f57-4706-8f72-21d0cb194367",
                            "3642372d-c503-4a6a-b146-1d0edd7cf940",
                            "17e0fad0-11a3-443c-be05-b8c194796e6c",
                            "4b3e0e2a-2a38-4036-a27e-3a2c94b94d24",
                            "b651ed85-ccee-430c-8a4d-cbd4a20ae8ea",
                            "faac647c-d648-4839-915b-ed78d8bbe1e6",
                            "c835d0d6-d285-438d-8b0d-6c3dad7c93f5",
                        ],
                    });
                }}>
                Add user
            </button>
            <button onClick={() => console.log(postss)}>click</button>
            {/* {mutation.isError && <p>{mutation.error.message}</p>} */}
        </>
    );
}
