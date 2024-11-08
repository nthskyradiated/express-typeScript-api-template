# Step 1: Use Node.js as the base image
FROM node:22-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Step 2: Install pnpm globally
RUN npm install -g pnpm

# Step 3: Set the working directory in the container
WORKDIR /usr/src/app

# Step 4: Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Step 5: Install the dependencies using pnpm
RUN pnpm install

# Step 6: Copy the rest of the application code
COPY . .

# Step 7: Install TypeScript and compile the TypeScript files
RUN pnpm add -g typescript
RUN tsc

# Step 8: Expose the port the app runs on (adjust if different)
EXPOSE 8080

# Step 9: Start the application
CMD ["node", "src/index.js"]
