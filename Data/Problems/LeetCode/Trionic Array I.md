# 3637. Trionic Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/trionic-array-i](https://leetcode.com/problems/trionic-array-i)
**Companies:** Amazon, Google, Infosys, Meta

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below implement an invented update/query/reset data structure. Correct idea: single pass — advance `p` while strictly increasing (fail if `p == 0`), advance `q` from `p` while strictly decreasing (fail if `q == p` or `q == n−1`), then advance while strictly increasing and require reaching `n−1`. O(n).*

You are given an integer array `nums` of length `n`.

An array is **trionic** if there exist indices `0 < p < q < n − 1` such that:

- `nums[0...p]` is **strictly** increasing,
- `nums[p...q]` is **strictly** decreasing,
- `nums[q...n − 1]` is **strictly** increasing.

Return `true` if `nums` is trionic, otherwise return `false`.

**Constraints:**
- `3 <= n <= 100`
- `-1000 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [1,3,5,4,2,6]
Output: true
Explanation: Pick p = 2, q = 4:
- nums[0...2] = [1, 3, 5] is strictly increasing (1 < 3 < 5).
- nums[2...4] = [5, 4, 2] is strictly decreasing (5 > 4 > 2).
- nums[4...5] = [2, 6] is strictly increasing (2 < 6).
```

**Example 2:**
```
Input: nums = [2,1,3]
Output: false
Explanation: There is no way to pick p and q to form the required three segments.
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
