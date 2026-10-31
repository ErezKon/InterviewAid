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
The array is static (no updates), so store, for each value, the **sorted list of indices** where it occurs (built in one left-to-right pass, so the lists are already sorted). The frequency of `value` in `[left, right]` is the number of its indices inside that range, found with two binary searches.

```text
FUNCTION init(arr):
    positions ← map value → empty list
    FOR i ← 0 TO len(arr)-1:
        APPEND i TO positions[arr[i]]          // lists stay sorted

FUNCTION query(left, right, value):
    IF value NOT IN positions: RETURN 0
    list ← positions[value]
    lo ← LOWER_BOUND(list, left)               // first index >= left
    hi ← UPPER_BOUND(list, right)              // first index > right
    RETURN hi - lo
```

## Walkthrough
Example 1: `arr = [12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]`.

Index lists: `12 → [0,9]`, `33 → [1,7]`, `4 → [2]`, `56 → [3,11]`, `22 → [4,8]`, `2 → [5]`, `34 → [6,10]`.

| Call | list | lower_bound(left) | upper_bound(right) | result |
|------|------|-------------------|--------------------|--------|
| `query(1, 2, 4)` | `[2]` | 0 | 1 | 1 |
| `query(0, 11, 33)` | `[1,7]` | 0 | 2 | 2 |

Output: `[null, 1, 2]`.

## Complexity Analysis
- **Time:** `O(n)` to build, `O(log n)` per query.
- **Space:** `O(n)` total for all index lists.

## Follow-Up Questions
1. How would you handle the case where the number of distinct values is very large?
2. Can you design a solution using a segment tree with hash maps instead of separate BITs?
3. How would you extend the structure to support range sum of values, not just frequencies?

## Key Takeaway
For a static array, per-value sorted index lists turn a range frequency query into two binary searches; a per-value Fenwick tree is only needed if point updates must also be supported.
