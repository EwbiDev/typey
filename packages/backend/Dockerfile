FROM node:20-alpine3.19 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter=backend build
RUN pnpm deploy --filter=backend /prod/backend

FROM base AS backend
COPY --from=build /prod/backend/ /prod/backend
WORKDIR /prod/backend
CMD [ "pnpm", "start:prod" ]