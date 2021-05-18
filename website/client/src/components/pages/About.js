import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

/**
 * Creates the about page for the website.
 * Contains what the project is about,
 * the tools we used in our model,
 * and a disclaimer for the users.
 */
function About() {
    return (
            <Grid container spacing = {2}
            direction="row"
            justify="space-evenly"
            alignItems="center">

            <Grid item = {12} sm={12} md={6}>
            </Grid>

            <Grid item xs={12}>
            <h1 style={title}>
                About
            </h1>
            <p style={paragraphStyle}>
                DeepStock is a capstone project that was created by four seniors from Pacific Lutheran University with the help of a faculty advisor. 
                We use natural language processing techniques to try to make as accurate predictions as we can on the 9 stocks we
                chose. We are doing this by using headlines from the New York Times as well as tweets from Twitter 
                to train our model to make the predictions better and more accurate. We are also getting headlines
                from Twitter that are more business or financially driven headlines. The model we decided to use for
                this project was XG Boost with Sentiment Analysis (which will be credited to the rightful owners and explained below). Right now we are testing our model with archived 
                news headlines from New York Times and prices we got from Yahoo Finance. Our current accuracy results
                for predictions were around a range of 62%-67%. We haven't added in the tweets we got from Twitter yet. In the future 
                we are working towards adding the tweets to our model to try to get a more accurate result.
                <br/> 
                <br/>
                Our website was designed using React and on our website we plan to have many features that we think will prove useful to our users. We will work hard 
                to implement as many features as we can in the time that we have to work on this project to try to make it the best it can be. Some features will only be 
                accessible to users with an account. To get started please  
                <Link to="/signup" style={{color: '#71FF00'}}>
                  {" create an account "}
                </Link>
                or 
                <Link to="/login" style={{color: '#71FF00'}}>
                    {" login "}
                </Link>
                to access more features.
            </p>
            </Grid>

            <Grid item = {12} sm={12} md={6}>
            </Grid>

            <Grid item = {12} sm={12}>
                <h2 style={headerStyle2}>
                    Tools Used In Our Model:
                </h2>
            </Grid>

            <Grid item xs ={6}>
            <h2 style={headerStyle}>
                XG Boost
            </h2>
            <p style={paragraphStyle}>
                <a href="https://xgboost.readthedocs.io/en/latest/" style={{color:'#71FF00', fontStyle:"italic"}}>XG Boost</a> is an open-source software that uses a gradient boosting library that's meant to be highly efficient, flexible, and portable.
                It implements machine learning algorithms from the Gradient Boosting framework and provides a parallel tree 
                boosting that can solve many data science problems in a fast and accurate way. 
            </p>
            </Grid>

            <Grid item xs={6}>
            <h1 style={headerStyle}>
                Sentiment Analysis
            </h1>
            <p style={paragraphStyle}>
                <a href="https://monkeylearn.com/sentiment-analysis/" style={{color:'#71FF00', fontStyle:"italic"}}>Sentiment Analysis</a> is also known as opinion mining and is a natural language processing technique that's used
                to determine if the data that's inputed is positive, negative, or neutral. It's often used by businesses to determine
                and analyze whether customer feedback was positive or negative. In our project we used sentiment analysis to see
                whether or not the headline data we had were positive or negative. 
            </p>
            </Grid>

            <Grid item = {12} sm={12} md={6}>
                <br/>
            </Grid>

            <Grid item={12}>
            <h1 style={headerStyleBlack}>
                Disclaimer
            </h1>
            <p style={paragraphStyleBlack}>
                Our predictions are not 100% accurate and we are not responsible for the results of your portfolio and whether it improves or plummets. We try to make our predictions as accurate 
                as possible, but as of right now our accuracy is only at a 63% and users are free to use our predictions as they best see fit. We hold no responsibilities with how our predictions 
                affect the users and their choice to invest in the stocks we predict.
                <br/>
                <br/>
                We also have no connection or affiliation with any of the company's stocks that we chose to predict. We chose those stocks at random and because they seemed like the most relevant companies during the time
                of our project. We do our best to predict each stock but we have no insider trading going on with any of the companies. Our predicitons are honest and true and, although not 100% accurate, it's
                as accurate as we can get it at the moment. It's not skewed or bias towards any one company.
                <br/>
                <br/>
                We acknowledge and give all the rights to the creaters of XG Boost and Sentiment Analysis. We are very grateful we get to use
                these features in our project to help us and make our project better. We own no rights to either of the tools listed above.
            </p>
            </Grid>

            <br/>
        </Grid>
    );
}

const headerStyle = {
    color: 'white',
    fontFamily: '-moz-initial',
    textAlign: 'center',
    fontSize: '37px'
}

const headerStyle2 = {
    color: 'white',
    fontFamily: '-moz-initial',
    textAlign: 'center',
    fontSize: '33px',
    textDecorationLine: 'underline'
}

const paragraphStyle = {
    color: 'white',
    fontFamily: 'inherit',
    fontSize: '20px'
}

const headerStyleBlack = {
    color: 'black',
    fontFamily: '-moz-initial',
    textAlign: 'center',
    fontSize: '37px',
    textDecorationLine: 'underline'
}

const paragraphStyleBlack = {
    color: 'black',
    fontFamily: 'inherit',
    fontSize: '20px'
}

const title = {
    color: 'white',
    fontFamily: '-moz-initial',
    textAlign: 'center',
    fontSize: '52px'
}

export default About;