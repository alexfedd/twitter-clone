
import { useQuery } from '@tanstack/react-query';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../setup/auth';
export function useGetCountFromServer(dbKey, query) {
    return useQuery({
        queryKey: [dbKey, 'count'],
        queryFn: async () => {
            const snap = await getCountFromServer(query);
            return snap.data().count 
        }
    })
}