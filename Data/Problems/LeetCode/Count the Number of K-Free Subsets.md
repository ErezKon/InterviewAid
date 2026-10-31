# 2638. Count the Number of K-Free Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-k-free-subsets](https://leetcode.com/problems/count-the-number-of-k-free-subsets)
**Companies:** Amazon

---

## Problem Description

You are given an integer array `nums`, which contains **distinct** elements and an integer `k`.

A subset is called a **k-Free** subset if it contains **no** two elements with an absolute difference equal to `k`. Notice that the empty set is a **k-Free** subset.

Return *the number of **k-Free** subsets of* `nums`.

A **subset** of an array is a selection of elements (possibly none) of the array.

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 1000`
- `1 <= k <= 1000`

---

## Examples

```
Example 1:
  Input: nums = [5,4,6], k = 1
  Output: 5
  Explanation: There are 5 valid subsets: {}, {5}, {4}, {6} and {4, 6}.
```

```
Example 2:
  Input: nums = [2,3,5,8], k = 5
  Output: 12
  Explanation: There are 12 valid subsets: {}, {2}, {3}, {5}, {8}, {2, 3}, {2, 3, 5}, {2, 5}, {2, 5, 8}, {2, 8}, {5, 8} and {3, 5}.
```

```
Example 3:
  Input: nums = [10,5,9,11], k = 20
  Output: 16
  Explanation: All subsets are valid. Since the total count of subsets is 2^4 = 16, so the answer is 16.
```

---

## Key Insight

Group elements by their value modulo `k`. Within each group, sort the numbers – conflicts only exist between consecutive elements that differ by exactly `k`. Each group becomes an independent chain where no two adjacent elements can both be chosen, which is exactly the **house robber** DP problem. Multiply the results of all groups.

---

## Approach

1. **Group by modulo** – `groups[value % k]` collects numbers sharing the same remainder.
2. **Sort each group** – ensures that potential conflicts appear as adjacent elements.
3. **DP on each chain** – for a sorted chain, use a house-robber style DP to count subsets that avoid picking adjacent elements (difference `k`).
4. **Combine groups** – because groups are independent, multiply their counts together and subtract one to exclude the empty subset.

---

## Walkthrough

Consider `nums = [1,2,3,4]`, `k = 1`.
1. Grouping by `value % 1` puts all numbers in a single group: `[1,2,3,4]`.
2. Sorted chain: `[1,2,3,4]`.
3. DP steps (prev = ways without last element, curr = ways including up to current):
   - Start: `prev = 1` (empty), `curr = 2` (choose or skip first element).
   - i=1 (value 2): difference = 1 → cannot take both 1 and 2 → `prev, curr = curr, prev + curr` → `prev=2`, `curr=3`.
   - i=2 (value 3): difference = 1 → `prev, curr = curr, prev + curr` → `prev=3`, `curr=5`.
   - i=3 (value 4): difference = 1 → `prev, curr = curr, prev + curr` → `prev=5`, `curr=8`.
4. Result for the group = `curr = 8`. Subtract empty subset → `7` k-free subsets.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) – sorting each group |
| **Space** | O(n) – storing groups and DP variables |

---

## Follow-Up Questions

1. How would the solution change if the constraint were “no two elements have a difference **less than or equal to** `k`”?
2. Can you solve the problem in O(n) time without sorting by using a hash-set based greedy approach?
3. How would you extend the algorithm to handle duplicate values in `nums`?

---

## Key Takeaway

> **K-free subsets can be solved by grouping numbers by modulo `k`, sorting each group, and applying a house-robber DP on each independent chain. Multiplying the group results yields the total count.**