# 1652. Defuse the Bomb

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/defuse-the-bomb](https://leetcode.com/problems/defuse-the-bomb)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a circular array `code` and integer `k`: if `k > 0`, replace each element with the sum of the next `k` elements; if `k < 0`, sum of the previous `|k|`; if `k == 0`, all zeros.

---

## Approach

```
FUNCTION decrypt(code, k):
    n = len(code)
    result = [0] * n
    IF k == 0: RETURN result

    FOR i ← 0 TO n - 1:
        IF k > 0:
            result[i] = SUM(code[(i+j) % n] for j in range(1, k+1))
        ELSE:
            result[i] = SUM(code[(i+j) % n] for j in range(k, 0))

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × |k|), or O(n) with sliding window |
| **Space** | O(n) |

---

## Key Takeaway

> **Circular array sum: use modular indexing `(i+j) % n`. Optimize from O(nk) to O(n) with a sliding window that adds/removes one element per shift.**
