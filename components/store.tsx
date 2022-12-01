"use client";
import create from "zustand";
import produce from "immer";
import type Post from "./types/Post";
import type User from "./types/User";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import {
    query,
    collection,
    limit,
    QuerySnapshot,
    onSnapshot,
    getFirestore,
    DocumentData,
} from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";

// type Users = {
//     users: User[];
//     loadUsers: (user: User) => void;
// }
type Posts = {
    posts: Post[];
    isLoading: true | false;
    setPosts: () => void;
};
export const usePosts = create<Posts>((set) => ({
    posts: [],
    isLoading: true,
    setPosts: async () => {
        const q = query(collection(firestore, "posts"));
        onSnapshot(q, (querySnapshot) => {
            const posts: Post[] = [];
            querySnapshot.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    owner: doc.data().owner,
                    timeAdded: doc.data().timeAdded,
                });
            });
            set({ posts: posts, isLoading: false });
        });
    },
}));
