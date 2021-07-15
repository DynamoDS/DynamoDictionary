import React from "react";
import DownloadButton from "./DownloadButton";
import EditButtonFiles from "./EditButton_Files";
import ExampleImage from "./ExampleImage";

export default class ExampleFile extends React.Component {
  componentDidMount() {
  }
  render() {
    const props = this.props;
    let node = props.node;
    let index = props.index;
    let dynName =
      typeof node.dynFile[index] === "object"
        ? node.dynFile[index].original
        : node.dynFile[index];
    let dyn = props.dynPaths[index];
    return (
      <div
        className="exSample"
        style={{
          display: "inline-block",
          width: "100%"
        }}
      >
        <div className="exIcons">
          <span
            style={{
              opacity: "0.45",
              paddingRight: "20px"
            }}
          >
            {dynName}
          </span>
          <EditButtonFiles
            node={node}
            turnOnModal={props.turnOnModal}
            index={index}
          />
          <DownloadButton node={node} dynPath={dyn} />
        </div>
          <ExampleImage
            imageSrc={props.imgPaths[index]}
            index={index}
            handleClick={props.openLightbox}
          />
      </div>
    );
  }
}
