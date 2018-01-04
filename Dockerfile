# Use LTS version of node
FROM node:carbon

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

RUN yarn build
CMD [ "yarn", "start" ]
EXPOSE 3000
