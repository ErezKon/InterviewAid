# 815. Bus Routes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/bus-routes](https://leetcode.com/problems/bus-routes)
**Companies:** Amazon, Bitgo, Bloomberg, Deltax, Goldman Sachs, Google, Info Edge, Meta, Microsoft, Oracle, Phonepe, Pinterest, Salesforce, Snapchat, Tiktok, Uber, Walmart Labs

---

## Approach: BFS on Bus Routes (not stops) — O(N²) ✅

Build a graph of which buses connect via shared stops. BFS from source buses to target buses.

```
FUNCTION numBusesToDestination(routes, source, target):
    IF source == target: RETURN 0

    // Map each stop to the routes that serve it
    stopToRoutes = {}
    FOR i, route IN enumerate(routes):
        FOR stop IN route:
            stopToRoutes[stop].ADD(i)

    // BFS on route indices
    visited = set()
    queue = []
    FOR routeIdx IN stopToRoutes.get(source, []):
        queue.ADD(routeIdx)
        visited.ADD(routeIdx)

    buses = 1
    WHILE queue:
        nextLevel = []
        FOR routeIdx IN queue:
            FOR stop IN routes[routeIdx]:
                IF stop == target: RETURN buses
                FOR nextRoute IN stopToRoutes[stop]:
                    IF nextRoute NOT IN visited:
                        visited.ADD(nextRoute)
                        nextLevel.ADD(nextRoute)
        queue = nextLevel
        buses += 1

    RETURN -1
```
