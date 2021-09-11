FROM node:14-alpine

# Create and set work directory
RUN mkdir -p /mnt
WORKDIR /mnt

# Copy package.json in order
COPY package.json .
RUN npm install --quiet

COPY . .

USER root


EXPOSE 9090





