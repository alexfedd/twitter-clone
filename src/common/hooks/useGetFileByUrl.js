import { getDownloadURL, ref } from "firebase/storage";
import { useQuery } from '@tanstack/react-query';
import { storage } from "../../setup/auth";

export const useGetFileByURL = (url) => {
    return useQuery({
        queryKey: ['photo', {url}],
        queryFn: () => {
            return getDownloadURL(ref(storage, url))
        }
    })
  }