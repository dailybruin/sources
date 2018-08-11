# Use LTS version of node
FROM node:carbon@sha256:04986974434fc565529feaac1d62cce4f9fe99ba4906f076ce498000120a45d4

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
