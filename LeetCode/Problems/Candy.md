# 135. Candy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/candy](https://leetcode.com/problems/candy)
**Companies:** Accenture, Amazon, Bending Spoons, Bloomberg, Dropbox, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Oracle, Phonepe, Roku, Salesforce, Sap, Tiktok, Uber, Urban Company, Visa, Walmart Labs

---

## 1. Problem Description

Give candies to `n` children with ratings. Each child gets ≥ 1. A child with a higher rating than a neighbor must get more candies. Return minimum total.

---

## 2. Approach: Two Passes — O(n) ✅

```
FUNCTION candy(ratings):
    n = len(ratings)
    candies = [1] * n

    // Left to right: handle right neighbors
    FOR i ← 1 TO n - 1:
        IF ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    // Right to left: handle left neighbors
    FOR i ← n - 2 DOWN TO 0:
        IF ratings[i] > ratings[i + 1]:
            candies[i] = MAX(candies[i], candies[i + 1] + 1)

    RETURN SUM(candies)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Two greedy passes: left-to-right ensures right-neighbor constraint, right-to-left ensures left-neighbor constraint. Take the max at each position.
