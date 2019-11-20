# Use LTS version of node
FROM node:carbon@sha256:7b65413af120ec5328077775022c78101f103258a1876ec2f83890bce416e896

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

#RUN yarn --production=false
# If you are building your code for production
RUN npm install --only=production
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g parcel-bundler

# Bundle app source
COPY . .

EXPOSE 3000

CMD npm start
