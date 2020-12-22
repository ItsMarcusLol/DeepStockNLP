## AI4Twitter

# Prerequisites
The code has been tested on Mac with M1 chip, but it should work on any Linux System
Python 3.8.5, but should work with any python3+
Sklearn
scipy
pickle
numpy
matplotlib

# Installation
Most of the python packages can be installed by pip install *, you can have Anaconda for those

# Usage
There are two main scripts in script directory: GenerateFeatures.py to generate features from the training data, which is included in the data directory; TrainAI.py to train different machine learning models.
You will see examples about how to run those code if you run itm, like python GenerateFeatures.py

# To do list
1. We still need a script to load the AI model and some tweets for making predictions.
2. Right now we didn't utilize all features for filtering the tweets, maybe we can consider the spam word list:  https://www.activecampaign.com/blog/spam-words ?
3. I don't know what kind of data we have saved for now, so maybe there are other features we can generate
4. We could improve the performance of AI model, but we need more data
5. I haven't tried  the deep learning technique, maybe we should explore that.
