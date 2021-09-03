import React from "react";
import PublishIcon from "@material-ui/icons/Publish";
import "./styles.scss";
import { Typography } from "@material-ui/core";

type Props = {
  name: string;
  setImageUploaded: (image: File | null) => void;
  imageUploaded: File | null;
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const UploadImages: React.FC<Props> = ({
  name,
  setImageUploaded,
  imageUploaded,
}) => {
  const onFileChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) {
      setImageUploaded(file);
    }
  };

  return (
    <div className="upload-block">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        name={name}
        id={name}
        style={{ display: "none" }}
      />
      <label htmlFor={name}>
        <div className="upload-block">
          {imageUploaded ? (
            <img
              src={URL.createObjectURL(imageUploaded)}
              alt="upload"
              className="upload-img"
            />
          ) : (
            <>
              <PublishIcon />
              <Typography variant="body1">Choose file</Typography>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default React.memo(UploadImages);
