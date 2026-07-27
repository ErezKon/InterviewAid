# 697. Degree of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/degree-of-an-array](https://leetcode.com/problems/degree-of-an-array)
**Companies:** Amazon, Bloomberg, Expedia, Ge Digital, Google, Microsoft, Oracle, Paypal, Rivian, Sofi, Turing

---

## Problem Description

Find the shortest contiguous subarray that has the same degree (max frequency) as the full array.

---

## Approach

```
FUNCTION findShortestSubArray(nums):
    first = {}; last = {}; count = {}
    FOR i, num IN enumerate(nums):
        IF num NOT IN first: first[num] = i
        last[num] = i
        count[num] = count.get(num, 0) + 1

    degree = MAX(count.values())
    RETURN MIN(last[num] - first[num] + 1 for num if count[num] == degree)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Track first/last occurrence and frequency per element. Shortest subarray with same degree = min span `(last - first + 1)` among max-frequency elements.**
