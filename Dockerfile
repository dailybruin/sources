# Use LTS version of node
FROM node:carbon@sha256:1d33c01da62a9b998147bc2d19411cd690171d599acbdb0beca5ebc462d45915

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
