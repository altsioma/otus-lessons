import React, { useCallback } from "react";
import { Button } from "@/components/Button/Button";
import { CurrencyState } from "@/store";
import { connect } from "react-redux";
import { isEmpty } from "ramda";
import { actions } from "./reducer";
import { useHistory } from "react-router-dom";

const mapStateToProps = ({ login }: CurrencyState) => ({
  ...login,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const UserComponent: React.FC<Props> = ({ logout, username }) => {
  const history = useHistory();
  const logoutHandler = useCallback(async () => {
    logout();
    history.push("/login");
  }, []);
  return (
    <div style={{ display: "inline-block" }}>
      {!isEmpty(username) ? (
        <div>
          <span>Welcome, {username} </span>
          <Button
            color="blue"
            onClick={logoutHandler}
            textButton="Press to Log Out"
          />
        </div>
      ) : (
        <span>Try to logout</span>
      )}
    </div>
  );
};

export const User = connect(mapStateToProps, mapDispatchToProps)(UserComponent);
