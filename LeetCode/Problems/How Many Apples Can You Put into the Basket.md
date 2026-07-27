# 1196. How Many Apples Can You Put into the Basket

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket](https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket)
**Companies:** Virtu

---

## 1. Problem Description

Given apple weights, find the maximum number that fit in a basket with capacity 5000.

## 2. Approach: Sort Greedy — O(n log n) ✅

```
FUNCTION maxNumberOfApples(weight):
    SORT weight
    total ← 0; count ← 0
    FOR w IN weight DO
        IF total + w > 5000: BREAK
        total += w; count += 1
    RETURN count
```

## Key Takeaway

> Sort by weight ascending, greedily add lightest apples until capacity is reached.
