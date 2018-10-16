# Use LTS version of node
FROM node:carbon@sha256:6945c42812fa1829c1f6fd42351122daec0a566f846615fee30d1be1d56f3be4

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
