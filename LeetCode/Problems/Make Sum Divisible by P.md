# 1590. Make Sum Divisible by P

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-sum-divisible-by-p](https://leetcode.com/problems/make-sum-divisible-by-p)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Phonepe, Samsung

---

## Approach: Prefix Sum Modulo + Hash Map — O(n) ✅

```
FUNCTION minSubarray(nums, p):
    remainder = SUM(nums) % p
    IF remainder == 0: RETURN 0

    prefixMod = {0: -1}
    currMod = 0
    minLen = n

    FOR i, num IN enumerate(nums):
        currMod = (currMod + num) % p
        target = (currMod - remainder) % p
        IF target IN prefixMod:
            minLen = MIN(minLen, i - prefixMod[target])
        prefixMod[currMod] = i

    RETURN minLen IF minLen < n ELSE -1
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Find shortest subarray whose sum ≡ remainder (mod p). Same pattern as subarray sum equals k but with modular arithmetic. Hash map stores last index of each prefix mod.
