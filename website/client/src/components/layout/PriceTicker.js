import React from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import LoadingSymbol from './LoadingSymbol';
  
    class PriceTicker extends React.Component {
        
        state = {
            loading: true, 
            prices: null
        };
        constructor(props) {
          super(props);
          this.state = {
            loading: false, 
            prices: true,
            pageIsVisible: true
          
          };
      
         this.setPageIsVisible = this.setPageIsVisible.bind(this);
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
                                <h1 style={{fontSize:"35px", color:"green"}}>This is the Headline of element #{index}!</h1>
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






