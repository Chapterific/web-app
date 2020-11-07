import { LoginButton, LogoutButton, Profile } from "../components/Login";
import React from "react";
import { useWishList, useDeleteWishList } from "../hooks/useApi";

export default function Home() {
  const { data } = useWishList();
  const [deleteFn] = useDeleteWishList();

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
              {i.description}
            </li>
          );
        })}
      </ul>
      sup
    </div>
  );
}
