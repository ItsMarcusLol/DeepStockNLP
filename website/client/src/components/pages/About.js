import React from 'react'

function About() {
    return (
        <div>
            <h1>
                About
            </h1>
            <p>
                DeepStockNLP is a capstone project that was created by four seniors from Pacific Lutheran University. 
                We use natural language processing techniques to try to make as accurate predictions on the 9 stocks we
                chose. We are doing this by using headlines from the New York Times as well as tweets from Twitter 
                to make train our model to make the predictions better and more accurate. We are also getting headlines
                from Twitter that are more business or financially driven headlines. The model we decided to use for
                this project was XG Boost with Sentiment Analysis. Right now we are testing our model with archived 
                news headlines from New York Times and prices we got from Yahoo Finance. Our current accuracy results
                for predictions were aroudn a 63%. We haven't added in the tweets we got from Twitter yet. In the future 
                we are working towards adding the tweets to our model to try to get a more accurate result.
            </p>
            <h2>
                XG Boost
            </h2>
            <p>
                <a href="https://xgboost.readthedocs.io/en/latest/"> XG Boost </a>is an open-source software that uses a gradient boosting library that's meant to be highly efficient, flexible, and portable.
                It implements machine learning algorithms from the Gradient Boosting framework and provides a parallel tree 
                boosting that can solve many data science problems in a fast and accurate way. 
            </p>
            <h2>
                Sentiment Analysis
            </h2>
            <p>
                Sentiment Analysis is also known as opinion mining and is a natural language processing technique that's used
                to determine if the data that's inputed is positive, negative, or neutral. It's often used by businesses to determine
                and analyze whether customer feedback was positive or negative. In our project we used sentiment analysis to see
                whether or not the headline data we had were positive or negative. 
            </p>
            <h2>
                Ethics
            </h2>
            <p>
                The accuracy of the predictions of the stock prices are based on our own model and data. We attained the data in a safe and legal way.
                More to come....
            </p>
        </div>
    );
}


export default About;