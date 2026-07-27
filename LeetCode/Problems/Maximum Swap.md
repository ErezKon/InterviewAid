# 670. Maximum Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-swap](https://leetcode.com/problems/maximum-swap)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Tcs, Tiktok

---

## Approach: Greedy — O(d) ✅

```
FUNCTION maximumSwap(num):
    digits = list(str(num))
    lastIdx = {int(d): i for i, d in enumerate(digits)}

    FOR i, d IN enumerate(digits):
        FOR k ← 9 DOWN TO int(d) + 1:
            IF lastIdx.get(k, -1) > i:
                SWAP(digits[i], digits[lastIdx[k]])
                RETURN int(JOIN(digits))

    RETURN num
```

For each digit from left, try to swap with the rightmost larger digit.
