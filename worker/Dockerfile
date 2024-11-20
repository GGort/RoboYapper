FROM node:20-bookworm AS base
LABEL authors="GGort"

# Change our current working directory
WORKDIR /usr/src/app

COPY ./worker/package.json package.json
COPY ./worker/yarn.lock yarn.lock
RUN corepack enable && yarn

# Copy over rest of the project files
COPY ./worker ./
# Symbolic link is ignored (.dockerignore)
COPY ./database_src ./src/database_src


FROM base AS dev
EXPOSE 24678
# Set the Node environment to development to ensure all packages are installed
ENV NODE_ENV development

# Run `yarn dev`
CMD ["yarn", "dev"]

FROM base AS prod
#RUN yarn build

#TODO add production builded version
