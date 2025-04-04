# --- Stage 1: Build ---
FROM node:18-alpine
WORKDIR /app

# Copy package.json để tối ưu cache
COPY /package.json ./
# RUN npm install --only=production
RUN npm install

# Copy toàn bộ code
COPY /src ./src
COPY /server.js ./

# Expose port & Start app
EXPOSE 5000
CMD ["node", "server.js"]
