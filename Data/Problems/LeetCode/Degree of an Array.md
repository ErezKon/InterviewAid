# 697. Degree of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/degree-of-an-array](https://leetcode.com/problems/degree-of-an-array)
**Companies:** Amazon, Bloomberg, Expedia, Ge Digital, Google, Microsoft, Oracle, Paypal, Rivian, Sofi, Turing

---

## Problem Description

Find the shortest contiguous subarray that has the same degree (max frequency) as the full array.

---

## Examples

| Input | Output |
|-------|--------|
| `[1,2,2,3,1]` | `2` |
| `[1,2,2,3,1,4,2]` | `6` |

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

## Walkthrough

1. Iterate through the array while recording the first index, last index, and frequency of each number.
2. After the pass, determine the degree = maximum frequency.
3. For every number whose frequency equals the degree, compute the length of its subarray `last - first + 1`.
4. Return the smallest such length.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the solution to also return the actual subarray(s) achieving the minimum length?
- Can you solve it in a single pass without storing both first and last indices separately?

---

## Key Takeaway

> **Track first/last occurrence and frequency per element. Shortest subarray with same degree = min span `(last - first + 1)` among max-frequency elements.**