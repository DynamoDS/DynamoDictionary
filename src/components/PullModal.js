import React, { Component } from "react";
import CommitField from "./CommitField";

import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from "react-modal-bootstrap16";

class ModeModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    };
    this._hideModal = this._hideModal.bind(this);
  }

  _hideModal = () => {
    if ((!this.props.modeDyn || !this.props.modeImg) && this.props.forceBoth) {
      this.props.node.dynFile.pop();
      this.props.node.imageFile.pop();
    } else {
      if (this.props.modeImg) {
        let im = this.props.node.imageFile[this.props.index];
        im.data = im.data && im.og ? im.og : im.data;
      }
      if (this.props.modeDyn) {
        let dyn = this.props.node.dynFile[this.props.index];
        dyn.data = dyn.data && dyn.og ? dyn.og : dyn.data;
      }
    }

    this.setState({
      isOpen: false
    });

    this.props.turnOffModal();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.props.hideModal}>
          <ModalHeader>
            <ModalTitle>
              {this.props.phase !== "committing"
                ? "Pull Request"
                : "Add Commit"}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <br />
            <br />
            <div style={{ textAlign: "center", verticalAlign: "middle" }}>
              {this.props.phase !== "logging" && this.props.phase !== "created"
                ? <span className="graytext">
                    You have updated {this.props.fileCount} file{this.props.fileCount !== 1 ? "s" : null}.{" "}
                  </span>
                : this.props.phase === "created"
                  ? <span className="graytext">
                      Linked to Repo! Click on the{" "}
                      <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                        <img
                          src="images/icons/octocat.png"
                          id="prLogo"
                          width="30px"
                          alt="prIcon"
                          style={{ padding: "1px" }}
                        />
                      </a>{" "}
                      in the top right to access on Github
                    </span>
                  : null}
            </div>
            {this.props.phase === "init"
              ? <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <br />
                  <span className="graytext">
                    Create or add to an existing{" "}
                    <a
                      href="https://guides.github.com/introduction/flow/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      branch
                    </a>{" "}
                    by typing in the name below.{" "}
                  </span>
                  <br />
                  <br />
                  <input
                    type="text"
                    style={{
                      backgroundColor: "rgb(34,34,34)",
                      borderWidth: "1px",
                      borderRadius: "4px",
                      padding: "5px",
                      textAlign: "center",
                      width: "60%"
                    }}
                    onChange={this.props.branchInput}
                  />
                  <br />
                  <br />
                  <br />
                  <CommitField commitInput={this.props.commitInput} />
                </div>
              : this.props.phase === "logging"
                ? <div style={{ textAlign: "center" }}>
                    <CircularProgress
                      size={110}
                      thickness={10}
                      color={"white"}
                    />
                  </div>
                : this.props.phase === "committing"
                  ? <div
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <br />
                      <CommitField commitInput={this.props.commitInput} />
                    </div>
                  : null}
            <br />
            <br />
          </ModalBody>
          {this.props.phase !== "created" && this.props.phase !== "logging"
            ? <ModalFooter>
                <button
                  className="btn btn-default"
                  onClick={this.props.hideModal}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={this.props.submit}>
                  {this.props.phase !== "committing"
                    ? "Submit PR"
                    : "Add Commit"}
                </button>
              </ModalFooter>
            : null}
        </Modal>
      </div>
    );
  }
}

export default ModeModal;
