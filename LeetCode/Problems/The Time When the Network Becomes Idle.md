# 2039. The Time When the Network Becomes Idle

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Atlassian, Deutsche Bank

---

## Problem Description
There are `n` servers numbered from `0` to `n-1` connected by undirected edges given in `edges`. Server `0` is the main server. Each server `i` has a `patience[i]` value indicating it sends a message to the main server every `patience[i]` seconds until it receives a reply. A reply travels back along the shortest path from the main server to `i`. The network becomes idle when all servers have received a reply and no more messages are in transit. Return the earliest time (in seconds) when the network becomes idle.

## Examples
**Example 1:**
```
edges = [[0,1],[1,2]]
patience = [0,2,1]
Output = 8
```
Server 1 receives reply at time 2, stops sending. Server 2 receives reply at time 4, but its patience is 1, so it sends messages at times 1,2,3,4; the last one arrives at 8.

**Example 2:**
```
edges = [[0,1],[0,2],[1,2]]
patience = [0,10,10]
Output = 2
```
All servers are directly connected to the main server; replies arrive at time 2 and no further messages are sent.

## Approach
1. Perform a BFS from server 0 to compute the shortest distance `dist[i]` (in edges) to every server.
2. The round‑trip time for server i is `rt = 2 * dist[i]`.
3. If `patience[i]` is 0, the server sends only one message. Otherwise, the last message sent before the reply arrives is at time `⌊(rt‑1) / patience[i]⌋ * patience[i]`. The reply to that message arrives at `lastSend + rt`.
4. The network becomes idle at the maximum of all such arrival times.

```text
FUNCTION networkIdleTime(edges, patience):
    n ← LENGTH(patience)
    // Build adjacency list
    adj ← LIST OF LISTS SIZE n
    FOR (u,v) IN edges:
        APPEND adj[u], v
        APPEND adj[v], u
    // BFS to compute distances
    dist ← ARRAY n FILLED WITH -1
    queue ← LIST()
    ENQUEUE(queue, 0)
    SET dist[0] ← 0
    WHILE queue IS NOT EMPTY:
        node ← DEQUEUE(queue)
        FOR nbr IN adj[node]:
            IF dist[nbr] = -1:
                SET dist[nbr] ← dist[node] + 1
                ENQUEUE(queue, nbr)
    maxTime ← 0
    FOR i FROM 1 TO n-1:
        rt ← 2 * dist[i]
        IF patience[i] = 0:
            lastArrival ← rt
        ELSE:
            lastSend ← ((rt - 1) DIV patience[i]) * patience[i]
            lastArrival ← lastSend + rt
        SET maxTime ← MAX(maxTime, lastArrival)
    RETURN maxTime
```
The BFS gives shortest paths, and the formula computes the final reply arrival for each server.

## Walkthrough
| Server | dist | rt | patience | lastSend | lastArrival |
|--------|------|----|----------|----------|-------------|
| 1 | 1 | 2 | 2 | 0 (⌊1/2⌋*2) | 2 |
| 2 | 2 | 4 | 1 | 3 (⌊3/1⌋*1) | 7 |
| … | … | … | … | … | … |
Maximum arrival time = 8 seconds.

## Complexity Analysis
- **Time:** O(n + m) for BFS plus O(n) for the final scan, where `m` is number of edges.
- **Space:** O(n + m) for adjacency list, distance array, and queue.

## Follow‑Up Questions
1. How would the solution change if edges had different transmission delays?
2. Can you compute the idle time without explicit BFS by using Union‑Find on a tree?
3. How would you extend the problem to handle directed edges with asymmetric latencies?

## Key Takeaway
Compute shortest round‑trip times with BFS, then use each server’s patience to determine the last message that matters; the maximum of these times is when the network finally becomes idle.
