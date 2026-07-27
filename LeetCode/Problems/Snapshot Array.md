# 1146. Snapshot Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/snapshot-array](https://leetcode.com/problems/snapshot-array)
**Companies:** Amazon, Apple, Coupang, Databricks, Deepmind, Goldman Sachs, Google, Meta, Microsoft, Mongodb, Netflix, Nutanix, Rubrik, Snapchat, Snowflake, Stackadapt, Tiktok, Verkada

---

## Problem Description

Implement a data structure that supports setting values at indices, taking snapshots, and retrieving the value at an index at a given snapshot.

### Examples

- `SnapshotArray(3)` → `set(0,5)` → `snap()` returns 0 → `set(0,6)` → `get(0,0)` returns `5`

## Approach: Binary Search per Index — O(log S) get ✅

**Key Insight:** Store only changes as (snap_id, value) pairs per index. Use binary search to find the value at a given snapshot.

```
CLASS SnapshotArray:
    CONSTRUCTOR(length):
        changes = [[(0, 0)] for _ in range(length)]
        snapId = 0

    FUNCTION set(index, val):
        IF changes[index].LAST().snapId == snapId:
            changes[index].LAST().val = val
        ELSE:
            changes[index].ADD((snapId, val))

    FUNCTION snap():
        snapId += 1
        RETURN snapId - 1

    FUNCTION get(index, snap_id):
        // Binary search for the last entry with snapId ≤ snap_id
        history = changes[index]
        lo, hi = 0, len(history) - 1
        WHILE lo < hi:
            mid = (lo + hi + 1) / 2
            IF history[mid].snapId <= snap_id:
                lo = mid
            ELSE:
                hi = mid - 1
        RETURN history[lo].val
```

### Complexity

| | |
|---|---|
| **Time** | O(log S) per get, O(1) per set/snap |
| **Space** | O(n + total sets) |
