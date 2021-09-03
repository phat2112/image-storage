import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormik, FormikProvider } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { searchUser, updateUser } from "../../stores/user/actions";
import { UserSelector } from "../../stores/user/selectors";
import { AuthSelector } from "../../stores/authentication/selectors";
import { LoginResponse } from "../../stores/authentication/types";
import {
  SearchUserRequest,
  UserResponse,
  UpdateUserResponse,
} from "../../stores/user/types";
import { AUTHORIZE_STEP, STORAGE_TYPE } from "../../common/constants";
import InputAutoComplete from "../../common/formik/input-autocomplete";
import RadioGroupComponent from "../../common/formik/radio-group";
import UploadImage from "../../common/formik/upload-image";
import InputDate from "../../common/formik/input-date";
import InputText from "../../common/formik/input-text";
import CheckBox from "../../common/check-box";
import { stepLabels, storageData } from "../../utils/mock-data";
import StepBar from "./step-bar";
import { validationSchema } from "./validations";
import "./styles.scss";

type InitValues = {
  storageType: string[];
  loveDate: string;
  loverName: string;
  loverId: string;
};

const initialValues: InitValues = {
  storageType: [],
  loveDate: "",
  loverId: "",
  loverName: "",
};

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const StepModal: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState<number>(AUTHORIZE_STEP.FIRST);
  const [userAvaUploaded, setUserAvaUploaded] = useState<File | null>(null);
  const [loveAvaUploaded, setLoveAvaUploaded] = useState<File | null>(null);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);

  const timerRef = useRef(0);
  const isSubmitForm = useRef(false);

  const searchUserRequest = useCallback(
    (request: SearchUserRequest) => {
      return dispatch(searchUser(request));
    },
    [dispatch]
  );

  const updateUserRequest = useCallback(
    (request, userId) => {
      return dispatch(updateUser(request, userId));
    },
    [dispatch]
  );

  const userList: UserResponse[] = useSelector((state) =>
    UserSelector.getFoundUsers(state)
  );

  const userUpdated: UpdateUserResponse = useSelector((state) =>
    UserSelector.getUpdatedUserMsg(state)
  );

  const currenUser: LoginResponse = useSelector((state) =>
    AuthSelector.getCurrentUser(state)
  );

  useEffect(() => {
    if (userUpdated.isUpdated && isSubmitForm.current) {
      isSubmitForm.current = false;
      setOpen(false);
    }
  }, [userUpdated]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (values: InitValues) => {
    const request = new FormData();
    if (userAvaUploaded || loveAvaUploaded) {
      if (userAvaUploaded) {
        request.append("image[]", userAvaUploaded);
      }
      if (loveAvaUploaded) {
        request.append("image[]", loveAvaUploaded);
      }
    }
    request.append("userId", currenUser.userId);
    request.append(
      "isStorageFamily",
      `${values.storageType.includes(STORAGE_TYPE.FAMILY)}`
    );
    request.append(
      "isStorageFriend",
      `${values.storageType.includes(STORAGE_TYPE.FRIEND)}`
    );
    request.append(
      "isStorageLove",
      `${values.storageType.includes(STORAGE_TYPE.LOVE)}`
    );
    request.append("loverId", values.loverId);
    request.append("loverName", values.loverName);
    request.append("firstDayMet", values.loveDate);
    isSubmitForm.current = true;
    updateUserRequest(request, currenUser.userId);
  };

  const formikBag = useFormik({
    initialValues,
    validationSchema: validationSchema(checkboxChecked),
    onSubmit,
  });

  const handleNext = () => {
    if (activeStep > stepLabels.length - 1) return;
    if (activeStep === stepLabels.length - 1) {
      formikBag.submitForm();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleChangeValue = (value: string) => {
    if (timerRef.current % 2 === 0) {
      setTimeout(() => {
        searchUserRequest({ keySearch: value });
        timerRef.current = 0;
      }, 2000);
    }
    timerRef.current++;
  };

  const userOptions = useMemo(() => {
    return userList?.length
      ? userList.map((item) => ({
          label: item.userName,
          value: item.userId,
        }))
      : [];
  }, [userList]);

  const handleCheckBoxChange = useCallback(
    (checked: boolean) => {
      setCheckboxChecked(checked);
      formikBag.resetForm({
        values: {
          ...initialValues,
          storageType: formikBag.values.storageType,
          loveDate: formikBag.values.loveDate,
        },
      });
    },
    [formikBag]
  );

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="step-container">
          <FormikProvider value={formikBag}>
            {activeStep === AUTHORIZE_STEP.FIRST ? (
              <UploadImage
                name="userAva"
                setImageUploaded={setUserAvaUploaded}
                imageUploaded={userAvaUploaded}
              />
            ) : (
              <></>
            )}
            {activeStep === AUTHORIZE_STEP.SECOND ? (
              <RadioGroupComponent name="storageType" radioData={storageData} />
            ) : (
              <></>
            )}
            {activeStep === AUTHORIZE_STEP.THIRD ? (
              <div className="love-container">
                <InputDate name="loveDate" label="Ngày đầu tiên gặp nhau?" />
                <CheckBox
                  label="Người yêu bạn đã dùng trang web này chưa <3"
                  handleChangeChecked={handleCheckBoxChange}
                />
                {checkboxChecked ? (
                  <InputAutoComplete
                    name="loverId"
                    label="Nhập tên người ấy nhé ^^"
                    options={userOptions}
                    loadOptions={handleChangeValue}
                  />
                ) : (
                  <>
                    <UploadImage
                      name="loverAva"
                      setImageUploaded={setLoveAvaUploaded}
                      imageUploaded={loveAvaUploaded}
                    />
                    <InputText
                      name="loverName"
                      type="text"
                      label="Tên của người ấy"
                    />
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
            <StepBar
              stepLabels={stepLabels}
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </FormikProvider>
        </div>
      </Fade>
    </Modal>
  );
};

export default React.memo(StepModal);
