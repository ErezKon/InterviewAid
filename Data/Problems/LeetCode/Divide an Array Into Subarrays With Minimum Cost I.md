# 3010. Divide an Array Into Subarrays With Minimum Cost I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i](https://leetcode.com/problems/divide-an-array-into-subarrays-with-minimum-cost-i)
**Companies:** Amazon, American Express, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Split `nums` into 3 contiguous subarrays. Cost = sum of first elements of each subarray. First subarray always starts at index 0. Minimize total cost.

**Constraints:** `3 <= n <= 50`

---

## Approach: Sort Remaining ✅

```text
FUNCTION minimumCost(nums):
    // First subarray must start at index 0
    // Need 2 more starting points from nums[1:]
    // Cost = nums[0] + two smallest values from nums[1:]
    rest ← SORT(nums[1:])
    RETURN nums[0] + rest[0] + rest[1]
```

---

## Examples

| nums | Minimum Cost |
|------|--------------|
| [5,1,3,4,2] | 5 + 1 + 2 = 8 |
| [10,7,5,6,2] | 10 + 2 + 5 = 17 |

---

## Walkthrough

**Example:** `nums = [5,1,3,4,2]`

1. First subarray starts at index 0 → first element `5`.
2. Remaining elements `[1,3,4,2]` are sorted → `[1,2,3,4]`.
3. Pick two smallest values `1` and `2` as starts of the second and third subarrays.
4. Total cost = `5 + 1 + 2 = 8`.

---

## Complexity Analysis

- **Time:** `O(n log n)` for sorting the remaining `n‑1` elements.
- **Space:** `O(n)` for the sorted copy (can be `O(1)` if sorted in‑place).

---

## Follow-Up Questions

- How would the solution change if the number of subarrays `k` is arbitrary?
- Can you solve the problem in `O(n)` time without sorting?

---

## Key Takeaway

> **Cost = nums[0] + two smallest values from the rest. The split points can be anywhere, so just pick the two cheapest starting elements.**