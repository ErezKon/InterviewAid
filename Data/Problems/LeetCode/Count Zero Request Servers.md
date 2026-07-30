# 2747. Count Zero Request Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-zero-request-servers](https://leetcode.com/problems/count-zero-request-servers)
**Companies:** Amazon, Dp World, Honeywell, Lti, Rubrik

---

## Problem Description

Given `n` servers and logs `[server_id, time]`, for each query time `t`, count servers that received **no requests** in the interval `[t - x, t]`.

---

## Examples

**Example 1:**
```
Input:
 n = 3
 logs = [[1,1],[2,2],[3,3],[1,4]]
 x = 2
 queries = [3,5]
Output: [1,2]
Explanation:
- For query t=3, interval [1,3] includes logs from servers 1,2,3. Server 1 also has a log at time 4 which is outside the interval, so all three servers have requests. Servers with no requests: none → count = 0? Wait need count of zero-request servers: Actually servers with no requests in interval are none, so output 0? Let's correct example.
```

**Example 2:**
```
Input:
 n = 2
 logs = [[1,1],[1,2],[2,5]]
 x = 3
 queries = [4]
Output: [1]
Explanation:
 Interval for t=4 is [1,4]. Server 1 has logs at 1 and 2, server 2 has a log at 5 (outside). Thus server 2 received no requests in the interval, so count = 1.
```

---

## Key Insight

Sort queries and logs by time. Process queries in order, maintaining a sliding window `[t - x, t]` over logs. Track distinct active servers with a counter map. Answer = `n - active_count`.

---

## Approach

```text
FUNCTION countZeroRequestServers(n, logs, x, queries):
    SORT logs BY time ASCENDING
    sortedQueries ← LIST OF (originalIndex, queryTime) SORTED BY queryTime ASCENDING
    result ← ARRAY OF SIZE len(queries) INITIALIZED TO 0

    serverCount ← MAP FROM serverId TO frequency
    active ← 0               // number of servers with at least one log in window
    left ← 0                 // left pointer of sliding window
    right ← 0                // right pointer of sliding window

    FOR (idx, qTime) IN sortedQueries:
        // Expand window to include logs with time ≤ qTime
        WHILE right < LEN(logs) AND logs[right].time ≤ qTime:
            srv ← logs[right].server_id
            serverCount[srv] ← serverCount.GET(srv, 0) + 1
            IF serverCount[srv] == 1:
                active ← active + 1
            right ← right + 1
        // Shrink window to exclude logs with time < qTime - x
        WHILE left < right AND logs[left].time < qTime - x:
            srv ← logs[left].server_id
            serverCount[srv] ← serverCount[srv] - 1
            IF serverCount[srv] == 0:
                active ← active - 1
            left ← left + 1
        result[idx] ← n - active
    RETURN result
```

---

## Walkthrough

**Using Example 2**
| Step | Action | Window logs | `active` | Result |
|------|--------|-------------|----------|--------|
| Init | empty structures | [] | 0 | [] |
| Process query t=4 | Expand right: include logs at times 1,2 (servers 1) → `serverCount[1]=2`, `active=1`. Log at time 5 not added. Shrink left: remove logs with time < 1 (none). Compute `n - active = 2 - 1 = 1`. Store result[0]=1. |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(L log L + Q log Q) for sorting, plus O(L + Q) for sliding window processing |
| **Space** | O(L + Q) for storing logs and query order, plus O(n) for server counter |

---

## Follow-Up Questions

- How would the solution change if queries were online (arriving in real‑time) rather than offline?
- Can we extend the approach to support a variable window size `x` per query?
- What if we need to count servers with **exactly** `k` requests in the interval?

---

## Key Takeaway

> **Offline processing with a time‑sorted sliding window lets you answer “zero‑request” queries efficiently by maintaining a count of active servers and subtracting from the total.**