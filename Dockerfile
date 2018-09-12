# Use LTS version of node
FROM node:carbon@sha256:ea9593713820ae48eca926443d9a408a866e4def37652ac0697cc049bee3c2ee

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
