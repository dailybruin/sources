# Use LTS version of node
FROM node:carbon@sha256:f10c8218e3f92b513af9120f5eda5fed35b651343f940881d696b958cc16ab43

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
