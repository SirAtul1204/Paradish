import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { trpc } from "../Utils/trpc";
import Loader from "../components/Loader";
interface AuthHOCProps {
  Component: FC;
  props?: any;
}

const AuthHOC = ({ Component, props }: AuthHOCProps) => {
  const AuthenticatedComponent = () => {
    // const Loader = dynamic(() => import("../components/Loader"));
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    const router = useRouter();

    const { data, isLoading, isError } = trpc.useQuery([
      "user.verify",
      { token: cookie.token },
    ]);

    if (isLoading) {
      return <Loader content="Loading" />;
    }

    if (isError) {
      router.replace("/login");
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default AuthHOC;
