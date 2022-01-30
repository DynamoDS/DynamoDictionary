import React from 'react';

function Home(props){
  return(
    <div className='col-md-12' style={{'padding':'20%', 'paddingTop':'20px'}}>
        <h1 className='raleway'>The Dynamo Dictionary</h1>
        <hr/>
        <p className="graytextlg" style={{"color":"lightgray"}}>Welcome to the Dynamo Dictionary, a searchable database for Dynamo functionality. Here you can find explanations for nodes, sample files, and links to more information on associated workflows. This site is constantly evolving as the community continues to add more information. Like the 
          <a href="https://dynamoprimer.com/" target="_blank" rel="noopener noreferrer" style={{'color':'orangered'}}> Dynamo Primer</a>, 
          this dictionary is open-source - check it out on our 
          <a href="https://github.com/DynamoDS/DynamoDictionary" target="_blank" rel="noopener noreferrer" style={{'color':'orangered'}} > Github page </a> 
          and contribute!</p>
        <hr />
        <br/>
        <h1 className="raleway" style={{"color":"lightgray"}}>Editing this Dictionary</h1>
        <hr/>
        <br/>
        <p className="graytext" style={{"color":"lightgray"}}>We've added functionality to update the repository from this webpage. Click on edit icons on node pages and add your own <span style={{"color":"white"}}>in-depth description</span>, update <span style={{"color":"lightgray"}}>examples files and images</span>, or <span style={{"color":"lightgray"}}>add your own.</span>
            <br/> </p><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em',"color":"lightgray"}}>After making your updates, remember to click the <span style={{"color":"lightgray"}}>"Submit Pull Request"</span> icon in the top right of the page. This will allow you to open a pull request on Github without having to login. </li><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em',"color":"lightgray"}}>The <span style={{"color":"lightgray"}}>Pull Request</span> will be opened on the Github repo. After we've reviewed it and are ready to accept the changes, we'll <span style={{"color":"white"}}>merge</span> the new content onto the live site.</li><br/>
        <li className="graytext" style={{'textIndent':'-2em','marginLeft':'2em',"color":"lightgray"}}> Because of the review period, you may have to wait a few days for the Pull request to go through. If you have any issues, please dont hesitate to log them <a href="https://github.com/DynamoDS/DynamoDictionary/issues" target="_blank" rel="noopener noreferrer" style={{'color':'orangered'}}>here.</a></li>
        <br />
        <hr />
        <br/>
        <div className='iconSpread'>
            <div className='imgHL col-md-3 col-xs-6'>
                <div className='imgbutton'>
                    <a href='https://dynamobim.org/' target='_blank' rel="noopener noreferrer"><img alt='dynamo bim' src='images/home/dynamobim.jpg' width='100%' /> </a>
                </div>
                <div className='text_over_imageL'><a href='https://dynamobim.org/' target='_blank' rel="noopener noreferrer">Community</a></div>
            </div>
            <div className='imgHL col-md-3 col-xs-6'>
                <div className='imgbutton'>
                    <a href='https://www.autodesk.com/products/dynamo-studio/overview' target='_blank' rel="noopener noreferrer"><img alt='dynamo studio' src='images/home/dynamostudio.jpg' width='100%' className='imgbutton' /> </a>
                </div>
                <div className='text_over_imageR'><a href='https://www.autodesk.com/products/dynamo-studio/overview' target='_blank' rel="noopener noreferrer">Product</a></div>
            </div>
            <div className='imgHL col-md-3 col-xs-6'>
                <div className='imgbutton'>
                    <a href='httsp://dynamoprimer.com/' target='_blank' rel="noopener noreferrer"><img alt='dynamo primer' src='images/home/dynamoprimer.jpg' width='100%' /></a>
                </div>
                <div className='text_over_imageL'> <a href='https://dynamoprimer.com/' target='_blank' rel="noopener noreferrer">Learning</a></div>
            </div>
            <div className='imgHL col-md-3 col-xs-6'>
                <div className='imgbutton'>
                    <a href='https://github.com/DynamoDS/Dynamo' target='_blank' rel="noopener noreferrer"><img alt='dynamo github' src='images/home/dynamogithub.jpg' width='100%' /></a>
                </div>
                <div className='text_over_imageR'><a href='https://github.com/DynamoDS/Dynamo' target='_blank' rel="noopener noreferrer">Development</a></div>
            </div>
        </div>
      </div>
  );
}

export default Home;
