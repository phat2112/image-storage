import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "../../../stores/authentication/actions";
import { AuthSelector } from "../../../stores/authentication/selectors";
import {
  LoginRequest,
  LoginResponse,
} from "../../../stores/authentication/types";
import InputText from "../../../common/formik/input-text";
import { getCookie } from "../../../utils/helper";
import Spacer from "../../../common/spacer";
import AuthTemplate from "../template";
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
  const dispatch = useDispatch();

  const token = getCookie("token");
  const isSubmitForm = useRef(false);

  const handleLogin = useCallback(
    (request: LoginRequest) => dispatch(userLogin(request)),
    [dispatch]
  );

  const currentUser: LoginResponse = useSelector((state) =>
    AuthSelector.getCurrentUser(state)
  );

  useLayoutEffect(() => {
    if (token) {
      history.push("/main");
    }
  }, []);

  useEffect(() => {
    if (currentUser.token && isSubmitForm.current) {
      isSubmitForm.current = false;
      history.push("/main");
    }
  }, [currentUser.token]);

  const onSubmit = (values: FormikLoginValue) => {
    handleLogin(values);
  };

  const formikBag = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleClickLogin = () => {
    formikBag.submitForm();
    isSubmitForm.current = true;
  };

  return (
    <AuthTemplate>
      <div className="login-block">
        <FormikProvider value={formikBag}>
          <InputText name="username" label="Email" type="text" isLogin />
          <Spacer type="type-same" />

          <InputText name="password" label="Mật khẩu" type="password" isLogin />

          <div className="option-block">
            <Link to="/sign-up">
              <p>Bạn không có tài khoản?</p>
            </Link>
            <Link to="/email-verified">
              <p>Quên mật khẩu?</p>
            </Link>
          </div>
          <Spacer type="type-same" />
          <button className="button-ele" onClick={handleClickLogin}>
            Login
          </button>
        </FormikProvider>
      </div>
    </AuthTemplate>
  );
};

export default React.memo(Login);
