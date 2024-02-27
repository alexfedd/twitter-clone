
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { QueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { resetCurrentUser } from '../../setup/store/reducers/authSlice';
import { auth } from '../../setup/auth';
export function useSignOut() {
    const dispatch = useDispatch()
    //const queryClient = new QueryClient()
    return useMutation({
        mutationFn: () => signOut(auth),
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: () => {
            dispatch(resetCurrentUser())
        }
    })
}