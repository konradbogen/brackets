async function send(map: Map<String, String>) {
  const edges = Array<Object>();
  map.forEach((_value, key) => {
    // eslint-disable-next-line no-useless-escape
    // Regular expression pattern to match [something]
    const regexPattern = /\[[^\]]+\]/g;

    // Using match() with the regex pattern to get all matches
    const matches = _value.match(regexPattern);
    let prev: string | null = null;
    let idHash: Array<String> = new Array<String>();
    if (matches != null) {
      matches.forEach((target) => {
        let current = target.replace("[", "").replace("]", "");
        if (prev != null) {
          let hash = prev + "-" + current;
          if (idHash.includes(hash) === false) {
            //nodes must exist
            if (map.has(prev) && map.has(current)) {
              let edge = {
                source: prev,
                target: current,
                value: 1,
              };
              edges.push(edge);
            }
          }
        }
        prev = current;
      });
    }
  });
  console.log(edges);
  await sendRequest(edges);
}

async function nodes() {
  let response = await fetch("/app/php/read.php");
  console.log(response.status);
  console.log(response.statusText);
  if (response.status === 200) {
    let data = await response.text();
    data = JSON.parse(data);
    return makeNodes(data);
  }
  return null;
}

function makeNodes(data: any) {
  console.log(data);
  let nodes: Array<Object> = [];
  for (const key in data) {
    nodes.push({ id: data[key].bracket, group: 1 });
  }
  return nodes;
}

async function fetchGraph() {
  let _edges = await fetchEdges();
  let _nodes = await nodes();
  if (_nodes != null && _edges != null) {
    _nodes = nodesFromEdges(_edges, _nodes);
  }
  return { nodes: _nodes, links: _edges };
}

function nodesFromEdges(edges: any, nodes: any) {
  let knownNodes: Array<String> = nodes.map((node: { id: string }) => node.id);
  edges.forEach((edge: any) => {
    if (knownNodes.includes(edge.source) === false) {
      knownNodes.push(edge.source);
      nodes.push({ id: edge.source, group: 1 });
    }
    if (knownNodes.includes(edge.target) === false) {
      knownNodes.push(edge.target);
      nodes.push({ id: edge.target, group: 1 });
    }
  });
  return nodes;
}

async function fetchEdges() {
  let response = await fetch("/app/php/getEdges.php");
  if (response.status === 200) {
    let data = await response.text();
    data = JSON.parse(data);
    return data;
  }
  return null;
}

function sendRequest(edges: Array<Object>) {
  // Send JSON data to PHP script using fetch API
  console.log("SEND THE FOLLOWING EDGES");
  console.log(edges);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/app/php/edge.php", true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = () => {
    console.log("EDGE SEND");
    console.log(xhr.responseText);
  };
  xhr.send(JSON.stringify(edges));
}

export { send, fetchGraph };
