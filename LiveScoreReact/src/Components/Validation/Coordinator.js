import * as yup from "yup";

export const AthleteValidate = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    height: yup.number().required('Height is required'),
    weight: yup.number().required('Weight is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false; // if no file is selected
            return (
                value && // value is not undefined or null
                ['image/jpeg', 'image/png'].includes(value.type) // check if the file type is JPEG or PNG
            );
            // Check if the file type is either JPEG or PNG
        }
    ),
    coordinator: yup.string().required('Coordinator is required'),
    coach: yup.string().required('Coach is required'),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

});
export const acr = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, "Password is too short - Minimum 8 Character Required.").required("Please Enter Your Password"),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    age: yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer').min(5, 'Age must be at least 5 years old').max(80, 'Age must be less than or equal to 80 years old'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false; // if no file is selected
            return (
                value && // value is not undefined or null
                ['image/jpeg', 'image/png'].includes(value.type) // check if the file type is JPEG or PNG
            );
            // Check if the file type is either JPEG or PNG
        }
    ),
    gender: yup.string().required('Gender is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
});
export const CoachValidate = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    experience: yup.string().required('experience is required'),
    achivement: yup.string().required('Achivement is required'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false; // if no file is selected
            return (
                value && // value is not undefined or null
                ['image/jpeg', 'image/png'].includes(value.type) // check if the file type is JPEG or PNG
            );
            // Check if the file type is either JPEG or PNG
        }
    ),
});