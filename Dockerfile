FROM node:14.15.0
WORKDIR /opt/app
COPY ./ /opt/app
RUN npm config set registry https://registry.npm.taobao.org && npm config ls
RUN npm install
CMD node server.js