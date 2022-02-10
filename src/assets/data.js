//import modules
import * as d3 from "d3";
import p from "../util/promise";
//create promises for two data files to be read
const pEdit = p.promisify(d3.json, "data/Dynamo_Nodes_Documentation.json");
const pRevit = p.promisify(d3.xml, "data/Node_Library.xml");
const pBacklog = p.promisify(d3.json, "data/Dynamo_Nodes_Revit.json");

//resolve promises
export default Promise.all([pRevit, pEdit, pBacklog]);
