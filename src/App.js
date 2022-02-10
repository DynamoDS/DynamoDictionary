import React, { Component } from "react";
import { hashHistory } from "react-router";
import PropTypes from "prop-types";

import "./css/font.css";
import "./css/style.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Branch from "./components/Branch";
import SearchBar from "./components/SearchBar";
import PullModal from "./components/PullModal";

import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

import { createTheme } from "@material-ui/core/styles";

const StyledDrawer = withStyles({
  paper: {
    backgroundColor: "rgb(34,34,34)",
    marginTop: "60px",
    width: "inherit"
  }
})(Drawer);

class App extends Component {
  constructor() {
    super();
    this.state = {
      minWidth: 600
    };
    this._editInDepth = this._editInDepth.bind(this);
    this._gitHubSubmit = this._gitHubSubmit.bind(this);
    this._updateExample = this._updateExample.bind(this);
    this._writeBranchName = this._writeBranchName.bind(this);
    this._writeCommitMessage = this._writeCommitMessage.bind(this);
    this._submitPR = this._submitPR.bind(this);
    this._retrieve = this._retrieve.bind(this);
    this._toCommitting = this._toCommitting.bind(this);
    this._routePush = this._routePush.bind(this);
  }
  getChildContext() {
    return { muiTheme: createTheme() };
  }

  _retrieve(url) {
    this.props.actions.retrievePR(url);
    window.setTimeout(this._toCommitting, 3000);
  }
  _toCommitting() {
    this.props.actions.setPRState("committing");
    this.props.actions.hidePRModal();
  }
  _writeBranchName(event) {
    event.preventDefault();
    let bn = event.target.value.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "-");
    bn = bn === "master" ? "user-" + bn : bn;
    this.props.actions.setBranchName(bn);
  }
  _writeCommitMessage(event) {
    event.preventDefault();
    this.props.actions.setCommitMessage(
      event.target.value !== "" ? event.target.value : "no commit message"
    );
  }
  _submitPR() {
    this.props.actions.setPRState("logging");
    this._gitHubSubmit();
  }

  _editInDepth() {
    this.props.actions.editInDepth({ mainEdit: true });
  }

  _updateExample(file) {
    this.props.actions.updateFiles([...this.props.updatedFiles, file]);
  }
  _routePush(route, iteration) {
    const new_route =
      this.props.route === route
        ? `${route.split("/").slice(0, iteration + 1).join("/")}`
        : route;
    hashHistory.push(new_route);

    // this.props.actions.pushRoute(route, iteration, this.props.route);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.commitMessage !== nextProps.commitMessage ||
      this.props.branchName !== nextProps.branchName
    ) {
      return false;
    } else {
      return true;
    }
  }

  _gitHubSubmit() {
    let saveJson = this.props.searchArray.map(d => {
      let { Name, imageFile, dynFile, Categories, Group, inDepth } = d;
      imageFile =
        imageFile &&
        imageFile.length > 0 &&
        imageFile.map(im => {
          return im.name || im;
        });
      if (!imageFile) {
        imageFile = [];
      }
      dynFile =
        dynFile &&
        dynFile.length > 0 &&
        dynFile.map(dyn => {
          return dyn.name || dyn;
        });
      if (!dynFile) {
        dynFile = [];
      }
      return {
        Name,
        imageFile,
        dynFile,
        folderPath: Categories.concat(Group).join("/"),
        inDepth
      };
    });
    window.githubSubmitter(
      [...this.props.updatedFiles],
      saveJson,
      this.props.branchName,
      this.props.commitMessage,
      this._retrieve
    );
  }

  componentDidUpdate() {
    const routePath = this.props.location.pathname;
    if (routePath !== this.props.route) {
      this.props.actions.updateRoute(this.props.location.pathname);
      this.props.actions.searchOff();
      let rightdiv = document.getElementById("page-content-wrapper");
      if (rightdiv) {
        rightdiv.scrollTop = 0;
      }
      if (true) {
        const r = this.props.params;
        const allkeys = Object.keys(r).sort();
        const actives = recursiveActives(this.props.hierarchy, 0) || [];

        function recursiveActives(arr, it) {
          return arr
            .map(d => {
              if (
                d.Name === r[allkeys[it]] ||
                (d.RouteName && d.RouteName === r[allkeys[it]])
              ) {
                if (d.Arr && allkeys.length > it + 1) {
                  return [d].concat(recursiveActives(d.Arr, it + 1));
                } else {
                  return [d];
                }
              }
              return null;
            })
            .filter(el => el)[0];
        }
        this.props.actions.setActives(actives.filter(el => el));
      } else {
        this.props.actions.searchOff();
      }
    }
  }

  resizeAction = () => {
    const _this = this;
    _this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeAction);
  }
  componentDidMount() {
    window.addEventListener("resize", this.resizeAction);
    this.props.actions.loadHierarchy();
  }

  render() {
    const isLarge = window.innerWidth > this.state.minWidth;
    const ratio = this.props.sidebarOpen && isLarge ? 0.3 : 0;

    return this.props.route !== ""
      ? <div className="App">
          {" "}<Header
            toggleTree={this.props.actions.toggleTree}
            treeOpen={this.props.sidebarOpen}
            isLarge={isLarge}
            openModal={this.props.actions.showPRModal}
            searching={this.props.actions.searchDynamo}
            searchArray={this.props.searchArray}
            gitHubSubmit={this._gitHubSubmit}
            phase={this.props.prState}
            link={this.props.prLink}
          />
          <div id="wrapper" style={{ marginTop: "60px" }}>
            {isLarge
              ? <div>
                  <StyledDrawer
                    id="sidebar-wrapper"
                    open={this.props.sidebarOpen}
                    variant="persistent"
                    style={{width: window.innerWidth * ratio}}
                  >
                    <div
                      className="col-md-12 col-sm-12 col-xs-12 clearfix"
                      style={{
                        zIndex: "999",
                        marginTop: "2px",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        clear: "right"
                      }}
                    >
                      <SearchBar
                        searchArray={this.props.searchArray}
                        searching={this.props.actions.searchDynamo}
                        resetActives={this.props.actions.resetActives}
                      />
                    </div>
                    <div
                      className="left-element"
                      style={{ maxHeight: window.innerHeight - 60 + "px" }}
                    >
                      <br />
                      <ul style={{ paddingLeft: "0px" }}>
                        <Sidebar
                          dictionary={this.props.hierarchy}
                          actives={this.props.actives}
                          handleClick={this.props.actions.sidebarClick}
                          iteration={0}
                          routePush={this._routePush}
                        />
                      </ul>
                      <br />
                      <br />
                    </div>
                  </StyledDrawer>
                  {!this.props.sidebarOpen
                    ? <div
                        className="col-md-12 col-sm-12 col-xs-12"
                        style={{
                          zIndex: "999",
                          marginTop: "2px",
                          paddingLeft: "0px",
                          paddingRight: "0px",
                          clear: "right"
                        }}
                      >
                        <SearchBar
                          searchArray={this.props.searchArray}
                          searching={this.props.actions.searchDynamo}
                          resetActives={this.props.actions.resetActives}
                        />
                      </div>
                    : null}
                </div>
              : <div
                  style={{
                    zIndex: "999",
                    marginTop: "2px",
                    paddingLeft: "0px",
                    paddingRight: "0px"
                  }}
                >
                  <SearchBar
                    searchArray={this.props.searchArray}
                    searching={this.props.actions.searchDynamo}
                    resetActives={this.props.actions.resetActives}
                  />
                </div>}
            <div
              id="page-content-wrapper"
              className="right-element"
              style={{
                overflow: "auto",
                maxHeight: window.innerHeight - 60 + "px",
                paddingTop: "20px",
                width: "100%"
              }}
            >
              <div
                style={{
                  marginLeft: window.innerWidth * ratio,
                  width: window.innerWidth * (1 - ratio),
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  transition: isLarge ? "all 450ms" : "all 0ms"
                }}
              >
                <div>
                  <div>
                    <Branch
                      actives={this.props.actives}
                      updateExample={this._updateExample}
                      handleClick={this.props.actions.sidebarClick}
                      editInDepth={this.props.editInDepth}
                      editInDepthClick={this._editInDepth}
                      searching={this.props.searching}
                      searches={this.props.searchResults}
                      searchVal={this.props.searchVal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.prModalOpen
            ? <PullModal
                fileCount={
                  this.props.updatedFiles.length + (this.props.mainEdit ? 1 : 0)
                }
                hideModal={this.props.actions.hidePRModal}
                phase={this.props.prState}
                branchInput={this._writeBranchName}
                commitInput={this._writeCommitMessage}
                submit={this._submitPR}
                link={this.props.prLink}
              />
            : null}
        </div>
      : null;
  }
}
App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
export default App;
