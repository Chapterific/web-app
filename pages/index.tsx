import Head from "next/head";
import styles from "../styles/Home.module.css";
import { LoginButton, LogoutButton, Profile } from "../components/Login";
import { useApi } from "../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const test = async () => {
  const req = await fetch(
    "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service",
    {
      method: "POST",
      body: JSON.stringify({
        name: "1",
        descriptions: "2",
        url: "3",
      }),
    }
  );
  const data = await req.json();
  console.log(data);
};

export default function Home() {
  const { loading, error, refresh, data: users } = useApi(
    "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service",
    {
      method: "GET",
      audience: `https://auth0-jwt-authorizer`,
      scope: "read:current_user update:current_user_metadata",
      // body: JSON.stringify({
      //   name: "test",
      //   description: "noooo",
      //   url: "silly string",
      // }),
    }
  );

  // React.useEffect(() => {
  //   refresh();
  // }, []);

  console.log("loading", loading);
  console.log("data", users);

  return (
    <div>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <button onClick={() => refresh()}>hey</button>
      <button onClick={() => test()}>i am dumb</button>
      <Profile></Profile>
      sup
    </div>
  );
}
