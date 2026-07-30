# 3637. Trionic Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/trionic-array-i](https://leetcode.com/problems/trionic-array-i)
**Companies:** Amazon, Google, Infosys, Meta

---

## Problem Description
A *trionic array* is a data structure that supports three operations on an integer array `arr` of length `n`:
1. **Update(i, val)** – set `arr[i] = val`.
2. **Query(l, r)** – return the sum of elements from index `l` to `r` inclusive.
3. **Reset()** – set all elements of `arr` to `0`.
Implement the class with these operations. All indices are `0`‑based.

## Examples
**Example 1:**
```
TrionicArray obj = new TrionicArray([1,2,3])
obj.update(1,5)      // arr becomes [1,5,3]
obj.query(0,2)       // returns 9
obj.reset()          // arr becomes [0,0,0]
obj.query(0,1)       // returns 0
```

## Approach
Maintain a simple array for the values. `Update` modifies a single element in O(1). `Query` computes the sum by iterating from `l` to `r` – O(r‑l+1). `Reset` reinitializes the array to zeros – O(n). For more efficient queries, a prefix‑sum array or Fenwick tree could be used, but the basic implementation satisfies the problem statement.

**Pseudocode**
```text
CLASS TrionicArray:
    FUNCTION __init__(initial):
        SET arr ← COPY of initial
        SET n ← LENGTH(arr)

    FUNCTION update(i, val):
        SET arr[i] ← val

    FUNCTION query(l, r):
        SET sum ← 0
        FOR idx ← l TO r:
            SET sum ← sum + arr[idx]
        RETURN sum

    FUNCTION reset():
        FOR i ← 0 TO n-1:
            SET arr[i] ← 0
```

## Walkthrough
1. Initialize with `[1,2,3]` → `arr = [1,2,3]`.
2. `update(1,5)` changes element at index 1 → `arr = [1,5,3]`.
3. `query(0,2)` sums all → `1+5+3 = 9`.
4. `reset()` sets all to `0` → `arr = [0,0,0]`.
5. `query(0,1)` returns `0`.

## Complexity Analysis
- Update: O(1) time, O(1) space.
- Query: O(k) time where k = r‑l+1, O(1) space.
- Reset: O(n) time, O(1) space.

## Follow‑Up Questions
1. How would you improve `query` to O(log n) using a Fenwick tree or segment tree?
2. Can you support a `rangeUpdate(l, r, delta)` operation efficiently?
3. What changes are needed if the array size can grow dynamically?

## Key Takeaway
A trionic array combines basic array updates with range queries; more advanced data structures can optimize query performance.
