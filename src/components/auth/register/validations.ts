import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string().required("Bạn chưa nhập họ và tên"),
  email: Yup.string()
    .required("Bạn chưa nhập địa chỉ email")
    .email("Địa chỉ email không hợp lệ"),
  password: Yup.string().required("Bạn chưa nhập mật khẩu"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu xác nhận không trùng khớp"
  ),
});
