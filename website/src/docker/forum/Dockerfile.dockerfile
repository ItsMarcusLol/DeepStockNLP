FROM python:3.8
COPY /src/docker/forum/requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -r requirements.txt
COPY /src/resources/ForumResource.py /code/
COPY /src/forum /code/forum
CMD python ForumResource.py