# Use LTS version of node
FROM node:carbon@sha256:acd0d53169592d955c1a668ba9685bf9cb6a1daf5adba000ad28f35108bf5fde

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
