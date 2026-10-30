# 719. Find K-th Smallest Pair Distance

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-k-th-smallest-pair-distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Uber

---

## Problem Description

The **distance of a pair** of integers `a` and `b` is defined as the absolute difference between `a` and `b`.

Given an integer array `nums` and an integer `k`, return *the* `k^th` *smallest **distance among all the pairs*** `nums[i]` *and* `nums[j]` *where* `0 <= i < j < nums.length`.

**Constraints:**

- `n == nums.length`
- `2 <= n <= 10^4`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= n * (n - 1) / 2`

---

## Examples

```
Example 1:
  Input: nums = [1,3,1], k = 1
  Output: 0
  Explanation: Here are all the pairs:
  (1,3) -> 2
  (1,1) -> 0
  (3,1) -> 2
  Then the 1st smallest distance pair is (1,1), and its distance is 0.
```

```
Example 2:
  Input: nums = [1,1,1], k = 2
  Output: 0
```

```
Example 3:
  Input: nums = [1,6,1], k = 3
  Output: 5
```

---

## Approach: Binary Search + Two Pointers — O(n log n + n log W) ✅

```text
FUNCTION smallestDistancePair(nums, k):
    SORT nums
    lo ← 0
    hi ← nums[-1] - nums[0]
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        count ← countPairs(nums, mid)
        IF count >= k:
            hi ← mid
        ELSE:
            lo ← mid + 1
    RETURN lo

FUNCTION countPairs(nums, maxDist):
    count ← 0
    left ← 0
    FOR right ← 0 TO n - 1:
        WHILE nums[right] - nums[left] > maxDist:
            left ← left + 1
        count ← count + (right - left)
    RETURN count
```

---

## Walkthrough

| Step | Sorted nums | lo | hi | mid | countPairs(mid) | Action |
|------|-------------|----|----|-----|----------------|--------|
| 1 | [1,1,3] | 0 | 2 | 1 | 2 (pairs ≤1: (1,1)) | count < k → lo = 2 |
| 2 | [1,1,3] | 2 | 2 | - | - | lo == hi → answer 2 |

The algorithm narrows the distance range until `lo` equals the k‑th smallest distance.

---

## Complexity Analysis

- **Time:** Sorting O(n log n) plus binary search over distance range O(log W) each counting pairs in O(n) → O(n log n + n log W).
- **Space:** O(1) extra space besides the input array.

---

## Follow-Up Questions

1. How would you modify the solution to return the actual pair(s) achieving the k‑th distance?
2. Can this approach be adapted for multidimensional points with Euclidean distance?
3. What if the array is streamed and cannot be fully stored in memory?

---

## Key Takeaway

> **Binary search on the answer (distance), count pairs ≤ mid using sorted array + two pointers. Classic "binary search on answer" pattern.**