FROM node:20-bullseye

# Bibliotecas do Chromium (Playwright)
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instala dependências sem exigir package-lock
COPY package.json ./
RUN npm install --omit=dev

# Instala Chromium do Playwright
RUN npx playwright install chromium

# Copia o restante do projeto
COPY . .

ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

EXPOSE 8080
CMD ["npm","start"]
