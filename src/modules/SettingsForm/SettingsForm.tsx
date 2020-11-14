import React from "react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { settingsSlice, setSettings } from "@/modules/SettingsForm/reducer";
import { CurrencyState } from "@/store";
import { connect } from "react-redux";
import { AreaType, DatePeriodType } from "@/types";

const mapStateToProps = ({ settings }: CurrencyState) => ({
  ...settings,
});
const { changeArea, changePeriod } = settingsSlice.actions;
const mapDispatchToProps = {
  changeArea,
  changePeriod,
  setSettings,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export class SettingsFormComponent extends React.PureComponent<Props> {
  formHandle = (ev: React.FormEvent): void => {
    ev.preventDefault();
  };

  changePeriod = (prop: keyof DatePeriodType) => (
    ev: React.ChangeEvent
  ): void => {
    this.props.changePeriod({
      ...this.props.period,
      [prop]: (ev.target as HTMLInputElement).value,
    } as any);
  };

  changeArea = (prop: keyof AreaType) => (ev: React.ChangeEvent): void => {
    this.props.changeArea({
      ...this.props.area,
      [prop]: (ev.target as HTMLInputElement).value,
    } as any);
  };

  render(): React.ReactNode {
    return (
      <form style={{ margin: "10px 0" }} onSubmit={this.formHandle}>
        <fieldset>
          <legend>Settings</legend>
          <Input
            labelText="Date from:"
            type="text"
            name="period_from"
            placeholder="YYYY-MM-DD"
            value={this.props.period.from}
            onChange={this.changePeriod("from")}
          />
          <Input
            labelText="Date to:"
            type="text"
            name="period_to"
            placeholder="YYYY-MM-DD"
            value={this.props.period.to}
            onChange={this.changePeriod("to")}
          />
          <Button
            isFormButton={true}
            textButton="Update"
            onClick={() => this.props.setSettings()}
          />
          <Input
            labelText="Width:"
            type="number"
            name="width"
            placeholder="px"
            value={this.props.area.width}
            onChange={this.changeArea("width")}
          />
          <Input
            labelText="Height:"
            type="number"
            name="height"
            placeholder="px"
            value={this.props.area.height}
            onChange={this.changeArea("height")}
          />
        </fieldset>
      </form>
    );
  }
}

export const SettingsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsFormComponent);
