import React from 'react';

function CommitField(props){
  return(
    <div>
    <span className="graytext">Add a git <a href='https://www.atlassian.com/git/tutorials/saving-changes/git-commit' target="_blank" rel="noopener noreferrer">commit</a> message by typing in the name below. </span>
    <br/>
    <br/>
    <input type="text" style={{'backgroundColor':'rgb(34,34,34)', 'borderWidth':'1px','borderRadius':'4px', 'padding':'5px','textAlign':'center','width':'60%'}} onChange={props.commitInput}/>
    </div>
  )
}

export default CommitField;
