import { useQuery, keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { db } from '../../setup/auth';

export function useGetSomeDocs(numberOfItems, bdKey) {
    return useInfiniteQuery({
        queryKey: [bdKey, numberOfItems],
        queryFn: async (pageParam = 1) => {
            const collectionRef = collection(db, bdKey);
            let q;
            if(bdKey === 'posts') {
                q = query(collectionRef,orderBy('date', 'desc'), limit(numberOfItems), startAfter(pageParam))
            }
            else {
                q = query(collectionRef, limit(numberOfItems), startAfter(pageParam))
            }
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return users;
        },
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined;
            }
            return firstPageParam - 1;
        },
        placeholderData: keepPreviousData,
    });
}