# 1. Configuration & Secrets Management

## Table of Contents

- [1.1 ConfigMaps](#11-configmaps)
- [1.2 Secrets](#12-secrets)

---


## 1.1 ConfigMaps

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  # Simple key-value
  DATABASE_HOST: "postgres.production.svc.cluster.local"
  LOG_LEVEL: "info"
  
  # Entire file
  app.properties: |
    server.port=8080
    server.timeout=30s
    feature.new-ui=true
    cache.ttl=300

  nginx.conf: |
    server {
      listen 80;
      location / {
        proxy_pass http://localhost:8080;
      }
    }
```

```yaml
# Consuming ConfigMaps
spec:
  containers:
    - name: app
      image: myapp:v1
      
      # As environment variables
      envFrom:
        - configMapRef:
            name: app-config
      
      # Selective env vars
      env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: DATABASE_HOST
      
      # As mounted files
      volumeMounts:
        - name: config-volume
          mountPath: /etc/app
          readOnly: true
  
  volumes:
    - name: config-volume
      configMap:
        name: app-config
```

**Key insight:** ConfigMap volume mounts are **updated automatically** (every kubelet sync period ~60s). Environment variables are **NOT** updated — they require a pod restart.

## 1.2 Secrets

```yaml
# Create secrets imperatively
# kubectl create secret generic db-creds \
#   --from-literal=username=admin \
#   --from-literal=password='S3cur3P@ss!'

apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
# Values must be base64 encoded
data:
  username: YWRtaW4=
  password: UzNjdXIzUEBzcyE=

# Or use stringData (auto-encoded)
stringData:
  connection-string: "postgresql://admin:S3cur3P@ss!@db:5432/mydb"

---
# TLS Secret
apiVersion: v1
kind: Secret
metadata:
  name: tls-cert
type: kubernetes.io/tls
data:
  tls.crt: <base64-encoded-cert>
  tls.key: <base64-encoded-key>

---
# Docker registry credentials
apiVersion: v1
kind: Secret
metadata:
  name: registry-creds
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <base64-encoded-docker-config>
```

**Principal-level security note:** Kubernetes Secrets are base64 encoded, **NOT encrypted** by default. For production:
- Enable **encryption at rest** in etcd (`EncryptionConfiguration`)
- Use external secret managers (Vault, AWS Secrets Manager) with the **External Secrets Operator** or **Sealed Secrets**
- Apply RBAC to restrict Secret access
- Consider **CSI Secret Store Driver** for zero-copy secrets

```yaml
# EncryptionConfiguration for etcd
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-32-byte-key>
      - identity: {}   # Fallback for reading old unencrypted secrets
```
