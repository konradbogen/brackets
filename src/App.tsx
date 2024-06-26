import "./App.css";
import React from "react";
import LevelList from "./LevelList";
import TabKeyListener from "./TabKeyListener";
import Graph from "./Graph";
import { send, fetchGraph } from "./Edge";
import lily from "./Lily";

type State = { area: string; mode: boolean; graphData: any };
type Props = {};

class App extends React.Component<Props, State> {
  levels: LevelList;
  map: Map<string, string>;

  constructor(props: Props) {
    super(props);
    this.state = { area: "", mode: true, graphData: { nodes: [], links: [] } };
    this.levels = new LevelList("");
    this.map = new Map<string, string>();
    this.fetchDB();

    document.ontouchstart = function (e) {
      e.preventDefault();
    };
  }

  async componentDidMount() {
    let gd = await fetchGraph();
    this.setState({ mode: false, graphData: gd });
  }

  async handleTabPress() {
    if (this.state.mode === true) {
      let gd = await fetchGraph();
      document.body.style.backgroundColor = "var(--color-primary)"; // Set background color
      this.setState({ mode: false, graphData: gd });
    } else {
      document.body.style.backgroundColor = "var(--color-secondary)";
      this.setState({ mode: true });
    }
  }

  splitComponent() {
    return (
      <div>
        <div className="splitLeft">
          <div>
            <TabKeyListener onTabPress={this.handleTabPress.bind(this)} />
            <textarea
              value={this.state.area}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </div>
        <div className="splitRight">
          <div>
            <Graph graphData={this.state.graphData} />
            <TabKeyListener onTabPress={this.handleTabPress.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  fullComponent() {
    if (this.state.mode) {
      return this.graphComponent();
    } else {
      return this.editorComponent();
    }
  }

  graphComponent() {
    return (
      <div>
        <TabKeyListener onTabPress={this.handleTabPress.bind(this)} />
        <textarea
          value={this.state.area}
          onChange={(e) => this.handleChange(e)}
        />
      </div>
    );
  }

  editorComponent() {
    return (
      <div>
        <Graph graphData={this.state.graphData} />
        <TabKeyListener onTabPress={this.handleTabPress.bind(this)} />
      </div>
    );
  }

  render() {
    return this.splitComponent();
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let newArea = event.target.value;
    let loadMatch = newArea.match(">load_.* ");
    let saveMatch = newArea.match(">save_.* ");
    let renameMatch = newArea.match(">rename_.*_.* ");
    let deleteMatch = newArea.match(">delete_.* ");
    if (newArea.includes(">close ")) {
      newArea = newArea.replace(">close ", "");
      this.levels.delete();
    } else if (newArea.includes(">lily ")) {
      newArea = newArea.replace(">lily ", "");
      let syntax = lily(newArea);
      this.levels.append(syntax);
    } else if (renameMatch) {
      let _old = renameMatch[0].split("_")[1];
      let _new = renameMatch[0].split("_")[2].replace(" ", "");
      newArea = newArea.replace(">rename_" + _old + "_" + _new + " ", "");
      this.levels.tail.value = newArea;
      this.rename(_old, _new);
    } else if (loadMatch) {
      let fileName = loadMatch[0].split("_")[1].replace(" ", "");
      if (fileName === "master") {
        this.list();
      } else {
        this.load(fileName);
      }
    } else if (saveMatch) {
      let fileName = saveMatch[0].split("_")[1].replace(" ", "");
      this.save(
        fileName,
        this.levels.head.value.replace(">save_" + fileName, "")
      );
      newArea = newArea.replace(">save_" + fileName + " ", "");
      this.levels.tail.value = newArea;
    } else if (deleteMatch) {
      let fileName = deleteMatch[0].split("_")[1].replace(" ", "");
      this.delete(fileName);
      newArea = newArea.replace(">delete_" + fileName + " ", "");
      this.levels = new LevelList(newArea);
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

  async load(filename: string) {
    let content = this.map.get(filename);
    if (content == null) {
      return false;
    }
    content = this.removeTrailingSpace(content);
    if (content !== undefined) {
      this.levels = new LevelList(content);
    } else {
      console.log("Load failed");
    }
  }

  async rename(_old: string, _new: string) {
    this.map.forEach((value, key) => {
      if (value.includes("[" + _old + "]")) {
        console.log("INCLUDED IN " + key);
        let new_value = value.replaceAll("[" + _old + "]", "[" + _new + "]");
        this.map.set(key, new_value);
        this.save(key, new_value);
      }
    });

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/app/php/rename.php?old=fo?new=fi", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = async () => {
      console.log("RENAME RESPONSE");
      console.log(xhr.responseText);
      await this.fetchDB();
      await send(this.map);
      setTimeout(async () => {
        let gd = await fetchGraph();
        this.setState({ mode: false, graphData: gd });
      }, 300);
    };
    await xhr.send("old=" + _old + "&new=" + _new);
  }

  async save(bracket: string, content: string) {
    content = this.removeTrailingSpace(content);
    content = content.replace(/\\/g, "$");
    content = content.replace(/'/g, "ø");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/app/php/write.php?bracket=fo?content=fi", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = async () => {
      await this.fetchDB();
      await send(this.map);
      setTimeout(async () => {
        let gd = await fetchGraph();
        this.setState({ mode: false, graphData: gd });
      }, 300);
    };
    await xhr.send("bracket=" + bracket + "&content=" + content);
  }

  async delete(bracket: string) {
    this.map.forEach((value, key) => {
      if (value.includes("[" + bracket + "]")) {
        console.log("INCLUDED IN " + key);
        let new_value = value.replaceAll("[" + bracket + "]", "");
        this.map.set(key, new_value);
        this.save(key, new_value);
      }
    });
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/app/php/delete.php?bracket=fo", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = async () => {
      console.log(xhr.responseText);
      await this.fetchDB();
      await send(this.map);
      setTimeout(async () => {
        let gd = await fetchGraph();
        this.setState({ mode: false, graphData: gd });
      }, 300);
    };
    await xhr.send("bracket=" + bracket);
  }

  async fetchDB() {
    let response = await fetch("/app/php/read.php");
    if (response.status === 200) {
      let data = await response.text();
      data = JSON.parse(data);
      this.makeMap(data);
    }
  }

  makeMap(data: any) {
    console.log(data);
    for (const key in data) {
      let obj = data[key];
      this.map.set(
        obj.bracket,
        obj.content.replace(/ø/g, "'").replace(/\$/g, "\\")
      );
    }
  }

  list() {
    let text = "";
    this.map.forEach((_value, key) => {
      if (key !== "master") {
        text += "[" + key + "]\n";
      }
    });
    this.levels = new LevelList(text);
  }

  removeTrailingSpace(str: string) {
    return str.replace(/\n+$/, "");
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
      let content = _value;
      content = this.removeTrailingSpace(content);
      expanded = expanded.replaceAll(bracketKey, content);
    });
    console.log("exp");
    console.log(expanded);
    return expanded;
  }
}

export default App;
