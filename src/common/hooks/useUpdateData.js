
import { useMutation } from '@tanstack/react-query';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../setup/auth';
import { useQueryClient } from '@tanstack/react-query';

export function useUpdateData(queryKey, dbKey) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            const userCollectionRef = collection(db, dbKey);
            const userRef = doc(userCollectionRef, data.uid);
            return updateDoc(userRef, data.newField)
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({queryKey: ['userData', variables.uid]})
            await queryClient.invalidateQueries({queryKey: [dbKey, queryKey]})
        }
    })
}