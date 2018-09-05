# Use LTS version of node
FROM node:carbon@sha256:0accccfd7a8e9074d44a862e06d63e69836a1f41ec77329bb3eb1dae2536a449

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
