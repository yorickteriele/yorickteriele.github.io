# Build context is the repo root so the shared service list can be copied in.
FROM node:22-alpine
WORKDIR /app
COPY status-monitor/server.mjs ./
COPY src/data/status-services.json ./
RUN mkdir /data && chown node:node /data
ENV DATA_DIR=/data PORT=3000
VOLUME /data
EXPOSE 3000
USER node
CMD ["node", "server.mjs"]
