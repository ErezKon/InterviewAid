# 2039. The Time When the Network Becomes Idle

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-time-when-the-network-becomes-idle](https://leetcode.com/problems/the-time-when-the-network-becomes-idle)
**Companies:** Amazon, Atlassian, Deutsche Bank

---

## Problem Description
There is a network of `n` servers, labeled from `0` to `n - 1`. You are given a 2D integer array `edges`, where `edges[i] = [u_i, v_i]` indicates there is a message channel between servers `u_i` and `v_i`, and they can pass **any** number of messages to **each other** directly in **one** second. You are also given a **0-indexed** integer array `patience` of length `n`.

All servers are **connected**, i.e., a message can be passed from one server to any other server(s) directly or indirectly through the message channels.

The server labeled `0` is the **master** server. The rest are **data** servers. Each data server needs to send its message to the master server for processing and wait for a reply. Messages move between servers **optimally**, so every message takes the **least amount of time** to arrive at the master server. The master server will process all newly arrived messages **instantly** and send a reply to the originating server via the **reversed path** the message had gone through.

At the beginning of second `0`, each data server sends its message to be processed. Starting from second `1`, at the **beginning** of **every** second, each data server will check if it has received a reply to the message it sent (including any newly arrived replies) from the master server:

- If it has not, it will **resend** the message periodically. The data server `i` will resend the message every `patience[i]` second(s), i.e., the data server `i` will resend the message if `patience[i]` second(s) have **elapsed** since the **last** time the message was sent from this server.
- Otherwise, **no more resending** will occur from this server.

The network becomes **idle** when there are **no** messages passing between servers or arriving at servers.

Return *the **earliest second** starting from which the network becomes **idle***.

**Constraints:**
- `n == patience.length`
- `2 <= n <= 10^5`
- `patience[0] == 0`
- `1 <= patience[i] <= 10^5` for `1 <= i < n`
- `1 <= edges.length <= min(10^5, n * (n - 1) / 2)`
- `edges[i].length == 2`
- `0 <= u_i, v_i < n`
- `u_i != v_i`
- There are no duplicate edges.
- Each server can directly or indirectly reach another server.

## Examples
```
Example 1:
  Input: edges = [[0,1],[1,2]], patience = [0,2,1]
  Output: 8
  Explanation:
  At (the beginning of) second 0,
  - Data server 1 sends its message (denoted 1A) to the master server.
  - Data server 2 sends its message (denoted 2A) to the master server.

  At second 1,
  - Message 1A arrives at the master server. Master server processes message 1A instantly and sends a reply 1A back.
  - Server 1 has not received any reply. 1 second (1 < patience[1] = 2) elapsed since this server has sent the message, therefore it does not resend the message.
  - Server 2 has not received any reply. 1 second (1 == patience[2] = 1) elapsed since this server has sent the message, therefore it resends the message (denoted 2B).

  At second 2,
  - The reply 1A arrives at server 1. No more resending will occur from server 1.
  - Message 2A arrives at the master server. Master server processes message 2A instantly and sends a reply 2A back.
  - Server 2 resends the message (denoted 2C).
  ...
  At second 4,
  - The reply 2A arrives at server 2. No more resending will occur from server 2.
  ...
  At second 7, reply 2D arrives at server 2.

  Starting from the beginning of the second 8, there are no messages passing between servers or arriving at servers.
  This is the time when the network becomes idle.
```
```
Example 2:
  Input: edges = [[0,1],[0,2],[1,2]], patience = [0,10,10]
  Output: 3
  Explanation: Data servers 1 and 2 receive a reply back at the beginning of second 2.
  From the beginning of the second 3, the network becomes idle.
```

## Approach
1. Perform a BFS from server 0 to compute the shortest distance `dist[i]` (in edges) to every server.
2. The round-trip time for server i is `rt = 2 * dist[i]`.
3. If `patience[i]` is 0, the server sends only one message. Otherwise, the last message sent before the reply arrives is at time `⌊(rt-1) / patience[i]⌋ * patience[i]`. The reply to that message arrives at `lastSend + rt`.
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

## Follow-Up Questions
1. How would the solution change if edges had different transmission delays?
2. Can you compute the idle time without explicit BFS by using Union-Find on a tree?
3. How would you extend the problem to handle directed edges with asymmetric latencies?

## Key Takeaway
Compute shortest round-trip times with BFS, then use each server’s patience to determine the last message that matters; the maximum of these times is when the network finally becomes idle.
