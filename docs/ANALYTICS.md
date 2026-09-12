# Analytics — architecture and health

**Status: BROKEN as of 12 September 2026.** The site is almost certainly recording
no analytics. The fault is **not in this repository** and cannot be fixed from it.
Read "The 12 September 2026 failure" before changing anything here.

## What the site does

One script, emitted sitewide from [`src/layouts/Layout.astro`](../src/layouts/Layout.astro):

```html
<link rel="preconnect" href="https://analytics.coulsy.dev" />
<script defer data-domain="coulsyfiredoors.co.uk"
        src="https://analytics.coulsy.dev/js/script.js"></script>
```

- **Product:** Plausible, reached through the custom host `analytics.coulsy.dev`
  rather than `plausible.io` — the standard proxy pattern, which keeps the request
  first-party-looking and out of the way of tracker blockers.
- **Site identifier:** `data-domain="coulsyfiredoors.co.uk"`. This is the key
  Plausible files stats under; it is not the script's host and the two need not match.
- **Event endpoint:** **not explicitly configured.** No `data-api` attribute is set,
  so the script defaults to `/api/event` on the origin it was served from — i.e.
  `https://analytics.coulsy.dev/api/event`. If the script host ever changes, the
  event path follows it automatically unless `data-api` is added.
- **No cookies, no consent banner, no GA.** Plausible is cookieless by design.

`src/components/PerformanceOptimizer.astro` still preconnects to `plausible.io` and
Google Analytics. **That component is imported nowhere** — it is dead and ships
nothing. Do not treat it as evidence of the live architecture.

## Where the infrastructure lives — and who owns it

| | |
|---|---|
| Hostname | `analytics.coulsy.dev` |
| DNS | Cloudflare (`angelina.ns.cloudflare.com`, `harley.ns.cloudflare.com`) |
| Resolves to | `172.67.214.57`, `104.21.86.24` — Cloudflare anycast |
| Fronted by | Cloudflare (`server: cloudflare`, `cf-ray` present) |
| Configuration | **Not in this repository.** No Worker, tunnel, redirect or proxy rule for it exists in the Fire Doors repo, and no `netlify.toml`. |

**The `coulsy.dev` zone is not managed from this repository and there is no
Cloudflare credential on the workstation** — no `wrangler`, no `cloudflared`, no
`CLOUDFLARE_*`/`CF_*` environment variable, no `~/.cloudflared`. Whoever
administers the `coulsy.dev` Cloudflare account owns this fault. Note the Netlify
account for this site is Christian's, so account ownership here should be
confirmed rather than assumed.

## The 12 September 2026 failure

**Every path on `analytics.coulsy.dev` returns HTTP 404** — `/`, `/js/script.js`,
`/api/event`, `/js/plausible.js`, `/api/health`.

```
HTTP/2 404 · content-type: text/plain · body: "404 page not found"
cf-cache-status: DYNAMIC · server: cloudflare
```

Two details localise it:

- `cf-cache-status: DYNAMIC` means the request **reached an origin** — Cloudflare
  did not answer it from cache or with one of its own branded error pages. So a
  service is listening and choosing to return 404.
- `404 page not found` is Go's default `http.NotFound` body. Plausible itself is
  Elixir, so this is **not Plausible answering** — it is a Go component in front of
  it (a `cloudflared` tunnel with no matching ingress rule fits exactly, as does a
  Go reverse proxy whose upstream has gone).

The browser consequence: Chrome refuses to execute a 404 `text/plain` response as a
script and reports `net::ERR_BLOCKED_BY_ORB`.

**Not caused by this site.** Verified by control: the identical block occurs on
production both before and after the `public/_headers` change of 12 Sep 2026
(PR #7). The site's own `nosniff` header is same-origin and cannot affect a
cross-origin script.

**When it started is unknown.** `analytics.coulsy.dev` was introduced on
14 June 2024 (`25e20db`) and last touched on 18 April 2026 (`d30190e`, which
replaced the GA/`plausible.io` preconnects with this host). Git shows the
configuration existed on those dates and that it is broken now. **It does not show
when tracking stopped, and no date should be inferred from it.**

**Blast radius: this site only.** No other locally available Coulsy repository
references `analytics.coulsy.dev` — checked `coulsy-joinery`, `coulsycode`, `saas`,
`saas-d101`, `coulsy-contract-solutions`. Joinery carries no live analytics at all.

**Search Console is unaffected** — it is independent of Plausible and remains the
reliable source for search performance, including any evidence used to decide the
location-page question in [`../BACKLOG.md`](../BACKLOG.md).

## What a fix requires

Access to the `coulsy.dev` Cloudflare account, to establish which of these is true
and repair it there:

1. a `cloudflared` tunnel whose ingress no longer routes `analytics.coulsy.dev`;
2. a reverse proxy whose Plausible upstream is down, moved or renamed;
3. a self-hosted Plausible instance that is stopped;
4. a Plausible Cloud proxy whose rule was deleted.

**Do not "fix" this by editing the website.** Pointing the script at
`plausible.io/js/script.js` would only work if a Plausible Cloud account exists for
`coulsyfiredoors.co.uk`, would abandon the proxy pattern deliberately adopted in
2024, and would leave the broken infrastructure in place for anything else using
it. Repair the layer that is actually broken.

## How to verify analytics health

```sh
# 1. the script must be JavaScript and 200 — not a 404 text/plain page
curl -sI https://analytics.coulsy.dev/js/script.js | head -3
#    expect: HTTP/2 200 and content-type: application/javascript

# 2. the event endpoint must accept POSTs (405 on GET is healthy; 404 is not)
curl -sI -X GET https://analytics.coulsy.dev/api/event | head -1

# 3. the browser must actually execute it — no ERR_BLOCKED_BY_ORB
#    load the site in a headless browser and check for failed requests
```

Then confirm a page view appears in the Plausible dashboard for
`coulsyfiredoors.co.uk`. Until step 1 returns 200 with a JavaScript content type,
steps 2 and 3 cannot pass.
