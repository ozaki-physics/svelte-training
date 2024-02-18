FROM node:20

ENV REPOSITORY=svelte-training

WORKDIR /$REPOSITORY
COPY ./app/package.json ./app/package.json
COPY ./app/package-lock.json ./app/package-lock.json
# WORKDIR /$REPOSITORY/app
# RUN npm install

# CMD ["npm", "run", "dev"]
