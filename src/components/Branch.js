import React from "react";
import { Link } from "react-router";
import { lineageToRoute } from "../util/lineageRouter";

import { flatten, flattenHierarchy } from "../util/array";

import ExampleSection from "./ExampleSection";
import NodeInfo from "./NodeInfo";
import NodeTitle from "./NodeTitle";
import DynamoHierarchy from "./DynamoHierarchy";
import Home from "./Home";

class Branch extends React.Component {
  constructor() {
    super();
    this.nodeDetail = this.nodeDetail.bind(this);
    this.detailList = this.detailList.bind(this);
    this.extractHierarchy = this.extractHierarchy.bind(this);
    this.hierarchyIterator = this.hierarchyIterator.bind(this);
  }

  nodeDetail(ob) {
    return [
      ob.Description
        ? this.detailList("nodeDesc", "Description", ob.Description, 0)
        : null,
      ob.Inputs ? this.detailList("nodeIn", "Inputs", ob.Inputs, 1) : null,
      ob.Outputs ? this.detailList("nodeDesc", "Outputs", ob.Outputs, 2) : null,
      <ExampleSection
        node={ob}
        key={3}
        editInDepthClick={this.props.editInDepthClick}
        editInDepth={this.props.editInDepth}
        updateExample={this.props.updateExample}
      />
    ];
  }

  detailList(cn, title, body, key) {
    return (
      <div className={cn} key={key}>
        <br />
        <b>{title}:</b>
        <br />{" "}
        {key === 1
          ? body.map((b, i) =>
              <span
                style={{
                  color: "gray"
                }}
                key={i}
              >
                {b.Name}: {b.Type}
                <br />
              </span>
            )
          : key === 2
            ? body.map((b, i) =>
                <span
                  key={i}
                  style={{
                    color: "gray"
                  }}
                >
                  Type: {b.Name}
                  <br />
                  <hr />
                </span>
              )
            : <span
                style={{
                  color: "gray"
                }}
              >
                {body}
              </span>}
      </div>
    );
  }

  extractHierarchy(ob) {
    return this.hierarchyIterator(ob).reverse().map(
      (n, i) =>
        n.Arr
          ? <Link to={`/${lineageToRoute(n)}`} key={i} className="addedText">
              {n.Lineage ? n.Name : null}
              {n.Arr && n.Arr[0].Arr ? "," : null}&nbsp;
            </Link>
          : {}
    );
  }
  hierarchyIterator(ob) {
    if (ob && ob.Parent !== "Home") {
      return [ob.Parent]
        .concat(this.hierarchyIterator(ob.Parent))
        .filter(el => el);
    } else {
      return [];
    }
  }
  render() {
    let props = this.props;
    let actives = props.actives;
    let lastLeaf = actives[actives.length - 1];

    return !props.searching && !props.actives[0]
      ? <Home />
      : <div style={{ padding: "10%", paddingTop: "30px" }}>
          <div
            style={{
              paddingLeft: "30px",
              paddingRight: "30px"
            }}
          >
            {!props.searching
              ? <NodeTitle
                  lastLeaf={lastLeaf}
                  handleClick={props.handleClick}
                />
              : <div className="nodeName">
                  Search: {props.searchVal}
                </div>}
            <hr />{" "}
            {!props.searching
              ? <DynamoHierarchy
                  lastLeaf={lastLeaf}
                  extractHierarchy={this.extractHierarchy}
                  nodeDetail={this.nodeDetail}
                />
              : null}
            <div className="outer">
              <div className="imageTiles">
                {props.searching
                  ? props.searches.map((node, i) => {
                      return (
                        <NodeInfo
                          handleClick={props.handleClick}
                          node={node}
                          i={i}
                          key={i}
                          extractHierarchy={this.extractHierarchy}
                        />
                      );
                    })
                  : lastLeaf.Arr
                    ? flatten(flattenHierarchy(lastLeaf)).map((node, i) => {
                        if (i < 50) {
                          return (
                            <NodeInfo
                              handleClick={props.handleClick}
                              node={node}
                              i={i}
                              key={i}
                              extractHierarchy={this.extractHierarchy}
                            />
                          );
                        }
                        return null;
                      })
                    : null}
              </div>
            </div>
          </div>
        </div>;
  }
}

export default Branch;
