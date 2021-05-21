FROM node:15.10.0 as base

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

FROM base as test
RUN npm ci
COPY . .
RUN [ "npm", "run", "test-ci" ]

FROM base as prod
RUN npm ci --production
COPY . .
CMD [ "node", "index.js" ]