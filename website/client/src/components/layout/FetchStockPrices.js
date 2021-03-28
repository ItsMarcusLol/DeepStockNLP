// // import React from "react";
// // import PropTypes from 'prop-types';
// // import clsx from 'clsx';
// // import { withStyles } from '@material-ui/core/styles';
// // import TableCell from '@material-ui/core/TableCell';
// // import Paper from '@material-ui/core/Paper';
// // import { AutoSizer, Column, Table } from 'react-virtualized';

// import React from 'react'
// import Ticker from 'react-ticker'
// // import PageVisibility from 'react-page-visibility'

// // import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { withStyles } from '@material-ui/core/styles';

// import LoadingSymbol from './LoadingSymbol';
  
// const styles = ((theme) => ({
//             root: {
                
//               width: '100%',
//               '& > * + *': {
//                 marginTop: theme.spacing(20),
//               },
//             },
//           }));


//     class FetchStockPrices extends React.Component {
        
//         state = {
//             loading: true, 
//             prices: null
//         };
    
        
//         async componentDidMount() {
            

//             const url = "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=f0448bd30a7028e245052fcf3caa0837";
//             const response = await fetch(url);
//             const data = await response.json();
            
            
//             this.setState({ prices: data, loading: false});
//             // this.setState({ prices: null, loading: false});

//         }


//         constructor(props){
//             super(props)
//             this.state={
//                 fontSize:35
//             }
//          }
//          changeSize(event){
//           this.setState({
//               fontSize:event.target.value
//           });
//         }

            
        

        
    
//         render() {
//             const {classes} = this.props;
            
//             if (this.state.loading){
//                 // return <div>loading...</div>
//                 return <LoadingSymbol />
//             //    return <div >
//             //      <LinearProgress />
//             //      <LinearProgress color="secondary" />
//             //     </div>
                
//             }
    
//             if (!this.state.prices){
//                 return <div style={{fontSize:"35px"}}>Can't get prices, right now. Check in later!</div>
                  
//             }
            
//             return (
//                <Ticker className={classes.root}>
//                {({ index }) => (
//                    <>
//                        {/* <h1>This is the Headline of element #{index}!</h1> */}
//                        {/* <h1><h1> {this.state.prices[index].symbol}:{this.state.prices[index].price }, </h1></h1> */}

//                        {/* What if we make the prices alternate color (green/red) as to reflect the market */}
//                          <h2 className="tryout" style={{fontSize:this.state.fontSize+'px', color:"green", color:"red"}}> 
//                             {this.state.prices[index].symbol}:{this.state.prices[index].price}<span> &nbsp; </span>
//                          </h2>
//                          {/* <input value={this.state.fontSize} onChange={this.changeSize.bind(this)} /> */}
                      
//                        <img src="www.my-image-source.com/" alt=""/>
//                    </>
//                )}
//             </Ticker>
           
//             );
//                }
               
    
// }

// export default withStyles(styles, )(FetchStockPrices);

import React, { useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
// import AppBar from '@material-ui/core/AppBar';
 
const MoveStuffAround = () => {
  const [pageIsVisible, setPageIsVisible] = useState(true)
 
  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible)
  }
 
  return (
      <div>
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        
        <Ticker>
          {({ index }) => (
              <>
                  <h1 style={{fontSize:"35px", color:"green"}}>This is the Headline of element #{index}!</h1>
                  <img src="www.my-image-source.com/" alt=""/>
              </>
          )}
        </Ticker>
      
      )}
    </PageVisibility>
    </div>
  )
}
 
export default MoveStuffAround