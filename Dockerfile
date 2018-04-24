# Use LTS version of node
FROM node:carbon@sha256:26e4c77f9f797c3993780943239fa79419f011dd93ae4e0097089e2145aeaa24

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --production=false
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN yarn start
EXPOSE 3000
