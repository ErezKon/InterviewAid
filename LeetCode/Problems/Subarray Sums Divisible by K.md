# 974. Subarray Sums Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subarray-sums-divisible-by-k](https://leetcode.com/problems/subarray-sums-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Hashedin, Jpmorgan, Meta, Microsoft, Tiktok, Uber, Visa, Yandex

---

## Approach: Prefix Sum Modulo — O(n) ✅

```
FUNCTION subarraysDivByK(nums, k):
    count = {0: 1}
    prefixMod = 0
    result = 0

    FOR num IN nums:
        prefixMod = (prefixMod + num) % k
        IF prefixMod < 0: prefixMod += k    // handle negative
        result += count.get(prefixMod, 0)
        count[prefixMod] = count.get(prefixMod, 0) + 1

    RETURN result
```

If two prefix sums have the same remainder mod k, the subarray between them is divisible by k.
