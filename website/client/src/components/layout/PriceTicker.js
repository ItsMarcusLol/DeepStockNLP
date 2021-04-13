import React from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import LoadingSymbol from './LoadingSymbol';
  
    class PriceTicker extends React.Component {
        
        // state = {
        //     loading: true, 
        //     prices: null
        // };
        constructor(props) {
          super(props);
          this.state = {
            loading: false, 
            prices: null,
            pageIsVisible: true
          
          };
      
         this.setPageIsVisible = this.setPageIsVisible.bind(this);
        }
       
        async componentDidMount() {
          const url = "https://financialmodelingprep.com/api/v3/quotes/nyse?apikey=f0448bd30a7028e245052fcf3caa0837";
          const response = await fetch(url);
          const data = await response.json();
          this.setState({ prices: data, loading: false});
          // this.setState({ prices: null, loading: false});

      }
       
        setPageIsVisible(event) {
          this.setState({
            pageIsVisible: event
          });
        }
            
        handleVisibilityChange = (isVisible) => {
          this.setPageIsVisible(isVisible)
        }
       
        render() {
            
            if (this.state.loading){
                
                return <LoadingSymbol />
              
            }
    
            if (!this.state.prices){
                return <div style={{fontSize:"35px"}}>Can't get prices, right now. Check in later!</div>
                
                  
            }
            
            return (
             
                    <div >
                  <PageVisibility onChange={this.handleVisibilityChange}>
                    {this.state.pageIsVisible && (
                      
                      <Ticker>
                        {({ index }) => (
                            <>
                                <h1 style={{fontSize:"35px", color:"white"}}>{  this.state.prices[index].symbol}:{this.state.prices[index].price }<span> &nbsp; </span></h1>
                                <img src="www.my-image-source.com/" alt=""/>
                            </>
                        )}
                      </Ticker>
                    
                    )}
                  </PageVisibility>
                  </div>
            );
          }
               
}

export default PriceTicker;