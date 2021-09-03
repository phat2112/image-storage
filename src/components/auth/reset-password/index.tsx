import React from "react";
import { useFormik, FormikProvider } from "formik";
import InputText from "../../../common/formik/input-text";
import Spacer from "../../../common/spacer";
import AuthTemplate from "../template";
import "./styles.scss";

type ResetPasswordType = {
  password: string;
  confirmPassword: string;
};

const initialValues: ResetPasswordType = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const handleSubmit = (value: ResetPasswordType) => {
    console.log("value :>> ", value);
  };

  const formikBag = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const handleResetPassword = () => {
    formikBag.submitForm();
  };
  return (
    <AuthTemplate>
      <div className="reset-password-block">
        <FormikProvider value={formikBag}>
          <InputText type="text" name="password" label="Mật khẩu" isLogin />
          <Spacer type="type-same" />

          <InputText
            type="text"
            name="password"
            label="Xác nhận mật khẩu"
            isLogin
          />

          <button className="button-ele" onClick={handleResetPassword}>
            Xác nhận
          </button>
        </FormikProvider>
      </div>
    </AuthTemplate>
  );
};

export default React.memo(ResetPassword);
