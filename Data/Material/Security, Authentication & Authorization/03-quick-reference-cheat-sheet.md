# Quick Reference Cheat Sheet

## Table of Contents

- [Authentication & Authorization Decision Matrix](#authentication-and-authorization-decision-matrix)
- [Security Headers Checklist](#security-headers-checklist)
- [Security Anti-Patterns](#security-anti-patterns)


## Authentication & Authorization Decision Matrix

```mermaid
flowchart TD
    START["What are you building?"]

    TRAD["Traditional Web App<br/>(server-rendered)"]
    SPA["Single Page App (SPA)"]
    MOB["Mobile App"]
    M2M["Service-to-Service"]
    MICRO["Microservices"]

    START --> TRAD
    START --> SPA
    START --> MOB
    START --> M2M
    START --> MICRO

    TRAD --> T1["Session-based auth<br/>HttpOnly cookies<br/>CSRF protection<br/>Server-side rendering"]

    SPA --> S1["OAuth 2.0 + PKCE<br/>BFF Pattern preferred<br/>HttpOnly cookies (via BFF)<br/>or short-lived JWTs"]

    MOB --> MO1["OAuth 2.0 + PKCE<br/>Secure device storage<br/>Refresh token rotation<br/>Biometric unlock"]

    M2M --> M1["Client Credentials Flow<br/>Short-lived access tokens<br/>Secrets in vault<br/>mTLS for extra security"]

    MICRO --> MI1["JWT between services<br/>Token issued by gateway<br/>Service mesh (mTLS)<br/>Short TTLs"]

    style START fill:#264653,color:#fff
    style T1 fill:#2a9d8f,color:#fff
    style S1 fill:#2a9d8f,color:#fff
    style MO1 fill:#2a9d8f,color:#fff
    style M1 fill:#2a9d8f,color:#fff
    style MI1 fill:#2a9d8f,color:#fff
```

## Security Headers Checklist

```
# Add ALL of these to your HTTP responses:

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; object-src 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cache-Control: no-store (for sensitive pages)
```

## Security Anti-Patterns

```
⛔ Storing passwords in plaintext or with reversible encryption
⛔ Using MD5 or SHA-1/SHA-256 for password hashing
⛔ Storing JWTs in LocalStorage
⛔ Using alg: "none" in JWTs
⛔ Reflecting user input without encoding
⛔ Building SQL queries with string concatenation
⛔ Setting Access-Control-Allow-Origin: *  with credentials
⛔ Long-lived JWTs with no revocation strategy
⛔ Client-side only authorization checks
⛔ Hardcoding secrets in source code
⛔ Trusting the Origin/Referer header without validation
⛔ Using HTTP in production (always use HTTPS/TLS)
```

---

