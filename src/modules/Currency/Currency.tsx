import React from "react";
import { Graph } from "./components/Graph/Graph";
import { GraphBody } from "./components/GraphBody/GraphBody";
import { connect } from "react-redux";
import { fetchCurrency } from "./reducer";
import { animationSlice } from "@/modules/AnimationControls/";
import { selectCurrecnyToGraph, selectMinMax } from "./selectors";
import { CurrencyState } from "@/store";
import { InitialConfig } from "@/data";
import { Button } from "@/components/Button";
import { CurrencyAvaiableType } from "@/types/";
import { ColorSetType } from "@/types/";
import { settingsSlice } from "@/modules/SettingsForm";

const mapStateToProps = (state: CurrencyState) => ({
  graph: selectCurrecnyToGraph(state),
  minMax: selectMinMax(state),
  currency: state.currency,
  settings: state.settings,
  animation: state.animation,
});

const mapDispatchToProps = {
  fetchCurrency,
  setCurrency: settingsSlice.actions.setCurrency,
  setColor: settingsSlice.actions.setColor,
  playControl: animationSlice.actions.setPlayingState,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export class CurrencyComponent extends React.PureComponent<Props> {
  componentDidMount(): void {
    this.props.fetchCurrency();
  }
  changeCurrency(value: CurrencyAvaiableType, color: ColorSetType): void {
    this.props.setCurrency(value);
    this.props.setColor(color);
  }
  render(): React.ReactNode {
    const { buttons } = InitialConfig;
    const { loading, error, data } = this.props.currency;
    const { area } = this.props.settings;
    return (
      <div>
        <h3>{this.props.settings.currency} / EUR </h3>
        {loading && <span>Please wait</span>}
        {error && <span>{error}</span>}
        {data && this.props.graph.length > 0 && (
          <GraphBody
            area={area}
            labelsRange={this.props.minMax}
            length={this.props.graph.length}
          >
            <Graph
              playState={this.props.animation.playing}
              speed={this.props.animation.speed}
              area={area}
              data={this.props.graph}
              color={this.props.settings.color}
              className="graphic"
              onAnimationStateChange={this.props.playControl}
            />
          </GraphBody>
        )}
        <div>
          {buttons.map((button, index) => (
            <Button
              color={button.color}
              key={index}
              onClick={() => this.changeCurrency(button.value, button.color)}
              textButton={button.value}
              isActive={this.props.settings.currency === button.value}
            />
          ))}
        </div>
      </div>
    );
  }
}

export const Currency = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyComponent);
