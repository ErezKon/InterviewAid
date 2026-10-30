# 1146. Snapshot Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/snapshot-array](https://leetcode.com/problems/snapshot-array)
**Companies:** Amazon, Apple, Coupang, Databricks, Deepmind, Goldman Sachs, Google, Meta, Microsoft, Mongodb, Netflix, Nutanix, Rubrik, Snapchat, Snowflake, Stackadapt, Tiktok, Verkada

---

## Problem Description

Implement a SnapshotArray that supports the following interface:

- `SnapshotArray(int length)` initializes an array-like data structure with the given length. **Initially, each element equals 0**.
- `void set(index, val)` sets the element at the given `index` to be equal to `val`.
- `int snap()` takes a snapshot of the array and returns the `snap_id`: the total number of times we called `snap()` minus `1`.
- `int get(index, snap_id)` returns the value at the given `index`, at the time we took the snapshot with the given `snap_id`.

**Constraints:**
- `1 <= length <= 5 * 10⁴`
- `0 <= index < length`
- `0 <= val <= 10⁹`
- `0 <= snap_id <` (the total number of times we call `snap()`)
- At most `5 * 10⁴` calls will be made to `set`, `snap`, and `get`.

### Examples

```
Example 1:
  Input:
    ["SnapshotArray","set","snap","set","get"]
    [[3],[0,5],[],[0,6],[0,0]]
  Output:
    [null,null,0,null,5]
  Explanation:
    SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
    snapshotArr.set(0,5);  // Set array[0] = 5
    snapshotArr.snap();    // Take a snapshot, return snap_id = 0
    snapshotArr.set(0,6);
    snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
```

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
