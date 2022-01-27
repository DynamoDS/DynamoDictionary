import React from 'react';
import { Link } from 'react-router';
import LastPage from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const FlatButton = withStyles({
  root: {
    backgroundColor: "rgb(34,34,34)",
    color: "white",
    fontWeight: "100",
    fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: "12px"
  }
})(Button);

function Header(props){

  return(
        <div className="titleDiv">
          <div className='pull-left' style={{display:'inline', position:'absolute', left:'15px', color:'white', zIndex:10}}>
            {props.isLarge ?
                <FlatButton
                  endIcon={!props.treeOpen?<LastPage/>:null}
                  onClick={props.toggleTree}
                  startIcon={props.treeOpen?<FirstPage/>:null}
                >
                  library
                </FlatButton>
              :null}
          </div>
        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'
          style={{'display':'table', 'textAlign':'center', 'padding':'0px', 'height':'60px', left:'-25px'}}>
            <span className="title" style={{'fontSize':'18px', 'marginLeft':'15px'}}>
            <a href="https://dynamobim.org/" target="_blank" rel="noopener noreferrer" style={{'display':'table-cell', 'width':'35px'}}>
            <img src="images/src/icon.png" width="80%" id='dynamologo' alt="dynamoIcon" target="_blank" rel="noopener noreferrer" style={{"verticalAlign":"middle", "marginLeft":"0px", "marginTop":"-2px"}} />
            </a>
            <Link to='/' className='raleway' style={{'color':'white'}}>&nbsp; Dynamo Dictionary</Link>
            <a href='https://dictionary.dynamobim.com/' className='raleway' style={{'color':'orangered'}}>&nbsp; 1.x</a>
            <a href='https://dictionary.dynamobim.com/2' className='raleway' style={{'color':'orangered'}}>&nbsp; 2.x</a>
            </span>
        </div>
        {
        //TODO : Hiding the Submit PR button, as the feature is not fuctional with the latest node update. This is a temporary change and will be re-visited/fixed in the future version.
        /* <div  className='graytext'  style={{'position':'absolute', 'right':'0', 'top':'0','paddingRight':'10px'}}>
          {props.phase==='committing' ? <a href={props.link} target="_blank" rel="noopener noreferrer">
            <FlatButton label={'github'} labelPosition="after"
              labelStyle={{color:'white', fontWeight:100, fontFamily:"'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize:12}}
              style={{color:'white'}}
              onClick={props.openModal} icon={<img src="images/icons/octocat.png" id='prLogo' width='18px' alt="prIcon"/>}
              backgroundColor='rgb(34,34,34)'
            />
            </a>
            :null
           }
          <FlatButton label={props.phase==='init'?'Submit PR':'Add Commit'} labelPosition="after"
            labelStyle={{color:'white', fontWeight:100, fontFamily:"'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize:12}}
            style={{color:'white'}}
            onClick={props.openModal} icon={<img src="images/icons/pr_invert.png" id='prLogo' width='16px' alt="pr"/>}
            backgroundColor='rgb(34,34,34)'
          />


    </div> */}
  </div>

  )
}

export default Header;
