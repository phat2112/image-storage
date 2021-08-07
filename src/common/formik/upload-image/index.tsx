import React, { useState } from "react";
import { useField } from "formik";
import PublishIcon from "@material-ui/icons/Publish";
import "./styles.scss";
import { Typography } from "@material-ui/core";

type Props = {
  name: string;
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const UploadImages: React.FC<Props> = ({ name }) => {
  const [, meta, helpers] = useField(name);

  const [value, setValue] = useState<File>(meta.initialValue);

  const onFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    setValue(file);
  };

  const handleBlur = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    helpers.setValue(file);
    helpers.setTouched(true);
  };

  return (
    <div className="upload-block">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        onBlur={handleBlur}
        name={name}
        id={name}
        style={{ display: "none" }}
      />
      <label htmlFor={name}>
        <div className="upload-block">
          <PublishIcon />
          <Typography variant="body1">Choose file</Typography>
        </div>
      </label>
    </div>
  );
};

export default React.memo(UploadImages);
