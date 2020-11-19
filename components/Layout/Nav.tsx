import { IconButton, Select, MenuItem } from "@material-ui/core";
import { Settings, Home } from "@material-ui/icons";
import { useUsers } from "../../hooks/useUsers";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useAppState } from "../../hooks/useAppContext";
import React from "react";

export const Nav = () => {
  const { data, isLoading, isError }: any = useUsers();
  const { control, handleSubmit } = useForm();
  const [appContext, setActiveGroup] = useAppState();

  if (isLoading || isError) return <div>sup</div>;
  return (
    <>
      <Link href="/user-settings">
        <IconButton title="settings">
          <Settings />
        </IconButton>
      </Link>
      {data?.groups.length > 0 && (
        <Controller
          control={control}
          name="activeGroup"
          defaultValue={appContext.activeGroup || data?.groups[0].name}
          label="active group"
          render={({ onChange, value }) => {
            return (
              <Select
                value={value}
                style={{ width: 200 }}
                onChange={({ target }) => {
                  onChange(target.value);
                  setActiveGroup({ activeGroup: target.value });
                }}
              >
                {data?.groups?.map((group) => (
                  <MenuItem key={group.pk} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            );
          }}
        />
      )}
    </>
  );
};
