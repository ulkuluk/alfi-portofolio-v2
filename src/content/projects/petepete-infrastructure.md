---
title: petepete Infrastructure
summary: A new donation platform for content creators had no infrastructure, no pipeline, and no safe way for a team with changing IP addresses to reach its servers.
type: team
org: petepete
role: Built the infrastructure end to end
period: April – October 2026
status: 'Dev and UAT environments {{TODO: confirm current status}}'
order: 3
featured: true
stack:
  [
    Tencent Cloud,
    Docker Compose,
    Cloudflare Tunnel,
    Cloudflare Access,
    GitLab CI,
    PostgreSQL,
    Next.js,
    .NET,
  ]
diagram: src/assets/diagrams/petepete-infrastructure.svg
draft: false
---

## Background

petepete is a donation platform for content creators, similar to Saweria. I built its infrastructure and deployment pipeline from zero on Tencent Cloud in Jakarta. {{TODO: confirm whether I built it alone or had help}}

## Challenge

Provision the cloud setup and pipeline, keep the database private, and give teammates with dynamic IPs safe access to the servers.

## Approach

### How it went

<!-- {{TODO: confirm order of steps}} -->

1. I started with the network: a VPC with a public subnet for the app server and a private one for the database, where the database security group references the app server's group instead of IPs.
2. I created separate CAM sub-accounts per purpose, one for object-storage uploads under a custom policy and one for text-to-speech.
3. Managed PostgreSQL had no public access in that region, so I kept it private and made the Ubuntu 24.04 VM running Docker and Compose the bastion.
4. SSH by IP allowlist broke because teammates have dynamic IPs, so I moved to Cloudflare Tunnel with Access email policies, gave everyone their own key, and stopped exposing port 22.
5. I deployed the Next.js frontend and .NET backend with Compose, and fixed a backend crash loop, `NEXT_PUBLIC_*` values still pointing at an old local IP, and CORS.
6. I set up GitLab CI for the backend, with a self-hosted runner that SSHes to the VM and runs `docker compose`.
7. I built uploads with presigned URLs, so files go straight to storage and never pass through the app server.
8. I added email OTP through Tencent Cloud SES over SMTP, with MX, SPF, DKIM and DMARC records in Cloudflare DNS, and text-to-speech through its own sub-account.

### Key decisions

- **Security-group references over IPs.** Rules keep working if an address changes. _Trade-off:_ the database is reachable only through the app server.
- **Tunnel plus Access over IP allowlists.** It works with dynamic IPs and keeps port 22 closed. _Trade-off:_ it depends on Cloudflare and the tunnel service staying up.
- **Presigned uploads.** Files skip the app server. _Trade-off:_ the backend holds a scoped credential to sign them.
- **A sub-account per purpose.** A leaked credential reaches less. _Trade-off:_ more accounts to manage.

## Outcome

I built the dev and UAT infrastructure end to end, from network to CI/CD. Making all of it from zero is what I am proudest of. {{TODO: what the team achieved, and scale}}

### What I learned

- Identity-based access fits a team with dynamic IPs better than network addresses.
- `NEXT_PUBLIC_*` values are baked in at build time. {{TODO: confirm lesson}}

### What I'd do next

- Codify the infrastructure with Terraform.
- Add monitoring and alerting.
- Back up the database and test restores.
- Narrow the text-to-speech sub-account's permissions.
- Move application secrets to OpenBao.
- Add CI/CD for the frontend.
