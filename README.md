## Prerequisites

| Option            | What you need                                 |
| ----------------- | --------------------------------------------- |
| **Local run**     | Node ≥ 18 and either `npm`, `yarn`, or `pnpm` |
| **Container run** | Docker Desktop or Docker Engine (Compose v2)  |

---

## 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/debugging-signals-demo.git
cd debugging-signals-demo
```

---

## 2 A. Local run (fastest for screenshots)

```bash
# install deps
npm install            # or: pnpm install  |  yarn install

# start with source‑map + pretty logs
npm run dev            # maps TS ↔ JS and uses pino‑pretty
```

You’ll see:

```
[INFO] API listening on :3000
[INFO] Metrics on :9100
```

### Endpoints to hit

| URL                                 | Purpose                                               |
| ----------------------------------- | ----------------------------------------------------- |
| `http://localhost:3000/sync-error`  | Throws a sync error (full stack trace)                |
| `http://localhost:3000/async-error` | Async error that shows an async stack trace           |
| `http://localhost:3000/memory`      | Grows heap a little each hit (simulated leak)         |
| `http://localhost:9100/metrics`     | Prometheus‑style metrics (heap bytes, event‑loop lag) |

> **Screenshot ideas**
> • Terminal after hitting `/sync-error` → label the stack frames
> • `curl localhost:9100/metrics` after spamming `/memory` → show heap\_used\_bytes climbing

Stop with `Ctrl‑C`.

---

## 2 B. Docker Compose run (no local Node)

```bash
docker compose up --build
```

* API on :3000
* Metrics on :9100
* Same routes as above.

Tear down with `docker compose down`.

---


