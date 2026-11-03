---
title: DevOps Bootcamp Final Project
summary: A multi-service e-commerce app needed a repeatable way to ship to dev, UAT and prod, and a way to watch it run.
type: bootcamp
org: Dibimbing
role: Student, DevOps Engineer Bootcamp
period: '{{TODO: bootcamp dates}}'
status: 'Bootcamp capstone {{TODO: confirm final outcome}}'
order: 4
featured: true
# {{TODO: confirm stack tags, especially GitLab CI}}
stack: [Docker, Kubernetes, GitLab CI, Kustomize, SonarQube, Traefik, Prometheus, Grafana, MySQL]
diagram: src/assets/diagrams/devops-bootcamp-final-project.svg
draft: false
---

## Background

The bootcamp asked for a delivery system built from scratch for a multi-service app. I chose E-Commerce because another project I was working on was still a monolith {{TODO: name that project}} with few DevOps practices. I wanted to practise automated deployment, containers and infrastructure management, then take them back to it.

## Challenge

One reusable pipeline for every service, a Dockerfile per service, Kubernetes manifests for dev, uat and prod in separate namespaces, a manageable GitOps layout, and Grafana dashboards, with the architecture and docs written before deploying.

## Approach

### How it went

<!-- {{TODO: confirm order of steps, and any problems I hit along the way}} -->

1. I mapped the app: six services (api-auth, api-catalog, api-transaction, api-flashsale, api-payment, portal-mobile) with MySQL.
2. I wrote reusable stages (code scan, build, push, deploy) as templates in one `general-pipeline` repo with a single `deploy.sh`, deriving environment and namespace from the branch name. {{TODO: confirm how deploy.sh applies the overlay}}
3. A merge to `dev` runs a SonarQube scan, builds an image tagged with the commit SHA, pushes it and deploys to dev, and `uat` works the same way.
4. On `main`, a manual release job tags the release, retags the image and deploys to prod, with a rollback path. {{TODO: confirm the image is retagged, not rebuilt}}
5. In one `gitops-ecm` repo, each service has a Kustomize base (deployment, service, configmap) and dev, uat and prod overlays, one namespace each, with an HPA (2 to 5) only in prod.
6. I put Traefik ingress in front of the portal, the five APIs and MySQL.
7. I wired Prometheus (cAdvisor and node-exporter) into Grafana for memory and CPU per pod, CPU request versus usage, and pod count per namespace. {{TODO: confirm whether dashboards cover transactions, traffic and errors}}

### Key decisions

- **One shared pipeline over copies per service.** A fix lands once for all six. _Trade-off:_ a template change reaches every service at once.
- **Kustomize base plus overlays.** Each service is defined once and differs by environment only where needed. _Trade-off:_ more files to navigate.
- **Build once, promote by retag.** Prod runs the image that passed earlier stages. _Trade-off:_ the release depends on that tagged image still existing.
- **Branch name decides the environment.** No per-service config for it. _Trade-off:_ branch naming becomes strict.

## Outcome

{{TODO: final outcome}}

### What I learned

- {{TODO: what I learned}}

### What I'd do next

- Pin versions of the pipeline templates.
- Add traffic and error panels, and alerts.
- Try a GitOps controller, Argo CD or Flux.
