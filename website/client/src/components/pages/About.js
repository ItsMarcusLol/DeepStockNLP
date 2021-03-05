import React from 'react'

function About() {
    return (
        <div>
            <h1 style={headerStyle}>
                About
            </h1>
            <p style={paragraphStyle}>
                DeepStockNLP is a capstone project that was created by four seniors from Pacific Lutheran University with the help of a faculty advisor. 
                We use natural language processing techniques to try to make as accurate predictions as we can on the 9 stocks we
                chose. We are doing this by using headlines from the New York Times as well as tweets from Twitter 
                to train our model to make the predictions better and more accurate. We are also getting headlines
                from Twitter that are more business or financially driven headlines. The model we decided to use for
                this project was XG Boost with Sentiment Analysis. Right now we are testing our model with archived 
                news headlines from New York Times and prices we got from Yahoo Finance. Our current accuracy results
                for predictions were around a 63%. We haven't added in the tweets we got from Twitter yet. In the future 
                we are working towards adding the tweets to our model to try to get a more accurate result.
                <br/> 
                <br/>
                Our website was designed using React and on our website we plan to have many features that we think will prove useful to our users. We will work hard 
                to implement as many features as we can in the time that we have to work on this project to try to make it the best it can be.
            </p>

            <h1 style={headerStyle}>
                XG Boost
            </h1>
            <p style={paragraphStyle}>
                <a href="https://xgboost.readthedocs.io/en/latest/" style={{color:'blue', fontStyle:"italic"}}>XG Boost</a> is an open-source software that uses a gradient boosting library that's meant to be highly efficient, flexible, and portable.
                It implements machine learning algorithms from the Gradient Boosting framework and provides a parallel tree 
                boosting that can solve many data science problems in a fast and accurate way. 
            </p>

            <h1 style={headerStyle}>
                Sentiment Analysis
            </h1>
            <p style={paragraphStyle}>
                <a href="https://monkeylearn.com/sentiment-analysis/" style={{color:'blue', fontStyle:"italic"}}>Sentiment Analysis</a> is also known as opinion mining and is a natural language processing technique that's used
                to determine if the data that's inputed is positive, negative, or neutral. It's often used by businesses to determine
                and analyze whether customer feedback was positive or negative. In our project we used sentiment analysis to see
                whether or not the headline data we had were positive or negative. 
            </p>

            <h1 style={headerStyle}>
                Disclaimer
            </h1>
            <p style={paragraphStyle}>
                Our predictions are not 100% accurate and we are not responsible for the results of your portfolio and whether it improves or goes down. We try to make our predictions as accurate 
                as possible, but as of right now our accuracy is only at a 63% and users are free to use our predictions as they best see fit. We hold no responsibilities with how our predictions 
                affect the users and their choice to invest in the stocks we predict. 
                <br/>
                <br/>
                We acknowledge and give all the rights to the creaters of XG Boost and Sentiment Analysis. We are very grateful we get to use
                these features in our project to help us and make our project better. We own no rights to either of the tools listed above.
            </p>
        </div>
    );
}

const headerStyle = {
    color: 'black',
    fontFamily: '-moz-initial',
    textAlign: 'center',
    fontSize: '35px'
}

const paragraphStyle = {
    fontFamily: 'inherit',
    fontSize: '18px'
}


export default About;