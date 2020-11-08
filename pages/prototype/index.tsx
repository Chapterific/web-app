import { LoginButton, LogoutButton, Profile } from "../components/Login";
import React from "react";
import {
  useWishList,
  useDeleteWishList,
  useCreateWishList,
} from "../../hooks/useApi";
import { useForm } from "react-hook-form";

export default function Home() {
  const { data } = useWishList();
  const [deleteFn] = useDeleteWishList();
  const { register, handleSubmit } = useForm();
  const [updateWishList] = useCreateWishList();
  const onSubmit = (data) => updateWishList(data);
  return (
    <div>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Profile></Profile>
      <ul>
        {data?.Items.map((i) => {
          return (
            <li key={i.id}>
              <button onClick={() => deleteFn(i.id)}>delete</button>
              {i.name}-{i.description}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register} />
        <input name="description" ref={register} />
        <input name="url" ref={register} />
        <button type="submit">submit</button>
      </form>
      sup
    </div>
  );
}
