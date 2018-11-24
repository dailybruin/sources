# Use LTS version of node
FROM node:carbon@sha256:06c7033a274aab131b07e7b8da8d1f823ee752a6e1e2bd46c0b459921ab2c39a

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

EXPOSE 3000

CMD yarn start
