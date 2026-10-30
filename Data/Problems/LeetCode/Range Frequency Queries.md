# 2080. Range Frequency Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-frequency-queries](https://leetcode.com/problems/range-frequency-queries)
**Companies:** Quora, Tiktok

---

## Problem Description
Design a data structure to find the **frequency** of a given value in a given subarray.

The **frequency** of a value in a subarray is the number of occurrences of that value in the subarray.

Implement the `RangeFreqQuery` class:

- `RangeFreqQuery(int[] arr)` Constructs an instance of the class with the given **0-indexed** integer array `arr`.
- `int query(int left, int right, int value)` Returns the **frequency** of `value` in the subarray `arr[left...right]`.

A **subarray** is a contiguous sequence of elements within an array. `arr[left...right]` denotes the subarray that contains the elements of `nums` between indices `left` and `right` (**inclusive**).

**Constraints:**

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i], value <= 10⁴`
- `0 <= left <= right < arr.length`
- At most `10⁵` calls will be made to `query`

## Examples

```
Example 1:
  Input: ["RangeFreqQuery", "query", "query"]
         [[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
  Output: [null, 1, 2]
  Explanation:
    RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
    rangeFreqQuery.query(1, 2, 4);   // return 1. The value 4 occurs 1 time in the subarray [33, 4]
    rangeFreqQuery.query(0, 11, 33); // return 2. The value 33 occurs 2 times in the whole array.
```

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
