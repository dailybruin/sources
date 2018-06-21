# Use LTS version of node
FROM node:carbon@sha256:6d6c00a85a9859339f38eeace91b1f5554e7c7cf1165d3517cff991bf798ee2f

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
