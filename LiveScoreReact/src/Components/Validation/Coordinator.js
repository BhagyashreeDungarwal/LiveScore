import * as yup from "yup";

export const AthleteValidate = yup.object({
    athleteName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    gender: yup.string().required('Gender is required'),
    height: yup.number().required('Height is required'),
    weight: yup.number().required('Weight is required'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false;
            return (
                value &&
                ['image/jpeg', 'image/png'].includes(value.type)
            );
        }
    ),
    categoryId: yup.string().required('Category is required'),
    coachId: yup.string().required('Coach is required'),

});

export const upAthelete = yup.object({
    athleteName: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    gender: yup.string().required('Gender is required'),
    height: yup.number().required('Height is required'),
    weight: yup.number().required('Weight is required'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    coachName: yup.string().required("Coach Name is Required"),
    categoryName: yup.string().required("Category Name is Required")

})


export const acr = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, "Password is too short - Minimum 8 Character Required.").required("Please Enter Your Password"),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false;
            return (
                value && ['image/jpeg', 'image/png'].includes(value.type)
            );
        }
    ),
    gender: yup.string().required('Gender is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
});
export const acrupdate = yup.object({
    name: yup.string().required('Name is required'),
    contact: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    dateOfBirth: yup.date().required('Date of Birth is required').max(new Date(), 'Date of birth cannot be in the future')
        .min(new Date('1900-01-01'), 'Date of birth must be after 1900-01-01'),
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
    achievement: yup.string().required('Achievement is required'),
    image: yup.mixed().required('Image is required').test('fileType', 'Only PNG and JPG images are allowed',
        (value) => {
            if (!value) return false;
            return (
                value &&
                ['image/jpeg', 'image/png'].includes(value.type)
            );
        }
    ),
});
export const UpCoach = yup.object({
    coachName: yup.string().required('Name is required'),
    coachEmail: yup.string().email('Invalid email address').required('Email is required'),
    gender: yup.string().required('Gender is required'),
    contactNo: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    experience: yup.string().required('experience is required'),
    achievements: yup.string().required('Achievement is required'),
});

export const MatchValidate = yup.object().shape({
    MatchType: yup.string().required('Match Type is required'),
    NumberOfRound: yup.number()
        .required('No. Of Round is required')
        .positive('No. Of Round must be a positive number')
        .integer('No. Of Round must be an integer')
        .min(3, 'No. Of Round must be at least 3'),
    MatchDate: yup.date()
        .required('Date is required')
        .min(new Date(), 'Date must be in the future')
        .test('is-future', 'Date must be in the future', value => {
            if (!value) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set today's date to the start of the day
            const selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0); // Set the selected date to the start of the day
            return selectedDate > today; // Check if the selected date is greater than today
        }),
    AthleteBlue: yup.string().required('Athlete Blue is required'),
    AthleteRed: yup.string().required('Athlete Red is required'),
    CategoryId: yup.string().required('Please Select Category'),
    TournamentId: yup.string().required('Please Select Tournament'),
});
