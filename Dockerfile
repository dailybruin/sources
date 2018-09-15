# Use LTS version of node
FROM node:carbon@sha256:d97f5bf54e016ad55dd0475f8710b99be14884ab1afcae8875f8092341264b0c

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
