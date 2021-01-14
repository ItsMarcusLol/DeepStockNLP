// import React from "react";
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { withStyles } from '@material-ui/core/styles';
// import TableCell from '@material-ui/core/TableCell';
// import Paper from '@material-ui/core/Paper';
// import { AutoSizer, Column, Table } from 'react-virtualized';

import React from 'react'
import Ticker from 'react-ticker'
// import PageVisibility from 'react-page-visibility'




    export default class FetchStockPrices extends React.Component {
        state = {
            loading: true, 
            prices: null
        };
    
        async componentDidMount() {
            const url = "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=f0448bd30a7028e245052fcf3caa0837";
            const response = await fetch(url);
            const data = await response.json();
            this.setState({ prices: data, loading: false});
            // this.setState({ prices: null, loading: false});

        }

        constructor(props){
            super(props)
            this.state={
                fontSize:40
            }
         }
         changeSize(event){
          this.setState({
              fontSize:event.target.value
          });
        }
            
    
    
        render() {
            if (this.state.loading){
                return <div>loading...</div>
                
            }
    
            if (!this.state.prices){
                return <div>Can't get prices, right now. Check in later!</div>
            }
            
            
            return (
               <Ticker>
               {({ index }) => (
                   <>
                       {/* <h1>This is the Headline of element #{index}!</h1> */}
                       {/* <h1><h1> {this.state.prices[index].symbol}:{this.state.prices[index].price }, </h1></h1> */}
                         <h2 className="tryout" style={{fontSize:this.state.fontSize+'px'}}> {this.state.prices[index].symbol}:{this.state.prices[index].price }<span> &nbsp; </span></h2>
                         {/* <input value={this.state.fontSize} onChange={this.changeSize.bind(this)} /> */}
                      
                       <img src="www.my-image-source.com/" alt=""/>
                   </>
               )}
           </Ticker>
           
            );
               }
               
    
}
