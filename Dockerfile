FROM node:20-alpine3.19 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=frontend --prod /prod/frontend
RUN pnpm deploy --filter=backend --prod /prod/backend

FROM nginx:1.25.4-alpine AS frontend
COPY --from=build /prod/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /prod/frontend/dist /usr/share/nginx/html
EXPOSE 80

FROM base AS backend
COPY --from=build /prod/backend/ /prod/backend
WORKDIR /prod/backend
CMD [ "pnpm", "start:prod" ]