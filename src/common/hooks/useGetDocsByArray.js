
import { useQueries } from '@tanstack/react-query';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../setup/auth';
export function useGetDocsByArray(ids, dbKey) {
    const userCollectionRef = collection(db, dbKey);
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: [`${dbKey.slice(0, -1)}Data`, id],
                queryFn: () => getDoc(doc(userCollectionRef, id))
            }
        }),
        combine: (results) => {
            return {
                data: results.map(result => result.data),
                isLoading: results.some((result)=> result.isLoading)
            }
        } 
    })
}