# 1248. Count Number of Nice Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-nice-subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays)
**Companies:** Amazon, Bloomberg, Deliveroo, Google, Meta, Microsoft, Oracle, Roblox, Tiktok

---

## Approach: atMost(k) - atMost(k-1) — O(n) ✅

```
FUNCTION numberOfSubarrays(nums, k):
    RETURN atMost(nums, k) - atMost(nums, k - 1)

FUNCTION atMost(nums, k):
    left = 0
    count = 0
    odds = 0
    FOR right ← 0 TO n - 1:
        IF nums[right] % 2 == 1: odds += 1
        WHILE odds > k:
            IF nums[left] % 2 == 1: odds -= 1
            left += 1
        count += right - left + 1
    RETURN count
```

Convert "exactly k" to "at most k" minus "at most k-1". Standard sliding window trick.
