import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../setup/auth';

export function useGetSomeDocs(numberOfItems, bdKey) {
    return useQuery({
        queryKey: [bdKey, numberOfItems],
        queryFn: async () => {
            const collectionRef = collection(db, bdKey);
            let q;
            if(bdKey === 'posts') {
                q = query(collectionRef, limit(numberOfItems), orderBy('date', 'desc'))
            }
            else {
                q = query(collectionRef, limit(numberOfItems))
            }
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return users;
        }
    });
}