# Use LTS version of node
FROM node:carbon@sha256:38953a117b8f794426429314126af19ff17bbfaa5449c1829b9a8412b8ef4536

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
