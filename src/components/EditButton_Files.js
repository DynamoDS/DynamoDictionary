import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";

const StyledTooltip = withStyles({
  popper: {
    opacity: "0.5"
  },
  tooltipPlacementTop: {
    borderRadius: "2px",
    fontSize: "14px"
  }
})(Tooltip);

function EditButton(props) {

  function editExampleFile(node){
    props.turnOnModal(props.index);
  }
  return (
    <StyledTooltip placement="top" title="Edit Example File">
      <IconButton style={{"top":"-6px","opacity":" 0.5", 'padding':'0', 'width':"30px", 'height':'30px', 'marginTop':'0px', 'marginRight':'0px'}}  className='pull-right' onClick={()=>editExampleFile(props.node)}>
        <img alt='edit icon' height="20px" src="images/icons/edit.svg" />
      </IconButton>
    </StyledTooltip>
  )
}

export default EditButton;
