# 332. Reconstruct Itinerary

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reconstruct-itinerary](https://leetcode.com/problems/reconstruct-itinerary)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Bookingcom, Capital One, Citadel, Compass, Ebay, Flipkart, Google, Hopper, Meta, Microsoft, Netflix, Palo Alto Networks, Pinterest, Salesforce, Uber, Visa, Walmart Labs, Yandex

---

## Problem Description
Given a list of airline tickets represented as pairs `[from, to]`, reconstruct the itinerary in lexical order starting from "JFK". All tickets must be used exactly once, forming a valid travel route (an Eulerian path). Return the itinerary as a list of airport codes.

## Examples
**Example 1:**
```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
Explanation: The only valid itinerary that uses all tickets starts at JFK and follows lexical order.
```
**Example 2:**
```
Input: tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]
Output: ["JFK","NRT","JFK","KUL"]
Explanation: Two possible itineraries exist; the lexical smallest is chosen.
```

## Approach
Model the tickets as a directed multigraph where vertices are airports and edges are tickets. The required itinerary is an Eulerian path that starts at "JFK". Using Hierholzer's algorithm, perform a depth‑first traversal, always selecting the smallest lexical destination first (by sorting adjacency lists in reverse and popping). Record the path in post‑order and reverse it at the end.

## Pseudocode
```text
FUNCTION findItinerary(tickets):
    // Build adjacency list
    CREATE map graph
    FOR each [src, dst] IN tickets:
        APPEND dst TO graph[src]
    // Sort destinations so smallest is popped last
    FOR each src IN graph:
        SORT graph[src] DESCENDING

    CREATE list route
    FUNCTION dfs(airport):
        WHILE graph[airport] IS NOT EMPTY:
            SET next ← POP_LAST(graph[airport])
            CALL dfs(next)
        APPEND airport TO route

    CALL dfs("JFK")
    REVERSE route
    RETURN route
```

## Walkthrough
Consider tickets `[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"]]`.
1. Build graph: JFK → [SFO, ATL] (sorted DESC → [SFO, ATL]), SFO → [ATL], ATL → [JFK].
2. DFS from JFK: take next = ATL (pop last), recurse.
3. From ATL: next = JFK, recurse.
4. From JFK (second visit): next = SFO, recurse.
5. From SFO: next = ATL, recurse.
6. ATL has no more edges, add ATL to route, unwind adding JFK, SFO, ATL, JFK.
7. Reverse route → `["JFK","ATL","JFK","SFO","ATL"]`.

## Complexity Analysis
- **Time:** O(E log E) for sorting adjacency lists, where E = number of tickets.
- **Space:** O(V + E) for the graph and recursion stack.

## Follow‑Up Questions
1. How would you modify the algorithm to handle multiple possible starting airports?
2. Can the solution be adapted to return all valid itineraries in lexical order?
3. What changes are needed if tickets can be reused (i.e., edges are not required to be used exactly once)?

## Key Takeaway
Hierholzer's algorithm with lexical ordering yields the required Eulerian path for the itinerary.
