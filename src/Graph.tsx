import React from "react";

const d3 = require("react-d3-library");

type State = { area: string; mode: number };
type Props = {};

class Graph extends React.Component<Props, State> {
  svg: any;
  width: number;
  height: number;
  color: number;
  simulation: any;
  svgObj: any;

  constructor(props: Props) {
    super(props);
    this.svgObj = document.createElement("svg");
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    this.simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id(function (d: { id: any }) {
          return d.id;
        })
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
  }

  render() {
    return this.svgObj;
  }

  create() {
    d3.json(
      "miserables.json",
      (error: any, graph: { links: any; nodes: any }) => {
        if (error) throw error;

        var link = this.svg
          .append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter()
          .append("line")
          .attr("stroke-width", function (d: { value: number }) {
            return Math.sqrt(d.value);
          });

        var node = this.svg
          .append("g")
          .attr("class", "nodes")
          .selectAll("g")
          .data(graph.nodes)
          .enter()
          .append("g");

        var circles = node
          .append("circle")
          .attr("r", 5)
          .attr("fill", (d: { group: any }) => {
            return d3.color(d.group);
          });

        // Create a drag handler and append it to the node object instead
        var drag_handler = d3
          .drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended);

        drag_handler(node);

        var lables = node
          .append("text")
          .text(function (d: { id: any }) {
            return d.id;
          })
          .attr("x", 6)
          .attr("y", 3);

        node.append("title").text(function (d: { id: any }) {
          return d.id;
        });

        this.simulation.nodes(graph.nodes).on("tick", ticked);

        this.simulation.force("link").links(graph.links);

        function ticked() {
          link
            .attr("x1", function (d: { source: { x: any } }) {
              return d.source.x;
            })
            .attr("y1", function (d: { source: { y: any } }) {
              return d.source.y;
            })
            .attr("x2", function (d: { target: { x: any } }) {
              return d.target.x;
            })
            .attr("y2", function (d: { target: { y: any } }) {
              return d.target.y;
            });

          node.attr("transform", function (d: { x: string; y: string }) {
            return "translate(" + d.x + "," + d.y + ")";
          });
        }
      }
    );
  }

  dragstarted(d: { fx: any; x: any; fy: any; y: any }) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d: { fx: any; fy: any }) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d: { fx: null; fy: null }) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

export default Graph;
