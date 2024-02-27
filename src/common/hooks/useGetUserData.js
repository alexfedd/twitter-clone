import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../setup/auth";

export function useGetUserData(uid) {
    const userCollectionRef = collection(db, "users");
    return useQuery({
        queryKey: ['userData', uid],
        queryFn: async () => {
            return (await getDoc(doc(userCollectionRef, uid)))
        }
    })
}