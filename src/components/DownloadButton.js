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

function DownloadButton(props) {
  return (
    <a href={props.dynPath} download>
      <StyledTooltip title="Download Dynamo File" placement="top">
        <IconButton size="medium" style={{"top":"-4px","opacity":" 0.5", 'padding':'0', 'width':"30px", 'height':'30px', 'marginTop':'0px', 'marginRight':'0px'}}  className='pull-right'>
          <img height="18px" alt='download icon' src="images/icons/download.svg"/>
        </IconButton>
      </StyledTooltip>
    </a>
  )
}

export default DownloadButton;
