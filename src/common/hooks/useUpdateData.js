
import { useMutation } from '@tanstack/react-query';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../setup/auth';
import { useQueryClient } from '@tanstack/react-query';

export function useUpdateData(queryKey) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            const userCollectionRef = collection(db, 'users');
            const userRef = doc(userCollectionRef, data.uid);
            return updateDoc(userRef, data.newField)
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['users', queryKey]})
        }
    })
}