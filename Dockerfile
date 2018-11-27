# Use LTS version of node
FROM node:carbon@sha256:3ecf259bf23f8a75555cf0b92ac5ad3c746e7e2262e937a9bed9ca1685f8e1c7

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
