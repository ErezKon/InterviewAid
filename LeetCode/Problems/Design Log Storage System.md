# 635. Design Log Storage System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-log-storage-system](https://leetcode.com/problems/design-log-storage-system)
**Companies:** Amazon, Apple, Snapchat, Snowflake

---

## Problem Description

Design a log storage system: `put(id, timestamp)` stores a log, `retrieve(start, end, granularity)` returns IDs within the time range at the given granularity (Year/Month/Day/Hour/Minute/Second).

---

## Approach

```text
CLASS LogSystem:
    CONSTRUCTOR:
        logs ← []

    FUNCTION put(id, timestamp):
        APPEND (timestamp, id) TO logs

    FUNCTION retrieve(start, end, granularity):
        idx ← {"Year":4, "Month":7, "Day":10, "Hour":13, "Minute":16, "Second":19}
        i ← idx[granularity]
        s ← start[:i]
        e ← end[:i]
        RETURN [id FOR (ts, id) IN logs IF s ≤ ts[:i] ≤ e]
```

---

## Examples

| Operation | Result |
|-----------|--------|
| `put(1, "2017:01:01:23:59:59")` | — |
| `put(2, "2017:01:01:22:59:59")` | — |
| `retrieve("2016:01:01:01:01:01", "2017:12:31:23:59:59", "Year")` | Returns **[1,2]** |
| `retrieve("2016:01:01:01:01:01", "2017:12:31:23:59:59", "Hour")` | Returns **[2]** |

---

## Walkthrough

1. **put** stores each log as a tuple `(timestamp, id)`.
2. **retrieve** maps granularity to a prefix length (e.g., "Hour" → 13 characters).
3. It slices `start` and `end` to that length, then filters stored logs whose timestamp prefix falls within the range.
4. The filtered IDs are returned in insertion order.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for `put`, O(n) for `retrieve` where n is number of stored logs |
| **Space** | O(n) to store logs |

---

## Follow-Up Questions

- How would you improve `retrieve` to O(log n) using a balanced search tree?
- Can you support deletion of logs?
- How would you handle extremely large numbers of logs with limited memory?

---

## Key Takeaway

> **Granularity maps to a string prefix length. Since timestamps are zero‑padded `YYYY:MM:DD:HH:MM:SS`, lexicographic prefix comparison equals chronological comparison.**
