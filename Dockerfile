# Use the official Node.js image as the base
FROM node:20.14.0-alpine3.19 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the app source code to the container
COPY . .

# Build the Next.js app
RUN yarn build

# Stage 2: Serve the built application using a lightweight Node.js image
FROM node:20.14.0-alpine3.19

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/yarn.lock ./yarn.lock

# Expose the port the app runs on
EXPOSE 3000

# Command to run the Next.js application
CMD ["yarn", "start"]