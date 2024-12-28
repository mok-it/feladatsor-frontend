import "./DayNightSwitch.css";

type DayNightSwitchProps = {
  "data-testid"?: string;
  checked?: boolean;
  onChange?: (
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

export const DayNightSwitch = (props: DayNightSwitchProps) => {
  return (
    <label className="dayNightSwitch" data-testid={props["data-testid"]}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(event) => {
          if (props.onChange) {
            props.onChange(event.target.checked, event);
          }
        }}
      />
      <div className="container" id="button">
        <div className="bg"></div>
        <div className="ray ray-inner"></div>
        <div className="ray ray-medium"></div>
        <div className="ray ray-far"></div>
        <div className="cloud-shadows">
          <div className="cloud-shadow cloud-1"></div>
          <div className="cloud-shadow cloud-2"></div>
          <div className="cloud-shadow cloud-3"></div>
          <div className="cloud-shadow cloud-4"></div>
          <div className="cloud-shadow cloud-5"></div>
          <div className="cloud-shadow cloud-6"></div>
          <div className="cloud-shadow cloud-7"></div>
        </div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="cloud cloud-6"></div>
        <div className="cloud cloud-7"></div>
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="star star-6"></div>
        <div className="star star-7"></div>
        <div className="star star-8"></div>
        <div className="star star-9"></div>
        <div className="star star-10"></div>
        <div className="star star-11"></div>

        <div className="sun">
          <div className="moon">
            <div className="crater crater-1"></div>
            <div className="crater crater-2"></div>
            <div className="crater crater-3"></div>
          </div>
        </div>
      </div>
    </label>
  );
};
