import React, { useState, useCallback } from "react";
import { logout } from "@/api/auth";
import { useHistory } from "react-router-dom";

export const User = () => {
  const login = localStorage.getItem("login");
  const [username, setUserName] = useState(login);
  const history = useHistory();

  const tryToLogOut = useCallback(() => {
    setUserName("");
    logout().then(() => history.go(0));
  }, []);

  return (
    <div style={{ margin: "10px 0" }}>
      {username ? (
        <div>
          <span>Welcome, {username} </span>
          <button onClick={tryToLogOut}>Press to Log Out</button>
        </div>
      ) : (
        <span>Try to logout</span>
      )}
    </div>
  );
};
