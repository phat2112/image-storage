import React, { useEffect, useMemo, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AUTHORIZE_STEP, STORAGE_TYPE } from "../../common/constants";
import RadioGroupComponent from "../../common/formik/radio-group";
import { stepLabels, storageData } from "../../utils/mock-data";
import UploadImage from "../../common/formik/upload-image";
import InputDate from "../../common/formik/input-date";
import StepBar from "./step-bar";
import "./styles.scss";

type InitValues = {
  userAva: string;
  storageType: string[];
  loverAva: string;
  loveDate: string;
};

const initialValues: InitValues = {
  userAva: "",
  storageType: [],
  loverAva: "",
  loveDate: "",
};

const useStyles = makeStyles((theme: Theme) =>
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

  const [activeStep, setActiveStep] = useState<number>(AUTHORIZE_STEP.FIRST);

  const handleNext = () => {
    if (activeStep >= stepLabels.length) return;
    if (activeStep === stepLabels.length - 1) {
      setOpen(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (values: InitValues) => {
    console.log("values :>> ", values);
  };

  const formikBag = useFormik({
    initialValues,
    onSubmit,
  });

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
              <UploadImage name="userAva" />
            ) : (
              <></>
            )}
            {activeStep === AUTHORIZE_STEP.SECOND ? (
              <RadioGroupComponent name="storageType" radioData={storageData} />
            ) : (
              <></>
            )}
            {activeStep === AUTHORIZE_STEP.THIRD ? (
              <>
                <UploadImage name="loverAva" />
                <InputDate name="loveDate" label="First date meet ?" />
              </>
            ) : (
              <></>
            )}
            <StepBar
              stepLabels={stepLabels}
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              handleReset={handleReset}
            />
          </FormikProvider>
        </div>
      </Fade>
    </Modal>
  );
};

export default React.memo(StepModal);
