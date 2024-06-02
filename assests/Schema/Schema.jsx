import * as Yup from 'yup'

export const signupSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Name must be 2 to 25 character"),
    email: Yup.string().email().required("Provide a valid E-mail"),
    phone_no: Yup.string().matches(/^\d{10}$/, "Please enter valid number."),
    address: Yup.string().min(10).required("Provide a valid Address"),
    password: Yup.string().min(6).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).required(),
    confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], "Password doesn't matched.")
})

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Provide a E-mail"),
    password: Yup.string().min(6).matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).required(),
})