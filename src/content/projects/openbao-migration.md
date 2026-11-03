---
title: OpenBao Migration
summary: Vault's licence change raised compliance and vendor-dependency risk, and its access model was getting harder to manage as services and people grew.
type: internship
org: Kumparan
role: DevOps Intern
period: '{{TODO: internship dates}}'
status: In use in production
order: 1
featured: true
stack: [OpenBao, Vault, OIDC, Docker Compose, Kubernetes, External Secrets Operator, Reloader, Bash]
diagram: src/assets/diagrams/openbao-migration.svg
draft: false
---

## Background

HashiCorp moved Vault from MPL 2.0 to BSL 1.1, which raises licensing, compliance and vendor-dependency questions. Vault's IAM and access control also get complicated as services and identities grow.

## Challenge

Reduce licence and vendor risk, and simplify secret management and IAM to cut operational overhead and policy drift, while keeping secrets flowing to Kubernetes workloads.

## Approach

### How it went

<!-- {{TODO: confirm order of steps}} -->

1. I wrote the plan as a TRD and simulated OpenBao locally with Docker Compose, using file storage, persistent volumes for data and audit logs, and the UI on.
2. I compared two migration paths, `operator migrate` (source and destination offline) and reusing the Vault data volume (same storage type only), and found OpenBao starts sealed with only the original unseal key shares working.
3. I set up Google OIDC sign-in, and since the UI in OpenBao 2.6.2 cannot create the required default OIDC role, I created it through the CLI.
4. I built the access model: a read/list policy per team (KV v2 needs `data` and `metadata` paths), a group per team, and one entity per person with an email alias.
5. I connected Kubernetes with External Secrets Operator (ESO) and added Stakater Reloader so workloads restart when a secret changes.
6. I wrote a Bash script that lists KV paths and generates one `ExternalSecret` per path, so nobody keeps a path list by hand.
7. I compared ESO with the existing Vault Synchronizer, which polls about every five minutes, and chose ESO.

### Key decisions

- **Group-based policies, not per-person.** Policies resolve at login through group membership, so there is less drift. _Trade-off:_ more objects to set up per team.
- **ESO over the synchronizer.** Updates take seconds, status is one `kubectl get externalsecret`, and it is not tied to one provider. _Trade-off:_ ESO does not restart workloads, so Reloader is required.
- **A script over hand-written manifests.** New paths are picked up automatically. _Trade-off:_ one more thing to maintain.

## Outcome

A documented migration path, an access model and a Kubernetes sync design, validated locally and now used in production. {{TODO: confirm whether Vault was fully retired or runs alongside}}

### What I learned

- Check what the UI can and cannot do early; the missing OIDC role setup sent me to the CLI.
- A migration can succeed and still leave the service sealed, so the unseal step needs its own plan.

### What I'd do next

- {{TODO: what I'd do next}}
