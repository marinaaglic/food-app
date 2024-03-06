"use client";
import { ChangeEvent, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  function pickClickHandler() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }
  function imageChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      if (!file) {
        setPickedImage(null);
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPickedImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={imageChangeHandler}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={pickClickHandler}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
