# 815. Bus Routes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/bus-routes](https://leetcode.com/problems/bus-routes)
**Companies:** Amazon, Bitgo, Bloomberg, Deltax, Goldman Sachs, Google, Info Edge, Meta, Microsoft, Oracle, Phonepe, Pinterest, Salesforce, Snapchat, Tiktok, Uber, Walmart Labs

---

## Problem Description

You are given an array `routes` representing bus routes where `routes[i]` is a bus route that the `i^th` bus repeats forever.

- For example, if `routes[0] = [1, 5, 7]`, this means that the `0^th` bus travels in the sequence `1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...` forever.

You will start at the bus stop `source` (You are not on any bus initially), and you want to go to the bus stop `target`. You can travel between bus stops by buses only.

Return *the least number of buses you must take to travel from *`source`* to *`target`. Return `-1` if it is not possible.

**Constraints:**
- `1 <= routes.length <= 500`.
- `1 <= routes[i].length <= 10^5`
- All the values of `routes[i]` are **unique**.
- `sum(routes[i].length) <= 10^5`
- `0 <= routes[i][j] < 10^6`
- `0 <= source, target < 10^6`

## Examples

**Example 1:**
```
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.
```

**Example 2:**
```
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1
```

## Approach: BFS on Bus Routes — O(N²) ✅

```text
FUNCTION numBusesToDestination(routes, source, target):
    IF source == target: RETURN 0
    // Map each stop to the set of routes that include it
    stopToRoutes ← MAP()
    FOR i FROM 0 TO LENGTH(routes)-1:
        FOR stop IN routes[i]:
            stopToRoutes[stop].ADD(i)
    // BFS over route indices
    visitedRoutes ← SET()
    queue ← []
    FOR routeIdx IN stopToRoutes.get(source, []):
        queue.ADD(routeIdx)
        visitedRoutes.ADD(routeIdx)
    buses ← 1
    WHILE queue NOT EMPTY:
        nextQueue ← []
        FOR routeIdx IN queue:
            FOR stop IN routes[routeIdx]:
                IF stop == target: RETURN buses
                FOR nextRoute IN stopToRoutes[stop]:
                    IF nextRoute NOT IN visitedRoutes:
                        visitedRoutes.ADD(nextRoute)
                        nextQueue.ADD(nextRoute)
        queue ← nextQueue
        buses ← buses + 1
    RETURN -1
```

## Walkthrough
| Level | Current Route | Stops Explored | Queue after level |
|-------|---------------|----------------|-------------------|
| 1 | Routes serving `source` (0) | 1,2,7 | [0] |
| 2 | From route 0, stop 7 connects to route 1 | 3,6,7 | [1] |
| 3 | Route 1 contains `target` 6 → return 2 |

## Complexity Analysis
- **Time:** O(R·S) where R = number of routes, S = average stops per route (building map and BFS).
- **Space:** O(R + S) for the stop‑to‑routes map and visited set.

## Follow‑Up Questions
1. How would you handle dynamic addition/removal of routes?
2. Can the algorithm be adapted to return the actual sequence of buses taken?
3. What is the impact of extremely large stop IDs on memory usage?

## Key Takeaway
Modeling the problem as a graph of routes (instead of individual stops) enables a simple BFS that finds the minimal bus transfers.
