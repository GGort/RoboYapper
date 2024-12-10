# Dockerfile
FROM node:20-bookworm AS base
LABEL authors="GGort"

# Change our current working directory
WORKDIR /usr/src/app

COPY ./frontend/package.json package.json
COPY ./frontend/yarn.lock yarn.lock
RUN yarn

# Copy over rest of the project files
COPY ./frontend ./
# Symbolic link is ignored (.dockerignore)
COPY ./database_src ./src/lib/database_src


# Expose port 3000 for the SvelteKit app and 24678 for Vite's HMR
EXPOSE 3000

FROM base AS dev
EXPOSE 24678
# Set the Node environment to development to ensure all packages are installed
ENV NODE_ENV development

# Run `yarn dev` and set the host to 0.0.0.0 so we can access the web app from outside
CMD ["yarn", "dev", "--host", "--port", "3000"]

FROM base AS prod

# build for production
RUN yarn build && rm -rf src

# Set Starting command
CMD ["node", "./build/index.js"]

