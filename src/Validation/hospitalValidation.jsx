// src/Validation/hospitalValidation.js

export default function validateHospital(formData) {
    const errors = {};

    // Hospital Name
    if (!formData.hospitalName.trim()) {
        errors.hospitalName = "Hospital name is required";
    } else if (formData.hospitalName.trim().length < 3) {
        errors.hospitalName = "Hospital name must be at least 3 characters";
    }

    // Hospital Type
    if (!formData.hospitalType) {
        errors.hospitalType = "Select hospital type";
    }

    // Contact Person
    if (!formData.contactPerson.trim()) {
        errors.contactPerson = "Contact person is required";
    }

    // Administrator Name
    if (!formData.adminName.trim()) {
        errors.adminName = "Administrator name is required";
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
        errors.phone = "Enter a valid 10-digit mobile number";
    }

    // Registration Number
    if (!formData.registrationNumber.trim()) {
        errors.registrationNumber = "Registration number is required";
    }

    // License Number
    if (!formData.licenseNumber.trim()) {
        errors.licenseNumber = "License number is required";
    }

    // Address
    if (!formData.address.trim()) {
        errors.address = "Address is required";
    }

    // // // State
    // if (!formData.state || !formData.state.name) {
    //     errors.state = "Please select a state";
    // }

    // // // District
    // if (!formData.city || !formData.city.name) {
    //     errors.city = "Please select a district";
    // }

    // Pincode
    if (!formData.pincode.trim()) {
        errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
        errors.pincode = "Enter a valid 6-digit pincode";
    }

    // Blood Bank
    if (!formData.bloodBank) {
        errors.bloodBank = "Please select an option";
    }

    // Total Beds
    if (!formData.totalBeds) {
        errors.totalBeds = "Total beds is required";
    } else if (
        isNaN(formData.totalBeds) ||
        Number(formData.totalBeds) <= 0
    ) {
        errors.totalBeds = "Enter a valid number of beds";
    }

    // Emergency Phone
    if (!formData.emergencyPhone.trim()) {
        errors.emergencyPhone = "Emergency phone is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.emergencyPhone)) {
        errors.emergencyPhone = "Enter a valid 10-digit emergency phone number";
    }

    // Password
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Hospital Logo (optional)
    if (formData.logo) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

        if (
            formData.logo instanceof File &&
            !allowedTypes.includes(formData.logo.type)
        ) {
            errors.logo = "Only JPG, JPEG, PNG or WEBP images are allowed";
        }

        if (
            formData.logo instanceof File &&
            formData.logo.size > 2 * 1024 * 1024
        ) {
            errors.logo = "Image size should not exceed 2 MB";
        }
    }

    return errors;
}