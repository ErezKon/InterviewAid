# 901. Online Stock Span

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/online-stock-span](https://leetcode.com/problems/online-stock-span)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft

---

## Approach: Monotonic Stack — O(1) amortized ✅

```
CLASS StockSpanner:
    CONSTRUCTOR:
        stack = []    // (price, span)

    FUNCTION next(price):
        span = 1
        WHILE stack AND stack.TOP().price <= price:
            span += stack.POP().span
        stack.PUSH((price, span))
        RETURN span
```

Each element pushed/popped at most once → amortized O(1).
