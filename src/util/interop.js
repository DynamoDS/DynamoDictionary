import resort from './resort'

export const createObject = function(dynLib){

        //there may be duplicates coming from the xml, this removes them
        dynLib = resort.removeDuplicates(dynLib);
        //sort alphabetically at top level
        dynLib = resort.sortArrayOfObjectsByKey(dynLib, "TopCategory")
        //refine the object for data/dom
        let dynMaster = resort.objectify(dynLib,0);
        //refine for children
        dynMaster = resort.objectifyChildren(dynMaster);
        return dynMaster;
}

export const xmlToJson = function(data) {

    let dataArr=[];
    [].map.call(data.querySelectorAll("Category"), function(category) {
        // let name = category.getAttribute("Name")
        
        for (var i = 0; i < category.childNodes.length - 1; i += 2) {
            
            
            var cn = category.childNodes[i + 1];
            var nd = {};
            nd["FullCategoryName"] = cn.querySelector("FullCategoryName").textContent.trim();
            nd["Categories"] = nd["FullCategoryName"].trim().split(".");
            nd["TopCategory"] = nd["Categories"][0].trim();
            nd["activated"] = true;
            nd["Name"] = cn.querySelector("Name").textContent.trim();
            nd["RouteName"]=nameConvert(cn.querySelector("Name").textContent.trim());
            nd["CategorySearch"] = [nd["FullCategoryName"].trim(), nd["Name"].trim()].join('.');
            nd["Group"] = cn.querySelector("Group").textContent.trim();
            nd["Description"] = cn.querySelector("Description").textContent.trim();
            nd["Inputs"] = getParam(cn,"Inputs", "InputParameter");
            nd["Outputs"] = getParam(cn,"Outputs", "OutputParameter");
            nd["SmallIcon"] = cn.querySelector("SmallIcon").textContent.trim();
            nd["LargeIcon"] = cn.querySelector("LargeIcon").textContent.trim();
            nd["SearchTags"] = ""; //cn.querySelector("SearchTags").textContent.trim();
            dataArr.push(nd)
        }
    });
    return dataArr;
}

function nameConvert(name){
  if(name==='%'){name='Modulo';}
  if(name==='!='){name='NotEqualTo';}
  if(name==='&&'){name='And';}
  if(name==='*'){name='Multiplication';}
  if(name==='+'){name='Addition';}
  if(name==='-'){name='Subtraction';}
  if(name==='/'){name='Division';}
  if(name==='<'){name='LessThan';}
  if(name==='<='){name='LessThanEqualTo';}
  if(name==='=='){name='IsEqual';}
  if(name==='>'){name='GreaterThan';}
  if(name==='>='){name='GreaterThanEqualTo';}
  if(name==='||'){name='Or';}
  return name;
}

function getParam(cn,val1, val2) {
    if (cn.querySelector(val1)) {
        let vals = (cn.querySelector(val1))
        vals = vals.querySelectorAll(val2);
        let arr = []
        for (var q = 0; q < vals.length; q++) {
            var m = vals[q]
            let ob = {};
            ob["Name"] = m.getAttribute("Name");
            ob["Type"] = m.getAttribute("Type");
            arr.push(ob);
        }
        return arr;
    }
}

export default {
    createObject: createObject,
    xmlToJson: xmlToJson
}