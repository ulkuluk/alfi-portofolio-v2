---
title: Image Pull-Cache Mirror
summary: Every node pulled the same images from external registries on its own, which costs avoidable egress and risks registry rate limits.
type: work
short: Spegel
org: Kumparan
role: Site Reliability Engineer
period: August 2026 – present
status: Running in a staging cluster of about 15 nodes
order: 2
featured: true
stack: [Spegel, containerd, Kubernetes, Helm, Prometheus, Grafana]
diagram: src/assets/diagrams/image-pull-cache-mirror.svg
draft: false
---

## Background

Each node runs containerd and pulls images by itself from external registries. Nothing provides a cluster-wide pull cache, so the same image is fetched again and again, and many nodes pulling at once can hit limits such as Docker Hub's.

## Challenge

Cut redundant pulls from nodes in one cluster to external registries, and stay clear of Docker Hub rate limits.

## Approach

### How it went

<!-- {{TODO: confirm order of steps}} -->

1. I chose Spegel, a peer-to-peer mirror running as a DaemonSet, so containerd asks the local Spegel first, then peer nodes, and only then the upstream registry.
2. I installed it with Helm and listed the mirrored registries, public and private, in `values.yaml`, with a ServiceMonitor and Grafana dashboard enabled.
3. I set containerd's `config_path` to `/etc/containerd/certs.d`, so it reads the `hosts.toml` mirror config Spegel writes.
4. I set `discard_unpacked_layers = false`, because otherwise containerd drops the layers Spegel needs to serve to other nodes.
5. I read Spegel's raw `/metrics` endpoint to pick the signals that matter: mirror requests for hit ratio, resolve duration, and advertised image and content digests.
6. I built a Grafana dashboard across three Spegel pods, then checked the debug page, mirror hits in the logs, and the generated containerd config.
7. I ran it in a staging cluster of about 15 nodes and watched the hit ratio for two months.

### Key decisions

- **A P2P DaemonSet over a central pull-through cache.** There is no single point of failure and nothing extra to run. _Trade-off:_ nodes must keep their unpacked layers.
- **Explicit containerd settings.** Each of the two settings has a clear job, so I documented why. _Trade-off:_ the change lives on the node, not only in a Helm value.

## Outcome

Over two months, about 17.5k mirror requests were hits and 33.8k were misses, so roughly a third were served by peer nodes instead of an external registry. That covers Docker Hub, GHCR, and public and private ECR. First-time pulls always miss, so I read the ratio as a baseline, not a target.

### What I learned

- Read the raw metrics before building dashboards; it showed me which signals matter.
- A hit ratio needs context, because a cache's first pull is always a miss.

### What I'd do next

- {{TODO: what I'd do next}}
