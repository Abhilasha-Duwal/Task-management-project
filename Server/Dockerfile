FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only production; \
        fi

COPY . .
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["node", "index.js"]
