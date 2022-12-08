"use client";
import create from "zustand";
import produce from "immer";
import type Post from "../types/Post";
import type User from "../types/User";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import {
    query,
    collection,
    limit,
    doc,
    getDoc,
    QuerySnapshot,
    onSnapshot,
    getFirestore,
    DocumentData,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
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

type UserData = {
    user: User | null;
    isLoading: true | false;
    getUser: (id: string) => void;
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
                    replayTo: doc.data().replayTo || "",
                    body: doc.data().body,
                    owner: doc.data().owner,
                    timeAdded: doc.data().timeAdded,
                });
            });
            set({ posts: posts, isLoading: false });
        });
    },
}));

export const useUser = create<UserData>((set) => ({
    user: null,
    isLoading: true,
    getUser: async (id: string) => {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data: User = {
                at: docSnap.data().at,
                name: docSnap.data().name,
                profilePicture: docSnap.data().profilePicture || "",
                joinedDate: docSnap.data().joinedDate,
                following: docSnap.data().following || [],
                followers: docSnap.data().followers || [],
            };
            set({ user: data, isLoading: false });
        } else {
            set({ user: null, isLoading: false });
        }
    },
}));
