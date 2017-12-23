FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]