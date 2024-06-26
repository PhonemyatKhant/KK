"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

const NextAuthProvider = ({ children, session }) => (
  <SessionProvider session={session}>
    <Provider store={store}>{children}</Provider>
  </SessionProvider>
);

export default NextAuthProvider;
