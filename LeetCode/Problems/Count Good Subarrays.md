# 3878. Count Good Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-good-subarrays](https://leetcode.com/problems/count-good-subarrays)
**Companies:** Harness, Microsoft

---

## 1. Problem Description

Given an array `nums`, count subarrays that satisfy a "good" condition based on specific criteria (e.g., having at least `k` pairs of equal elements, or some aggregate property).

---

## 2. Key Insight

> Use a **sliding window** approach. As the window expands, track the count of qualifying pairs. When the condition is met, all extensions to the right also satisfy it, so add `n - right` to the count.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION countGoodSubarrays(nums, k):
    n = len(nums)
    freq = Counter()
    pairs = 0
    left = 0
    count = 0
    
    FOR right FROM 0 TO n-1:
        pairs += freq[nums[right]]  // new pairs formed
        freq[nums[right]] += 1
        
        WHILE pairs >= k:
            count += n - right  // all subarrays [left..right..n-1] are good
            freq[nums[left]] -= 1
            pairs -= freq[nums[left]]
            left += 1
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Sliding window for "at least k" problems: when the condition is satisfied, count all valid extensions (`n - right`), then shrink from the left.
