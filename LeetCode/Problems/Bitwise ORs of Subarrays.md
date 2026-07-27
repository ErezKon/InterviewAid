# 898. Bitwise ORs of Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-ors-of-subarrays](https://leetcode.com/problems/bitwise-ors-of-subarrays)
**Companies:** Amazon, Bloomberg, Bny Mellon, Google, Meta, Microsoft, Tcs

---

## Approach: Rolling Set — O(n log max) ✅

```
FUNCTION subarrayBitwiseORs(arr):
    result = set()
    current = set()

    FOR num IN arr:
        current = {num | x for x in current} | {num}
        result |= current

    RETURN len(result)
```

`current` holds all distinct OR values of subarrays ending here. Size is bounded by O(log max) since OR only adds bits.
