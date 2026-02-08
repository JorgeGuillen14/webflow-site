#!/usr/bin/env node
/**
 * Quick test that the app on host is responding.
 * Run while dev server is up: npm run dev (in another terminal)
 * Then: node scripts/test-host.mjs
 *
 * Optional: BASE=http://localhost:3001 node scripts/test-host.mjs
 */

const base = process.env.BASE || "http://localhost:3000"

async function test() {
  console.log("Testing", base, "\n")

  const routes = [
    { path: "/", name: "Home" },
    { path: "/request-demo", name: "Request Demo" },
    { path: "/book-demo", name: "Book Demo" },
    { path: "/team", name: "Team" },
    { path: "/kaptureops", name: "KaptureOps" },
  ]

  let ok = 0
  let fail = 0

  for (const { path, name } of routes) {
    const url = base + path
    try {
      const res = await fetch(url, { redirect: "follow" })
      const status = res.status
      const okStatus = status >= 200 && status < 400
      if (okStatus) {
        console.log("✓", name.padEnd(14), path, status)
        ok++
      } else {
        console.log("✗", name.padEnd(14), path, status)
        fail++
      }
    } catch (e) {
      console.log("✗", name.padEnd(14), path, "Error:", e.message)
      fail++
    }
  }

  console.log("\n" + ok + " passed, " + fail + " failed")
  process.exit(fail > 0 ? 1 : 0)
}

test()
