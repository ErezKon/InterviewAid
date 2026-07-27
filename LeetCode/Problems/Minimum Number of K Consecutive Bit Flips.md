# 995. Minimum Number of K Consecutive Bit Flips

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips](https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Approach: Greedy + Sliding Window — O(n) ✅

```
FUNCTION minKBitFlips(nums, k):
    flipped = [0] * n
    flipCount = 0; result = 0

    FOR i ← 0 TO n - 1:
        IF i >= k: flipCount -= flipped[i - k]

        IF (nums[i] + flipCount) % 2 == 0:
            IF i + k > n: RETURN -1
            flipped[i] = 1
            flipCount += 1
            result += 1

    RETURN result
```

Greedy: flip from left whenever a 0 is found (considering accumulated flips).
