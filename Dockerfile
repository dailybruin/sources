# Use LTS version of node
FROM node:carbon@sha256:47a2131abc86d41faa910465b35987bc06b014c335309b551c876e517b5a4402

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
