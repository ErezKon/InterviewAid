# 635. Design Log Storage System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-log-storage-system](https://leetcode.com/problems/design-log-storage-system)
**Companies:** Amazon, Apple, Snapchat, Snowflake

---

## Problem Description

Design a log storage system: `put(id, timestamp)` stores a log, `retrieve(start, end, granularity)` returns IDs within the time range at the given granularity (Year/Month/Day/Hour/Minute/Second).

---

## Approach

```
CLASS LogSystem:
    CONSTRUCTOR: self.logs = []

    FUNCTION put(id, timestamp): logs.ADD((timestamp, id))

    FUNCTION retrieve(start, end, granularity):
        idx = {"Year":4, "Month":7, "Day":10, "Hour":13, "Minute":16, "Second":19}
        i = idx[granularity]
        s = start[:i]; e = end[:i]
        RETURN [id for ts, id in logs if s <= ts[:i] <= e]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) put, O(n) retrieve |
| **Space** | O(n) |

---

## Key Takeaway

> **Granularity maps to a string prefix length. Since timestamps are zero-padded `YYYY:MM:DD:HH:MM:SS`, lexicographic prefix comparison equals chronological comparison.**
