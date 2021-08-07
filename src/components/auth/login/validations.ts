import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username must be required")
    .email("Username is invalid"),
  password: Yup.string().required("Password must be required"),
  // .matches(
  //   /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/,
  //   "Password is invalid"
  // ),
});
