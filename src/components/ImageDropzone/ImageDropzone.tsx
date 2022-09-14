import classNames from "classnames/bind";

// hooks
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

// assets
import { FaUpload } from "react-icons/fa";

// styles
import styles from "./ImageDropzone.module.scss";

const cx = classNames.bind(styles);

interface Props {
  setValue?: React.Dispatch<React.SetStateAction<string | null>>,
  preview?: string | null,
  wrapperClass?: string
}

const ImageDropzone = ({ setValue, preview: _preview = "", wrapperClass }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview(_preview);
  }, [_preview]);

  function onDrop(acceptedFiles: Array<File>) {
    if (acceptedFiles && acceptedFiles[0]) {
      const img = URL.createObjectURL(acceptedFiles[0]);
      setPreview(img);

      const reader = new FileReader();

      reader.onloadend = function () {
        const result = reader.result as string;

        if (result) {
          if (setValue) setValue(result);  
        };
        // console.log("raw", reader.result);
        // console.log("replaced", result);
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: cx("image-dropzone-root", wrapperClass, {
          active: isDragActive,
        }),
      })}
    >
      <input {...getInputProps()} />
      {!preview ? (
        <div className={cx("info")}>
          <FaUpload />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>{`Drag 'n' drop some files here, or click to select files`}</p>
          )}
        </div>
      ) : (
        <img src={preview} className={cx("preview-image")} alt="preview" />
      )}
    </div>
  );
};

export default ImageDropzone;
