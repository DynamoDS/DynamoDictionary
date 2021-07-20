import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import ActionGrade from '@material-ui/icons/Grade';

const IconButtonExampleTouch = () => (
  <div>
    <IconButton tooltip="bottom-right" tooltipPosition="bottom-right">
      <img src="images/icons/pr_invert.png" id='prLogo' width= '40px' alt="prIcon" style={{'padding':'10px', 'paddingTop':'5px'}}/>
    </IconButton>
    <IconButton tooltip="bottom-center" tooltipPosition="bottom-center">
      <ActionGrade />
    </IconButton>
    <IconButton tooltip="bottom-left" tooltipPosition="bottom-left">
      <ActionGrade />
    </IconButton>
    <IconButton tooltip="top-right" tooltipPosition="top-right">
      <ActionGrade />
    </IconButton>
    <IconButton tooltip="top-center" tooltipPosition="top-center">
      <ActionGrade />
    </IconButton>
    <IconButton tooltip="top-left" tooltipPosition="top-left">
      <ActionGrade />
    </IconButton>
  </div>
);

export default IconButtonExampleTouch;
