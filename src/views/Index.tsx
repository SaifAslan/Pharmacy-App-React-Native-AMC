import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

export default function Index() {
  const userInfo = useAppSelector((state) => state.userInfo);
  useEffect(() => {
    console.warn(userInfo);
  }, [userInfo.accessToken]);

  return <></>;
}
