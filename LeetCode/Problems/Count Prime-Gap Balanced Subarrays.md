# 3589. Count Prime-Gap Balanced Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-prime-gap-balanced-subarrays](https://leetcode.com/problems/count-prime-gap-balanced-subarrays)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, count subarrays where the difference between the **largest prime** and **smallest prime** in the subarray is at most `k` (or the subarray has fewer than 2 primes). A subarray is "prime-gap balanced" based on this condition.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
- **Input:** `nums = [1, 2, 3], k = 1`
- **Output:** `5`
- **Explanation:** Subarrays [1], [2], [3], [1,2], [2,3] are balanced. [1,2,3] has primes {2,3}, gap=1 ≤ 1 ✅ → all 6.

---

## Key Insight

Use a **sliding window** with two monotonic structures to track the min and max primes in the current window. Precompute primes using a sieve. For each right endpoint, shrink the left boundary until the prime gap ≤ k.

---

## Approach

```
FUNCTION countBalancedSubarrays(nums, k):
    // Precompute: is each nums[i] prime?
    sieve = SieveOfEratosthenes(MAX(nums))
    primeIndices = [i for i where sieve[nums[i]] == true]

    // Sliding window on prime indices
    count = 0; left = 0
    minDeque = deque()  // increasing primes
    maxDeque = deque()  // decreasing primes

    FOR right ← 0 TO n - 1 DO
        IF sieve[nums[right]] THEN
            // Update deques with nums[right]
            WHILE maxDeque not empty AND nums[maxDeque.back] <= nums[right]:
                maxDeque.popBack()
            maxDeque.pushBack(right)
            WHILE minDeque not empty AND nums[minDeque.back] >= nums[right]:
                minDeque.popBack()
            minDeque.pushBack(right)

        // Shrink until gap ≤ k
        WHILE maxDeque and minDeque not empty AND
              nums[maxDeque.front] - nums[minDeque.front] > k DO
            left = MIN(maxDeque.front, minDeque.front) + 1
            WHILE maxDeque.front < left: maxDeque.popFront()
            WHILE minDeque.front < left: minDeque.popFront()

        count += right - left + 1

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + M) where M = max value for sieve |
| **Space** | O(n + M) |

---

## Key Takeaway

> **Sliding window with monotonic deques for min/max tracking applies to any subarray problem with a bounded range constraint. Precompute the prime sieve, then treat primes as the values to track.**
