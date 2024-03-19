import { useMutation } from "@tanstack/react-query";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../setup/auth";

export function useUploadFile() {
  return useMutation({
    mutationFn: (data) => {
        const storageRef = ref(storage, data.filePath)
        return uploadBytes(storageRef, data.file)
    },
    onError: (error) => {
        console.error(error)
    },
  });
}
