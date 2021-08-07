import React, { useCallback } from "react";
import { FormikProvider, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import BackgroundImage from "../../../assets/images/background-img.jpg";
import InputText from "../../../common/formik/input-text";
import Spacer from "../../../common/spacer";
import { validationSchema } from "./validations";
import "./styles.scss";

type FormikLoginValue = {
  username: string;
  password: string;
};

const initialValues: FormikLoginValue = {
  username: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const handleLogin = useCallback((request: FormikLoginValue) => {
    if (
      request.username === "nguyengiaphat5781@gmail.com" &&
      request.password === "123456"
    ) {
      history.push("/main");
    }
  }, []);

  const onSubmit = (values: FormikLoginValue) => {
    handleLogin(values);
  };

  const formikBag = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log("formikBag :>> ", formikBag);

  const handleClickLogin = () => {
    formikBag.submitForm();
  };

  return (
    <div className="login-container">
      <div className="background-container">
        <img src={BackgroundImage} alt="background-img" />
      </div>
      <div className="login-block">
        <FormikProvider value={formikBag}>
          <InputText name="username" label="Username" type="text" isLogin />
          <Spacer type="type-diff" />
          <InputText name="password" label="Password" type="password" isLogin />
          <Spacer type="type-diff" />
          <button className="button-ele" onClick={handleClickLogin}>
            Login
          </button>
        </FormikProvider>
      </div>
    </div>
  );
};

export default React.memo(Login);
