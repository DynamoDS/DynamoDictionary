## Folder Structure
```
- /public
  - /data
    - /EXAMPLES
    - Dynamo_Nodes_Documentation.json
    - Dynamo_Nodes_Revit.json   
    - Node_Library.xml 
```

The repository contains a *public* folder for all the data that can be exposed or globally accessed within the application.\
It consists of public assets such as image files, common JS scripts, fonts and css/bootstrap files.\
Along with this the *public* directory also contains *data* directory which contains the JSON and XML files that has all the metadata regarding the nodes which are displayed on the website.
The data is parsed by the application into react components.

The *public/data* directory consists of the following JSON and XML files:

- **Node_Library.xml**\
    This XML file contains the information regarding the hierarchy of all the nodes in the library in a nested format along with their input/output types, list icons and search tags.
- **Dynamo_Nodes_Documentation.json**\
    This JSON file contains the metadata regarding all the general nodes used in Dynamo.
- **Dynamo_Nodes_Revit.json**\
    This JSON file contains the metadata regarding all the revit nodes used in Dynamo, it is later compiled into the Node_Library.xml file.

The *public/data/EXAMPLES* directory consists of images and sample graphs related to all the nodes in the following structure:
```
- /EXAMPLES
  - <Category>
    - <Sub-Category-1>
      - /dyn
      - /img
    - <Sub-Category-2>
      - /dyn
      - /img
    - <Sub-Category-3>
      - /dyn
      - /img
```

Sub-Categories are Action, Query or Create, each node may have an interpretation of a node in any one or all of the sub-categories.\
Each sub-category has its own set of dyn and image files to be displayed on the website.


## XML Schema Documentation for Library
```
<LibraryTree>
    <Category Name="Category-1">
        <Category Name="Category-2">
            <Dynamo.Search.SearchElements.ZeroTouchSearchElement>
                <FullCategoryName>
                    Category-1.Category-2
                </FullCategoryName>
                <Name>
                    NodeName
                </Name>
                <Group>
                    Action
                </Group>
                <Description>
                    Short description of the node
                </Description>
                <SearchTags>
                    comma, separated, search tags
                </SearchTags>
                <Inputs>
                    <InputParameter Name="list" Type="var[]..[]" />
                </Inputs>
                <Outputs>
                    <OutputParameter Name="bool" />
                </Outputs>
                <SmallIcon>
                    src\Resources\DSCoreNodes\SmallIcons\DSCore.List.NodeName.Small.png
                </SmallIcon>
                <LargeIcon>
                    src\Resources\DSCoreNodes\LargeIcons\DSCore.List.NodeName.Large.png
                </LargeIcon>
            </Dynamo.Search.SearchElements.ZeroTouchSearchElement>
        </Category>
    </Category>
</LibraryTree>
```

The above XML representation of a node will result in a nested hierarchical structure displayed in the library such as:
```
- Category-1
  - Category-2
    - Action
      - NodeName
```

Following are the XML tags used to describe the node:

- **LibraryTree:** Root node of the XML document representing the library.
- **Category:** Specifies the category a node falls under, this can be nested to multiple levels based on the hierarchy.
- **FullCategoryName:** Specifies all nested category names in a single string.
- **Name:** Name of the node to be displayed.
- **Group:** Specifies the sub-category of the node, Action, Create or Query
- **Description:** A short description of the node.
- **SearchTags:** Related search tags with can be associated with the node in a comma separated string.
- **Inputs:** List of allowed input parameters to the node.
- **Outputs:** Output parameter type of the node.
- **SmallIcon:** Path to small icon of the node.
- **LargeIcon:** Path to large icon of the node.


## JSON Schema Documentation for Nodes
```
{
  "Name": "ExampleNodeName",
  "imageFile": ["ExampleNodeImageFileName"],
  "dynFile": ["ExampleNodeImageDYNFileName"],
  "folderPath": "Path/To/Node/<Sub-Category>",
  "inDepth": "In depth description of the Node"
}
```

The above JSON object represents a single node on the Dynamo Dictionary Website.

It has 5 required keys:

- **Name:** *string*\
    Name of the Node that is to be represented.

- **imageFile:** *string array*\
    Filename of the image to be used while representing the node.

- **dynFile:** *string array*\
    Filename of the sample graph .DYN file to be used while representing the node.

- **folderPath:** *string*\
    Path to the folder where all the dyn files and images related to the node resides. This is a relative path prefixed by public/data/EXAMPLES/
    <Sub-Category> specifies one of the 3 sub-category that the current node relates to i.e Create,Action or Query.

- **inDepth:** *string*\
    Detailed description of the node that will be displayed on the website.

## Manually adding nodes to the Library

> Note: This manual addition of nodes to the library is a temporary process until further remodelling of the project that will introduce automation of the process, but is currently still under development.

To manually add and document new nodes into the library, following steps are required:

- Add the JSON object in `Dynamo_Nodes_Documentation.json` if it is a Dynamo Node depending upon the scope of the node to be added. (Refer [JSON Schema](https://github.com/DynamoDS/DynamoDictionary_React/blob/master/public/data/README.md#json-schema-documentation-for-nodes))
- Add the XML tags in the root node or append to the desired nested level if adding to an existing category in `Node_Library.xml`. (Refer [XML Schema](https://github.com/DynamoDS/DynamoDictionary_React/blob/master/public/data/README.md#xml-schema-documentation-for-library))
- If the Nodes correspond to a specific host such as Revit, Civil3D, Alias etc. add the nodes in `Node_Library.xml` directly under a new section for the desired host, like the example below: 
```
<Category Name="Host-Name">
    <Category Name="Node-1">
        <Categtory  Name="Node-1">
        <FullCategoryName>Host-Name.Node-1.Sub-Node</FullCategoryName>
        <Name>Sub-Node</Name>
            ...Refer XML Schema...
        </Category>
    </Category>
</Categtory>
```
- Create folders in the *public/data/EXAMPLES* directory with the same name as the parent category and sub-categories, appropriately nested,\
    Create group folders (Create, Query or Action),\
    Create `dyn` and `img` folders and place .dyn files and images related to the node in them. (Refer [Folder Structure](https://github.com/DynamoDS/DynamoDictionary_React/blob/master/public/data/README.md#folder-structure))\
    Alternatively, images/files for host nodes can also be placed in `public/images/src/Resources`.

It is important for the node to appear in the library correctly data that you update both the JSON and XML files along with creating the required folders.

