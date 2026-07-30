# 2080. Range Frequency Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-frequency-queries](https://leetcode.com/problems/range-frequency-queries)
**Companies:** Quora, Tiktok

---

## Problem Description
Given an integer array `arr` and a series of queries, each query either updates an element at a given index or asks for the frequency of a target value within a sub‑array `[left, right]`. The data structure must support both operations efficiently.

## Examples
**Example 1:**
```
arr = [1,2,1,3,2]
queries = [[1,1,2], [2,0,4,2], [1,0,4,2]]
```
- Query type 1 asks for frequency of `2` in `arr[1..2]` → returns `1`.
- Query type 2 updates `arr[0]` to `2`.
- Query type 1 now asks for frequency of `2` in `arr[0..4]` → returns `3`.

**Example 2:**
```
arr = [5,5,5]
queries = [[1,0,2,5]]
```
Returns `3`.

## Approach
Use a **Binary Indexed Tree (Fenwick Tree)** for each distinct value to store prefix counts. On update, decrement the count tree of the old value and increment the tree of the new value. Frequency query becomes `prefix(right) - prefix(left-1)` on the tree of the target value.

```text
FUNCTION init(arr):
    FOR each unique value v IN arr:
        CREATE BIT[v] WITH size = len(arr)
    FOR i FROM 0 TO len(arr)-1:
        BIT[arr[i]].UPDATE(i, 1)

FUNCTION update(index, newVal):
    oldVal ← arr[index]
    IF oldVal = newVal: RETURN
    BIT[oldVal].UPDATE(index, -1)
    BIT[newVal].UPDATE(index, 1)
    arr[index] ← newVal

FUNCTION query(left, right, target):
    RETURN BIT[target].PREFIX(right) - BIT[target].PREFIX(left-1)
```

## Walkthrough
| Step | Action | BIT[1] | BIT[2] | BIT[3] |
|------|--------|--------|--------|--------|
| Init | arr = [1,2,1,3,2] | counts at indices 0,2 | counts at indices 1,4 | count at index 3 |
| Query 1 | freq of 2 in [1,2] | – | 1 | – |
| Update | arr[0] = 2 | decrement index0 | increment index0 | – |
| Query 2 | freq of 2 in [0,4] | – | 3 | – |

## Complexity Analysis
- **Time:** `O(log n)` per update or query.
- **Space:** `O(k·n)` where `k` is the number of distinct values (often bounded by `n`).

## Follow‑Up Questions
1. How would you handle the case where the number of distinct values is very large?
2. Can you design a solution using a segment tree with hash maps instead of separate BITs?
3. How would you extend the structure to support range sum of values, not just frequencies?

## Key Takeaway
A per‑value Fenwick Tree enables logarithmic‑time updates and range frequency queries by turning the problem into prefix sum differences.
