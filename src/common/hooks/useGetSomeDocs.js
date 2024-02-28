import { keepPreviousData, useInfiniteQuery  } from '@tanstack/react-query';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { db } from '../../setup/auth';

export function useGetSomeDocs(numberOfItems, bdKey) {
    return useInfiniteQuery ({
        queryKey: [bdKey, numberOfItems],
        queryFn: async ({pageParam = 1}) => {
            const collectionRef = collection(db, bdKey);
            let q;
            if(bdKey === 'posts') {
                q = query(collectionRef, limit(numberOfItems), orderBy('date', 'desc'), startAfter(pageParam))
            }
            else {
                q = query(collectionRef, limit(numberOfItems), startAfter(pageParam))
            }
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return {users, nextPageParam: users.length > 0 ? pageParam + 1 : undefined};
        },
        getNextPageParam: (lastPage, allPages) => lastPage.nextPageParam,
        placeholderData: keepPreviousData,
    });
}