export default function validateAppointment(formData) {
    const errors = {};

    // Donor Name
    if (!formData.donorName.trim()) {
        errors.donorName = "Donor name is required";
    }

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
        errors.email = "Enter a valid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        errors.phone = "Enter a valid 10-digit phone number";
    }

    // Hospital
    if (!formData.hospital) {
        errors.hospital = "Please select a hospital";
    }

    // Date
    if (!formData.date) {
        errors.date = "Please select a date";
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(formData.date);

        if (selectedDate < today) {
            errors.date = "Date cannot be in the past";
        }
    }

    // Time
    if (!formData.time) {
        errors.time = "Please select a time";
    }

    // Notes
    if (formData.notes && formData.notes.length > 250) {
        errors.notes = "Maximum 250 characters allowed";
    }

    return errors;
};