import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerTime: 0,
      timerStart: 0,
    };
  }
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      console.log(`time left is ${newTime}`);
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          timerOn: false,
        });
        alert(`Countdown ended!`);
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
    });
  };

  resetTimer = () => {
    clearInterval(this.timer);
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: 0,
      });
    }
  };

  updateTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      switch (input) {
        case "incHours":
          return timerTime + 3600000;
        case "decHours":
          return timerTime - 3600000;
        case "incMinutes":
          return timerTime + 6000;
        case "decMinutes":
          return timerTime - 6000;
        case "incSeconds":
          return timerTime + 1000;
        case "decSeconds":
          return timerTime - 1000;
        default:
          return;
      }
    }
  };

  adjustTimer = (input) => {
    const newTime = this.updateTimer(input);
    this.setState({
      timerTime: newTime,
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <>
        <div className="countdown">
          <span className="cross" onClick={() => this.props.close("countdown")}>
            X
          </span>
          <h1>Countdown</h1>
          <div className="countdown-label">Hours : Minutes : Seconds</div>
          <div className="countdown-adjuster">
            <button onClick={() => this.adjustTimer("incHours")}>⬆️</button>
            <button onClick={() => this.adjustTimer("incMinutes")}>⬆️</button>
            <button onClick={() => this.adjustTimer("incSeconds")}>⬆️</button>
          </div>
          <div className="display">
            {hours} : {minutes} : {seconds}
          </div>
          <div className="countdown-adjuster">
            <button onClick={() => this.adjustTimer("decHours")}>⬇️</button>
            <button onClick={() => this.adjustTimer("decMinutes")}>⬇️</button>
            <button onClick={() => this.adjustTimer("decSeconds")}>⬇️</button>
          </div>

          {timerOn === false &&
            (timerStart === 0 || timerTime === timerStart) && (
              <button className="Button-start" onClick={this.startTimer}>
                Start
              </button>
            )}
          {timerOn === true && timerTime >= 1000 && (
            <button onClick={this.stopTimer}>Stop</button>
          )}
          {timerOn === false &&
            timerStart !== 0 &&
            timerStart !== timerTime &&
            timerTime !== 0 && (
              <button className="Button-start" onClick={this.startTimer}>
                Resume
              </button>
            )}

          {(timerOn === false || timerTime < 1000) &&
            timerStart !== timerTime &&
            timerStart > 0 && (
              <button className="Button-reset" onClick={this.resetTimer}>
                Reset
              </button>
            )}
        </div>
      </>
    );
  }
}

export default Countdown;
