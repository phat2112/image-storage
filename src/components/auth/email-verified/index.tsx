import React from "react";
import { useFormik, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import InputText from "../../../common/formik/input-text";
import AuthTemplate from "../template";
import "./styles.scss";

type EmailVerifiedType = {
  email: string;
};

const initialValues: EmailVerifiedType = {
  email: "",
};

const EmailVerified = () => {
  const handleSubmit = (value: EmailVerifiedType) => {
    console.log("value :>> ", value);
  };

  const formikBag = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const handleVerifiedEmail = () => {
    formikBag.submitForm();
  };
  return (
    <AuthTemplate>
      <div className="email-verified-block">
        <FormikProvider value={formikBag}>
          <InputText type="text" name="email" label="Email" isLogin />
          <div className="option-block">
            <Link to="/sign-up">
              <p>Trở lại đăng nhập</p>
            </Link>
          </div>
          <button className="button-ele" onClick={handleVerifiedEmail}>
            Xác nhận
          </button>
        </FormikProvider>
      </div>
    </AuthTemplate>
  );
};

export default React.memo(EmailVerified);
