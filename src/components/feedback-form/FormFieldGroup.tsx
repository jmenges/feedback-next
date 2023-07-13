import React from "react";

type Props = {
  fieldName: string;
  title: string;
  description: string;
  errorMsg?: string;
  children: React.ReactNode;
};

export default function FormFieldGroup({
  fieldName,
  title,
  description,
  errorMsg,
  children,
}: Props) {
  return (
    <fieldset className="">
      <label
        className="mb-2 text-h4 font-bold text-darker-blue"
        htmlFor={fieldName}
      >
        {title}
      </label>
      <p className="mb-4">{description}</p>
      {children}
      {errorMsg !== undefined && <p className="mt-1 text-red">{errorMsg}</p>}
    </fieldset>
  );
}
