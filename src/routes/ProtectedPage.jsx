import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (guestOnly && user?.email) {
      return nav("/");
    } else if (needLogin && !user?.email) {
      return nav("/login");
    }
  }, []);

  return children;
}
