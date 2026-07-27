# 1726. Tuple with Same Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tuple-with-same-product](https://leetcode.com/problems/tuple-with-same-product)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION tupleSameProduct(nums):
    products = Counter()
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            products[nums[i] * nums[j]] += 1

    count = 0
    FOR c IN products.values():
        count += c * (c - 1) / 2 * 8    // each pair of pairs → 8 tuples

    RETURN count
```
