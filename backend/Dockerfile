FROM alpine:latest

ARG PB_VERSION=0.24.4

# Instalar dependencias necesarias
RUN apk add --no-cache \
    unzip \
    ca-certificates \
    curl

# Determinar la arquitectura y asignar el valor adecuado a la variable ARCH
RUN ARCH=$(uname -m); \
    case "$ARCH" in \
    x86_64) ARCH="amd64" ;; \
    aarch64) ARCH="arm64" ;; \
    *) echo "Arquitectura no soportada: $ARCH"; exit 1 ;; \
    esac; \
    echo "Descargando PocketBase para la arquitectura: $ARCH"; \
    curl -L -o /tmp/pb.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${ARCH}.zip; \
    unzip /tmp/pb.zip -d /pb/; \
    rm /tmp/pb.zip

# Copiar migraciones y hooks
COPY ./pb_migrations /pb/pb_migrations

# Exponer el puerto 8080
EXPOSE 8080

CMD sh -c "/pb/pocketbase superuser upsert \"$POCKETBASE_ADMIN_EMAIL\" \"$POCKETBASE_ADMIN_PASSWORD\" && /pb/pocketbase serve --http=0.0.0.0:8080"
