# 3536. Maximum Product of Two Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-two-digits](https://leetcode.com/problems/maximum-product-of-two-digits)
**Companies:** Google

---

## Problem Description
Given a number `num`, return the **maximum product** of any two of its digits.

## Key Insight
> Extract all digits, find the two largest. Their product is the answer.

## Approach
```
FUNCTION maxProduct(num)
    digits ← extract all digits of num
    SORT digits DESCENDING
    RETURN digits[0] × digits[1]
END FUNCTION
```

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(d log d)** where d = number of digits |
| Space  | **O(d)** |

## Key Takeaway
> **Find two largest digits** — extract digits, sort or track top-2, multiply.
