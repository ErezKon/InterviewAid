# 303. Range Sum Query - Immutable

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/range-sum-query-immutable](https://leetcode.com/problems/range-sum-query-immutable)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Palantir, Tcs

---

## Problem Description

Given an integer array `nums`, create a data structure that can answer multiple queries `sumRange(left, right)`, returning the sum of elements from index `left` to `right` inclusive.

---

## Examples

| nums | query | result |
|------|-------|--------|
| `[1,3,5]` | `sumRange(0,2)` | `9`
| `[1,3,5]` | `sumRange(1,2)` | `8`
| `[1,3,5]` | `sumRange(0,1)` | `4`

## Approach

Pre‑compute a prefix‑sum array where `prefix[i]` stores the sum of the first `i` elements.

```text
CLASS NumArray:
    CONSTRUCTOR(nums):
        prefix ← [0] * (LEN(nums) + 1)
        FOR i ← 0 TO LEN(nums) - 1:
            prefix[i + 1] ← prefix[i] + nums[i]

    FUNCTION sumRange(left, right):
        RETURN prefix[right + 1] - prefix[left]
```

## Walkthrough

1. Build `prefix` for `[1,3,5]` → `[0,1,4,9]`.
2. `sumRange(0,2)`: `prefix[3] - prefix[0] = 9 - 0 = 9`.
3. `sumRange(1,2)`: `prefix[3] - prefix[1] = 9 - 1 = 8`.
4. `sumRange(0,1)`: `prefix[2] - prefix[0] = 4 - 0 = 4`.

## Complexity Analysis

- **Time:** Constructor O(n), each `sumRange` O(1).
- **Space:** O(n) for the prefix array.

---

## Key Takeaway

> Prefix sums turn range‑sum queries on a static array into constant‑time lookups: `sum(l,r) = prefix[r+1] - prefix[l]`.
