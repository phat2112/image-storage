import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

type Props = {
  stepLabels: string[];
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

const StepBar: React.FC<Props> = ({
  stepLabels,
  activeStep,
  handleBack,
  handleNext,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="button-step-container">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.backButton}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === stepLabels.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(StepBar);
