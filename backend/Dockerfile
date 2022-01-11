FROM python:3.9.2-slim

RUN apt-get update && apt install -y libpq-dev gcc && rm -rf /var/lib/{apt,dpkg,cache,log}/

RUN pip install poetry==1.0.0

WORKDIR /app/backend

COPY pyproject.toml pyproject.toml
COPY /scripts /app/backend/scripts

RUN poetry install
RUN poetry add uwsgi

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

COPY . ./app/backend

RUN ls
