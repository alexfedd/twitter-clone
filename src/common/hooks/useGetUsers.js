
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../setup/auth';

export function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return users;
        }
    });
}