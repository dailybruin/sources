# Use LTS version of node
FROM node:carbon@sha256:321655aeb195b7946e9a29d28453388751389e8ced66b4dea772ae76a6985309

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
