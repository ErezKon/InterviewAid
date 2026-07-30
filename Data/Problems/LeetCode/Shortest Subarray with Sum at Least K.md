# 862. Shortest Subarray with Sum at Least K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Phonepe

---

## Problem Description

Given an integer array `nums` and an integer `k`, return the length of the shortest non-empty subarray of `nums` with a sum of **at least** `k`. If no such subarray exists, return `-1`.

A **subarray** is a contiguous part of an array.

### Examples

**Example 1:**
- **Input:** `nums = [1]`, `k = 1`
- **Output:** `1`

**Example 2:**
- **Input:** `nums = [1,2]`, `k = 4`
- **Output:** `-1`

**Example 3:**
- **Input:** `nums = [2,-1,2]`, `k = 3`
- **Output:** `3`
- **Explanation:** The entire array sums to `3`, which is the shortest subarray with sum ≥ 3.

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁵ <= nums[i] <= 10⁵`
- `1 <= k <= 10⁹`

---

## Approach: Monotonic Deque on Prefix Sums — O(n) ✅

A simple sliding window fails because `nums` can contain **negative numbers** (shrinking the window doesn't guarantee the sum decreases). Instead, use prefix sums with a monotonic deque.

**Key insight:** For each index `i`, we want the largest `j < i` such that `prefix[i] - prefix[j] >= k`. A deque of indices with strictly increasing prefix values lets us efficiently find and discard candidates.

```
FUNCTION shortestSubarray(nums, k):
    n ← LENGTH(nums)
    prefix = [0] * (n + 1)
    FOR i ← 0 TO n-1: prefix[i+1] = prefix[i] + nums[i]

    deque = []
    minLen = infinity

    FOR i ← 0 TO n:
        WHILE deque AND prefix[i] - prefix[deque.FRONT()] >= k:
            minLen = MIN(minLen, i - deque.POPLEFT())
        WHILE deque AND prefix[i] <= prefix[deque.BACK()]:
            deque.POPBACK()
        deque.PUSHBACK(i)

    RETURN minLen IF minLen != infinity ELSE -1
```

### Walkthrough — `nums = [2,-1,2]`, `k = 3`

| prefix | `[0, 2, 1, 3]` |
|--------|-----------------|

| i | deque (indices) | prefix[front] | prefix[i]-prefix[front] >= 3? | action | minLen |
|---|-----------------|---------------|-------------------------------|--------|--------|
| 0 | [0]             | —             | —                             | push 0 | ∞      |
| 1 | [0,1]           | 0             | 2-0=2 No                      | push 1 | ∞      |
| 2 | [2]             | 0             | 1-0=1 No                      | pop back (1≤2), pop back (1≤0? no), push 2 | ∞ |
| 3 | []              | 0 (from [0,2])| 3-0=3 Yes → pop 0, len=3      | then 3-1=2 No, push 3 | 3 |

Result: `3`

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Follow-up

- Without negative numbers, a standard sliding window suffices (see **Minimum Size Subarray Sum**).
- The deque ensures each index is pushed/popped at most once, giving O(n) amortized.
