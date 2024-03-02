
import { useQuery } from '@tanstack/react-query';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../setup/auth';
export function useGetCountFromServer(dbKey, numberOfItems) {
    return useQuery({
        queryKey: [dbKey, numberOfItems],
        queryFn: async () => {
            const collectionRef = collection(db, dbKey)
            const snap = await getCountFromServer(collectionRef);
            return snap.data().count 
        }
    })
}