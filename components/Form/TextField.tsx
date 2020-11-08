import { TextField as Input } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export const TextField = ({ name, control, defaultValue, ...rest }) => {
  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ value }) => {
        return (
          <Input
            defaultValue={value}
            onChange={(e) => {
              rest.onChange(e.target.value);
            }}
          ></Input>
        );
      }}
    />
  );
};
