import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../setup/auth";

export function useGetDocData(id, dbKey) {
    const userCollectionRef = collection(db, dbKey);
    return useQuery({
        queryKey: [`${dbKey.slice(0, -1)}Data`, id],
        queryFn: async () => {
            return (await getDoc(doc(userCollectionRef, id)))
        }
    })
}