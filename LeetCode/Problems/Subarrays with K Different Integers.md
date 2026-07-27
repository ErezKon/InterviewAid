# 992. Subarrays with K Different Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarrays-with-k-different-integers](https://leetcode.com/problems/subarrays-with-k-different-integers)
**Companies:** Amazon, Bloomberg, Capital One, Google, Hashedin, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Oracle, Roblox, Salesforce, Servicenow, Squarepoint Capital, Tiktok, Uber

---

## Approach: At Most K — At Most (K-1) — O(n) ✅

```
FUNCTION subarraysWithKDistinct(nums, k):
    RETURN atMost(nums, k) - atMost(nums, k - 1)

FUNCTION atMost(nums, k):
    count = {}
    left = 0
    result = 0

    FOR right ← 0 TO n - 1:
        count[nums[right]] += 1
        WHILE len(count) > k:
            count[nums[left]] -= 1
            IF count[nums[left]] == 0:
                DELETE count[nums[left]]
            left += 1
        result += right - left + 1

    RETURN result
```

### Key Insight

Exactly K = At Most K - At Most (K-1). The "at most" version is a standard sliding window.
