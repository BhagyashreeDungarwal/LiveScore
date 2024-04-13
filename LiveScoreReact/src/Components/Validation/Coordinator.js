import * as yup from "yup";

export const AtheleteValidate = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    height: yup.number().required('Height is required'),
    weight: yup.number().required('Weight is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    dateOfBirth: yup.date().required('Date of Birth is required'),
    // image: yup.string().required('Image is required'),
    coordinator: yup.string().required('Co-ordinater is required'),
    coach: yup.string().required('Coach is required'),
    contact: yup.string().required('Contact is required'),
});
