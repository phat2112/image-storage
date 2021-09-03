import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { userRegister } from "../../../stores/authentication/actions";
import { AuthSelector } from "../../../stores/authentication/selectors";
import {
  RegisterRequest,
  RegisterResponse,
} from "../../../stores/authentication/types";
import InputText from "../../../common/formik/input-text";
import { getCookie } from "../../../utils/helper";
import Spacer from "../../../common/spacer";
import AuthTemplate from "../template";
import { validationSchema } from "./validations";
import "./styles.scss";

type FormikRegisterValue = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
};

const initialValues: FormikRegisterValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthday: "",
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = getCookie("token");
  const isSubmitForm = useRef(false);

  const handleRegister = useCallback(
    (request: RegisterRequest) => dispatch(userRegister(request)),
    [dispatch]
  );

  const isUserRegistered: RegisterResponse = useSelector((state) =>
    AuthSelector.isUserRegistered(state)
  );

  useLayoutEffect(() => {
    if (token) {
      history.push("/main");
    }
  }, []);

  useEffect(() => {
    console.log("isUserRegistered :>> ", isUserRegistered);
    if (isUserRegistered.isRegistered && isSubmitForm.current) {
      isSubmitForm.current = false;
      history.push("/login");
    }
  }, [isUserRegistered]);

  const onSubmit = (values: FormikRegisterValue) => {
    handleRegister({
      email: values.email,
      userName: values.username,
      password: values.password,
    });
  };

  const formikBag = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleClickSignUp = () => {
    formikBag.submitForm();
    isSubmitForm.current = true;
  };

  return (
    <AuthTemplate>
      <div className="register-block">
        <FormikProvider value={formikBag}>
          <InputText name="username" label="Họ tên" type="text" isLogin />
          <Spacer type="type-same" />

          <InputText name="email" label="Email" type="text" isLogin />
          <Spacer type="type-same" />

          <InputText name="password" label="Mật khẩu" type="password" isLogin />
          <Spacer type="type-same" />

          <InputText
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            type="password"
            isLogin
          />

          <div className="option-block">
            <Link to="/login">
              <p>Đăng nhập</p>
            </Link>
          </div>
          <Spacer type="type-diff" />

          <button className="button-ele" onClick={handleClickSignUp}>
            Đăng ký
          </button>
        </FormikProvider>
      </div>
    </AuthTemplate>
  );
};

export default React.memo(Register);
