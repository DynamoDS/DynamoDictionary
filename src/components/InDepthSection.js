import React from 'react';
import TextEditor from './TextEditor';
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

function InDepthSection(props) {
  let node=props.node;

  return (
      <div className='inDepth' >

        <b>In Depth:</b>
        <StyledTooltip placement="top" title="Edit In Depth Description">
          <IconButton size="medium" style={{"top":"-15px", "opacity":" 0.5", "right":"-10px"}} onClick={props.editInDepthClick} className='pull-right'>
            <img height="20px" alt='edit icon' src="images/icons/edit.svg" id="editButton" className="edB" />
          </IconButton>
        </StyledTooltip>
        <TextEditor node={node} editInDepth={props.editInDepth}  editInDepthClick={props.editInDepthClick} />
        <hr/>

      </div>
  )
}

export default InDepthSection;
