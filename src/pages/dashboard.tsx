import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Card from "../components/Card";
// import Loader from "../components/Loader";
import Nav from "../components/Nav";
import { RootState } from "../redux/store";
import styles from "../styles/Dashboard-styles.module.css";
import { trpc } from "../Utils/trpc";
const Loader = dynamic(() => import("../components/Loader"), { ssr: false });

const Dashboard = () => {
  const { token } = useSelector((state: RootState) => state.userData);

  const { data, isError, isLoading } = trpc.useQuery([
    "user.verify",
    { token },
  ]);

  const router = useRouter();

  if (isLoading) {
    return <Loader content="Loading" />;
  }

  if (isError) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="mainWrapper bg-tertiary">
      <Nav />
      <div className={`${styles.major} mw-wrapper`}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Dashboard;
