FROM node:16.18.0-alpine
WORKDIR /opt/app
COPY ./ /opt/app
# RUN npm config set registry https://registry.npm.taobao.org && npm config ls
RUN yarn
CMD node server.js