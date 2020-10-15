import React from "react";
import { connect } from "react-redux";
import { PeopleState } from "@/rdx/store";
import { fetchPeople } from "@/rdx/reducer/people";

const mapStateToProps = (state: PeopleState) => {
  return {
    data: state.people.data,
    error: state.people.error,
    isLoading: state.people.loading,
  };
};

const mapDispatchToProps = {
  getPeople: fetchPeople,
};

type RawReduxScreenProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class RawReduxScreen extends React.Component<RawReduxScreenProps, {}> {
  componentDidMount() {
    this.props.getPeople();
  }
  render() {
    const { isLoading, data, error } = this.props;
    let key = 0;
    return (
      <div>
        {isLoading && <span>Please wait</span>}
        {error && <span>{error}</span>}
        {data &&
          data.results.map((value) => (
            <div key={`name${key++}`}>{value.name}</div>
          ))}
      </div>
    );
  }
}

export const ReduxScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawReduxScreen);
