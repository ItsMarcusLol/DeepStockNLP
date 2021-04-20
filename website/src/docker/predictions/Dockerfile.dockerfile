FROM python:3.8
COPY /src/docker/predictions/requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -r requirements.txt
COPY /src/resources/PrecitionsResource.py /code/
COPY /src/predictions /code/predictions
CMD python PredictionsResource.py