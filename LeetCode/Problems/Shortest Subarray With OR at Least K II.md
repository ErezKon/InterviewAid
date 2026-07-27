# 3097. Shortest Subarray With OR at Least K II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii](https://leetcode.com/problems/shortest-subarray-with-or-at-least-k-ii)
**Companies:** Google, Meta, Microsoft, Mitsogo

---

```
FUNCTION minimumSubarrayLength(nums, k):
    bits = [0] * 30; left = 0; minLen = infinity
    FOR right ← 0 TO len(nums) - 1:
        FOR b ← 0 TO 29:
            IF nums[right] & (1 << b): bits[b] += 1
        WHILE bitsToNum(bits) >= k:
            minLen = MIN(minLen, right - left + 1)
            FOR b ← 0 TO 29:
                IF nums[left] & (1 << b): bits[b] -= 1
            left += 1
    RETURN minLen IF minLen != infinity ELSE -1
```
