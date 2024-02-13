import React from "react";
import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatch: false,
      countdown: false,
    };
  }
  close = (key) => {
    this.setState({ [key]: false });
  };
  render() {
    return (
      <>
        <center>
          <h1>🚀Timer🚀</h1>
          <div className="container">
            {this.state.stopwatch ? (
              <Stopwatch close={this.close} />
            ) : (
              <button onClick={() => this.setState({ stopwatch: true })}>
                Show Stopwatch
              </button>
            )}
            {this.state.countdown ? (
              <Countdown close={this.close} />
            ) : (
              <button onClick={() => this.setState({ countdown: true })}>
                Show Countdown
              </button>
            )}
          </div>
        </center>
      </>
    );
  }
}

export default App;
