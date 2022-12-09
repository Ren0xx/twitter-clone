import create from 'zustand'


type Credentials = {
    login: string;
    password: string;
    password2: string;
}
export const Credentials = create<Credentials>((set) => ({
    login: "",
    password: "",
    password2: "",
}))
// export const useUserData = create<UserAuth>((set) => ({
//     posts: [],
//     isLoading: true,
    // setPosts: async () => {
    //     const q = query(collection(firestore, "posts"));
    //     onSnapshot(q, (querySnapshot) => {
    //         const posts: Post[] = [];
    //         querySnapshot.forEach((doc) => {
    //             posts.push({
    //                 id: doc.id,
    //                 title: doc.data().title,
    //                 body: doc.data().body,
    //                 owner: doc.data().owner,
    //                 timeAdded: doc.data().timeAdded,
    //             });
    //         });
    //         set({ posts: posts, isLoading: false });
    //     });
    // },
// }));