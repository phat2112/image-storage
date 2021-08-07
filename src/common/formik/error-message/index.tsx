import React from "react";
import Typography from "@material-ui/core/Typography";
import { useFormikContext, getIn } from "formik";
import "./styles.scss";

type Props = {
  name: string;
};

const ErrorMessage: React.FC<Props> = ({ name }) => {
  const formik = useFormikContext();
  const touched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);

  return (
    <>
      {Boolean(error) && Boolean(touched) && (
        <Typography variant="body2" gutterBottom className="error-text">
          {error}
        </Typography>
      )}
    </>
  );
};

export default React.memo(ErrorMessage);
