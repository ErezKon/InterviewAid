# 2972. Count the Number of Incremovable Subarrays II

**Difficulty:** 🔴 Hard
**Companies:** Apple, De Shaw, Ibm

---

## Problem Description

An **incremovable** subarray is one whose removal leaves the remaining elements strictly increasing. Count incremovable subarrays.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 10
Explanation: All possible subarrays can be removed while the remaining array stays strictly increasing.
```

**Example 2:**
```
Input: nums = [4,3,2,1]
Output: 4
Explanation: Only removing the whole array or any single element results in a strictly increasing remaining array.
```

---

## Walkthrough

The solution finds the longest increasing prefix and suffix, then uses two pointers to count valid removals.
1. Identify `left` – the last index of the maximal increasing prefix.
2. Identify `right` – the first index of the maximal increasing suffix.
3. If the whole array is already increasing, answer is n·(n+1)/2 (all subarrays).
4. Initialize result with removals that delete the prefix entirely.
5. Move pointer `i` over the prefix and advance `right` until `nums[i] < nums[right]`.
6. For each `i`, add the number of valid suffix starts (`n - right + 1`).
This counts every subarray whose removal connects a valid prefix to a valid suffix.

---

## Approach

```
FUNCTION incremovableSubarrayCount(nums):
    n = LENGTH(nums)
    // Find longest increasing prefix
    left = 0
    WHILE left < n-1 AND nums[left] < nums[left+1]: left ← left + 1
    IF left == n-1: RETURN n * (n + 1) / 2

    // Find longest increasing suffix
    right = n-1
    WHILE right > 0 AND nums[right-1] < nums[right]: right ← right - 1

    result = (n - right + 1)  // remove prefix entirely
    i = 0
    WHILE i ≤ left DO
        WHILE right < n AND nums[i] ≥ nums[right]: right ← right + 1
        result ← result + (n - right + 1)
        i ← i + 1
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the algorithm for the “non‑decreasing” version of the problem?
2. Can the approach be extended to handle duplicate values in the array?
3. What changes are needed if we must also output the actual subarrays, not just the count?

---

## Key Takeaway

> **Incremovable subarrays: find the increasing prefix and suffix, then two‑pointer to count valid connections. The key constraint is `prefix_last < suffix_first` after removal.**