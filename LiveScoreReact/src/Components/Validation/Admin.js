import * as yup from "yup";

export const category = yup.object({
    CategoryName: yup.string().required('Category Name is Required'),
    CategoryTime: yup.number().required('Category Time is Required'),
});

export const tournament = yup.object({
    name: yup.string().required('Name is Required'),
    location: yup.string().required('Location  is Required'),
    category: yup.string().required('Category is Required'),
    date: yup.date().required('Date is required').min(new Date(), 'Date must be in the future')
        .test('is-future', 'Date must be in the future', value => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set today's date to start of day
            const selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0); // Set selected date to start of day
            return selectedDate > today; // Check if selected date is greater than today
        })
});