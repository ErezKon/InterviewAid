# 1352. Product of the Last K Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/product-of-the-last-k-numbers](https://leetcode.com/problems/product-of-the-last-k-numbers)
**Companies:** Amazon, Apple, Bloomberg, Bytedance, Google, Meta, Microsoft, Starbucks, Target, Tekion, Tiktok

---

## Approach: Prefix Products — O(1) per operation ✅

```
CLASS ProductOfNumbers:
    CONSTRUCTOR:
        prefix = [1]    // prefix products

    FUNCTION add(num):
        IF num == 0:
            prefix = [1]    // reset on zero
        ELSE:
            prefix.ADD(prefix.LAST() * num)

    FUNCTION getProduct(k):
        IF k >= len(prefix): RETURN 0    // zero in the last k
        RETURN prefix.LAST() / prefix[len(prefix) - 1 - k]
```

Zero resets the prefix. If k extends past the reset, product is 0.
