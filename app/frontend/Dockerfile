# ---- Build stage ----
FROM node:22-slim AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm i

COPY . .
RUN npx ng build --configuration=production

# ---- Serve stage ----
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular build output: dist/frontend/browser (Angular 19 application builder)
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
