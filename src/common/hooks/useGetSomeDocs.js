import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getDocs } from 'firebase/firestore';

export function useGetSomeDocs(numberOfItems, bdKey, query) {
    return useQuery({
        queryKey: [bdKey, numberOfItems],
        queryFn: async () => {
            const querySnapshot = await getDocs(query);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return users;
        },
        placeholderData: keepPreviousData,
    });
}