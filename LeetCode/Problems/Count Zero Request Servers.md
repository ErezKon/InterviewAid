# 2747. Count Zero Request Servers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-zero-request-servers](https://leetcode.com/problems/count-zero-request-servers)
**Companies:** Amazon, Dp World, Honeywell, Lti, Rubrik

---

## Problem Description

Given `n` servers and logs `[server_id, time]`, for each query time `t`, count servers that received **no requests** in `[t - x, t]`.

---

## Key Insight

Sort queries and logs by time. Process queries in order, maintaining a sliding window `[t - x, t]` over logs. Track distinct active servers with a counter map. Answer = `n - active_count`.

---

## Approach: Sliding Window + Offline Queries — O(n log n + q log q) ✅

```
FUNCTION countServers(n, logs, x, queries):
    SORT logs by time
    sortedQ = sorted(enumerate(queries), key=lambda p: p[1])
    result = [0] * len(queries)

    serverCount = Counter()
    active = 0; left = 0; right = 0

    FOR (qi, qTime) IN sortedQ:
        // Expand right: add logs with time ≤ qTime
        WHILE right < len(logs) AND logs[right].time <= qTime:
            serverCount[logs[right].server] += 1
            IF serverCount[logs[right].server] == 1: active += 1
            right += 1
        // Shrink left: remove logs with time < qTime - x
        WHILE left < right AND logs[left].time < qTime - x:
            serverCount[logs[left].server] -= 1
            IF serverCount[logs[left].server] == 0: active -= 1
            left += 1
        result[qi] = n - active

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n + q log q) |
| **Space** | O(n + q) |

---

## Key Takeaway

> **Offline query processing with sliding window: sort queries and data by time, maintain a window of active events. Track distinct counts via a frequency counter. Answer each query as `total - active`.**
