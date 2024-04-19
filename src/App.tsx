import "./App.css";
import React from "react";
import LevelList from "./LevelList";

type State = { area: "" };
type Props = {};

class App extends React.Component<Props, State> {
  levels: LevelList;
  data: any;

  constructor(props: Props) {
    super(props);
    this.state = { area: "" };
    this.levels = new LevelList("");
    this.data = {};
    this.fetchDB();
  }

  render() {
    return (
      <textarea
        value={this.state.area}
        onChange={(e) => this.handleChange(e)}
      />
    );
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let newArea = event.target.value;
    console.log(this.state.area);
    if (newArea.includes(">close")) {
      this.levels.delete();
    } else if (newArea.includes(">exp")) {
      newArea = newArea.replace(">exp", "");
      this.levels.tail.value = newArea;
      newArea = this.expand(newArea);
      this.levels.append(newArea);
    } else {
      this.levels.tail.value = newArea;
    }
    this.setState({
      area: this.levels.tail.value,
    });
  }

  async fetchDB() {
    let response = await fetch("http://localhost:8889/my-app/php/db.php");
    console.log(response.status);
    console.log(response.statusText);
    if (response.status === 200) {
      let data = await response.text();
      this.data = JSON.parse(data);
      console.log(this.data);
    }
  }

  expand(from: string) {
    let expanded = from.replace("[hello]", "[hello]Hello World");
    console.log("exp");
    console.log(expanded);
    return expanded;
  }
}

export default App;
