import Head from "next/head";
import styles from "../styles/Home.module.css";
import { LoginButton, LogoutButton, Profile } from "../components/Login";

export default function Home() {
  return (
    <div>
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <Profile></Profile>
      sup
    </div>
  );
}
