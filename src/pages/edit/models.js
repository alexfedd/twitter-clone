import * as yup from "yup";

export const editSchema = yup.object().shape({
    name: yup.string().required("Name is required").max(20, 'Too long! Maximum 20 characters'),
    description: yup.string().max(200, 'Too long! Maximum 200 characters'),
    location: yup.string().max(40, 'Too long! Maximum 40 characters'),
    banner: yup.mixed(),
    pfp: yup.mixed(),
});