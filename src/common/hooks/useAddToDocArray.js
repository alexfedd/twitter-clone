
import { useMutation } from '@tanstack/react-query';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../setup/auth';
import { useQueryClient } from '@tanstack/react-query';

export function useAddToDocArray(queryKey, dbKey) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            const userCollectionRef = collection(db, dbKey);
            const userRef = doc(userCollectionRef, data.uid);
            return updateDoc(userRef, {[data.fieldName]: arrayUnion(data.arrayValue)})
        },
        onError: (error) => {
            console.error(error.message);
        },
        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({queryKey: ['userData', variables.uid]})
            await queryClient.invalidateQueries({queryKey: [dbKey, queryKey]})
        }
    })
}