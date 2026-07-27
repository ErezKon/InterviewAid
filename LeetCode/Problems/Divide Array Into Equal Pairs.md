# 2206. Divide Array Into Equal Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divide-array-into-equal-pairs](https://leetcode.com/problems/divide-array-into-equal-pairs)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given an array of `2n` integers, return `true` if you can divide it into `n` pairs such that each pair consists of equal elements.

---

## Approach: Frequency Check ✅

```
FUNCTION divideArray(nums):
    RETURN all(c % 2 == 0 for c in Counter(nums).values())
```

Every element must appear an even number of times to form pairs.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Count frequencies |
| **Space** | O(n) | Counter |

---

## Key Takeaway

> **Pairing requires even frequency for every value — one-liner with a Counter check.**
