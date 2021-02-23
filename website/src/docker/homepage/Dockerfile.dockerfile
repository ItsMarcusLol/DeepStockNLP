FROM python:3.8
COPY /src/docker/homepage/requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -r requirements.txt
COPY /src/resources/HomepageResource.py /code/
COPY /src/homepage /code/homepage
CMD python HomepageResource.py