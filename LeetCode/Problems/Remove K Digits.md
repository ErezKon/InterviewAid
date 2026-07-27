# 402. Remove K Digits

**Difficulty:** 🟡 Medium
**Acceptance:** 33.0%
**LeetCode:** [https://leetcode.com/problems/remove-k-digits](https://leetcode.com/problems/remove-k-digits)
**Companies:** Accenture, Adobe, Amazon, Bloomberg, Bytedance, Coupang, Deloitte, Google, Huawei, Josh Technology, Meta, Microsoft, Oracle, Park, Phonepe, Samsung, Snapchat, Snowflake, Tiktok, Walmart Labs, Zeta, Zoho, Zopsmart

---

## 1. Problem Description

Given string `num` and integer `k`, remove `k` digits to make the smallest possible number.

---

## 2. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION removeKdigits(num, k):
    stack = []

    FOR digit IN num:
        WHILE k > 0 AND stack AND stack.TOP() > digit:
            stack.POP()
            k -= 1
        stack.PUSH(digit)

    // Remove remaining digits from the end
    WHILE k > 0:
        stack.POP()
        k -= 1

    // Remove leading zeros
    result = JOIN(stack).LSTRIP('0')

    RETURN result IF result ELSE "0"
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Greedy + monotonic stack: remove digits that are larger than the next digit (greedy choice for smallest result). Process left to right, maintaining an increasing stack.
