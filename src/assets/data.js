//import modules
import * as d3 from "d3";
//create promises for the data files to be read
const pEdit = d3.json("data/Dynamo_Nodes_Documentation.json");
const pRevit = d3.xml("data/Node_Library.xml");
const pBacklog = d3.json("data/Dynamo_Nodes_Revit.json");

//resolve promises
export default Promise.all([pRevit, pEdit, pBacklog]);
