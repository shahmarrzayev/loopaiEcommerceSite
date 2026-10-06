import styles from "./Input.module.scss";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import HiddenPasswordIcon from "../../assets/icons/HiddenPasswordIcon";
import ShowPasswordIcon from "../../assets/icons/ShowPasswordIcon";

export default function Input({ data, borderRadius }) {
  const [stateInputType, setStateInputType] = useState(data?.inputType);

  const handleInputType = () => {
    setStateInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={data?.name}>{data?.labelName}</label>

      {
        //       data.inputType === "select" ? (
        // <select
        //   value={data.value}
        //   name={data.name}
        //   onChange={data.handleChange}
        // >
        //   {data.options.map((city, index) => (
        //     <option key={index} value={city} disabled={index === 0}>
        //       {city}
        //     </option>
        //   ))}
        // </select>
        //       ) :
        data.inputType === "mask" ? ( 
          <IMaskInput
            {...data.maskProps}
            placeholder={data.placeholder}
            name={data.name}
            value={data.value}
            readOnly={data?.readOnly}
            onAccept={(value) =>
              data.onChange({ target: { name: data.name, value } })
            }
          />
        ) : (
          <input
            style={{ borderRadius: borderRadius }}
            placeholder={data?.placeholder}
            name={data?.name}
            value={data?.value}
            onChange={data?.onChange}
            type={stateInputType}
            readOnly={data?.readOnly}
          />
        )
      }
      {data?.inputType === "password" && (
        <span onClick={handleInputType} className={styles.showHiddenPassword}>
          {stateInputType === "password" ? (
            <HiddenPasswordIcon color={"rgba(66, 90, 139, 1)"} />
          ) : (
            <ShowPasswordIcon color={"rgba(66, 90, 139, 1)"} />
          )}
        </span>
      )}

      {data?.errorMessage && (
        <span className={styles.errorMessage}>{data?.errorMessage}</span>
      )}
    </div>
  );
}
