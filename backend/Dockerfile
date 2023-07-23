FROM python:3.11.1
ENV PYTHONUNBUFFERED 1
WORKDIR /TikoChallenge/backend
ADD . /TikoChallenge/backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
EXPOSE 8000
VOLUME /TikoChallenge/backend