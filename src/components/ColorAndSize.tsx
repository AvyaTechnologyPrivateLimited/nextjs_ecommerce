import React, { FC } from "react";
interface Props {
  color:any, size:any
}
const ColorAndSize: FC<Props> = ({
  color,
  size
}) => {

  return (
    <>
    {color ? (
      <span>{color}</span>
    ) : (
      <></>
    )}
    {color && size ? (
      <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
    ) : (
      <></>
    )}
      
      {size ? (
        <span>{size}</span>
      ) : (
        <></>
      )}
    </>
  );
};
export default ColorAndSize;