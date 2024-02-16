FROM node:20

ENV REPOSITORY=svelte-training

WORKDIR /usr/src/$REPOSITORY

CMD ["npm", "run", "dev"]
