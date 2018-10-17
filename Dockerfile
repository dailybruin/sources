# Use LTS version of node
FROM node:carbon@sha256:6b2c3d78f4e77fb1ef1e3058affdd1d3ba0b319b5eaf479167672914e555e346

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
