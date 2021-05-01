FROM python:3.8
COPY /src/docker/account/requirements.txt /code/requirements.txt
WORKDIR /code/
RUN pip install -r requirements.txt
COPY /src/resources/AccountDataResource.py /code/
COPY /src/account /code/account
CMD python AccountDataResource.py 5000
CMD python AccountDataResource.py 5001
CMD python AccountDataResource.py 5002 