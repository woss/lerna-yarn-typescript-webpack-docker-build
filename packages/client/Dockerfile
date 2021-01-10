# use the built image as a builder, it contains all the code. keep this safe
FROM main:latest as builder

RUN yarn lerna run build --scope=@app/client

# main image
#Run Stage Start
FROM nginx

#Copy production build files from builder phase to nginx
COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
