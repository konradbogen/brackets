import "./App.css";
import React from "react";
import LevelList from "./LevelList";

type State = { area: string };
type Props = {};

class App extends React.Component<Props, State> {
  levels: LevelList;
  map: Map<string, string>;

  constructor(props: Props) {
    super(props);
    this.state = { area: "" };
    this.levels = new LevelList("");
    this.map = new Map<string, string>();
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
    let loadMatch = newArea.match(">load_.* ");
    let saveMatch = newArea.match(">save_.* ");
    if (newArea.includes(">close ")) {
      this.levels.delete();
    } else if (loadMatch) {
      let fileName = loadMatch[0].split("_")[1].replace(" ", "");
      console.log(fileName);
      this.load(fileName);
    } else if (saveMatch) {
      let fileName = saveMatch[0].split("_")[1].replace(" ", "");
      this.setEntry(
        fileName,
        this.levels.head.value.replace(">save_" + fileName, "")
      );
    } else if (newArea.includes(">exp ")) {
      newArea = newArea.replace(">exp ", "");
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

  load(filename: string) {
    let content = this.map.get(filename);
    if (content !== undefined) {
      console.log("LOOOADD");
      this.levels = new LevelList(content);
    } else {
      console.log("NOO LOOOADD");
    }
  }

  async setEntry(bracket: string, content: string) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "http://localhost:8889/brackets editor/php/write.php?bracket=fo?content=fi",
      true
    );
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = () => {
      console.log("set");
      this.fetchDB();
    };
    xhr.send("bracket=" + bracket + "&content=" + content);
  }

  async fetchDB() {
    let response = await fetch(
      "http://localhost:8889/brackets editor/php/read.php"
    );
    console.log(response.status);
    console.log(response.statusText);
    if (response.status === 200) {
      let data = await response.text();
      data = JSON.parse(data);
      this.makeMap(data);
      console.log(this.map);
    }
  }

  makeMap(data: any) {
    console.log(data);
    for (const key in data) {
      let obj = data[key];
      this.map.set(obj.bracket, obj.content);
    }
  }

  expand(from: string) {
    let currentMap = new Map();
    this.map.forEach((_value, key) => {
      if (from.includes(key)) {
        currentMap.set(key, _value);
      }
    });
    let expanded = from;
    currentMap.forEach((_value, key) => {
      let bracketKey = "[" + key + "]";
      let content = "[" + _value + "]";
      expanded = expanded.replaceAll(bracketKey, content);
    });
    console.log("exp");
    console.log(expanded);
    return expanded;
  }
}

export default App;
