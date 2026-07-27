# 332. Reconstruct Itinerary

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reconstruct-itinerary](https://leetcode.com/problems/reconstruct-itinerary)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Bookingcom, Capital One, Citadel, Compass, Ebay, Flipkart, Google, Hopper, Meta, Microsoft, Netflix, Palo Alto Networks, Pinterest, Salesforce, Uber, Visa, Walmart Labs, Yandex

---

## Approach: Hierholzer's (Eulerian Path) — O(E log E) ✅

```
FUNCTION findItinerary(tickets):
    graph = {}
    FOR [src, dst] IN tickets:
        graph[src].ADD(dst)
    FOR src IN graph:
        SORT graph[src] in reverse    // so we pop smallest first

    route = []
    FUNCTION dfs(airport):
        WHILE graph[airport]:
            next = graph[airport].POP()    // pop last = smallest
            dfs(next)
        route.ADD(airport)

    dfs("JFK")
    RETURN REVERSE(route)
```

Post-order DFS builds the route in reverse. Hierholzer's algorithm finds an Eulerian path.
