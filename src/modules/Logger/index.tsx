import { RequestLog } from "@/components/RequsetLog/RequestLog";
import React from "react";

interface IAppState {
  timeCall: string | null;
}

export class TimeLogger extends React.Component<null, IAppState> {
  constructor() {
    super(null);
    this.state = {
      timeCall: null,
    };
  }
  componentDidMount(): void {
    window.addEventListener("APICall", (event: CustomEventInit) =>
      this.setState({ timeCall: event.detail() })
    );
  }

  componentWillUnmount(): void {
    window.removeEventListener("APICall", (event: CustomEventInit) =>
      this.setState({ timeCall: event.detail() })
    );
  }

  render(): React.ReactNode {
    return this.state.timeCall ? (
      <RequestLog request={this.state.timeCall} />
    ) : null;
  }
}
