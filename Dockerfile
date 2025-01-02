# pull official base image
FROM python:3.12.4-slim

# set work directory
WORKDIR /usr/src/onestore_ecommerce

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# install system dependencies
RUN apt-get update && apt-get install -y netcat-openbsd

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/onestore_ecommerce/entrypoint.sh
RUN chmod +x /usr/src/onestore_ecommerce/entrypoint.sh

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/onestore_ecommerce/entrypoint.sh"]
