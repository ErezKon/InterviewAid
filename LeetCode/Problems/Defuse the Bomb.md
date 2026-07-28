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

## Examples

| code | k | Output |
|------|---|--------|
| [5,7,1,4] | 3 | [12,10,16,13] |
| [2,4,9,3] | 0 | [0,0,0,0] |
| [2,4,9,3] | -2 | [12,5,6,13] |

---

## Walkthrough

1. **First example** `code = [5,7,1,4]`, `k = 3`.
2. For index `0`, sum next three elements: `7 + 1 + 4 = 12` → `result[0] = 12`.
3. For index `1`, sum `1 + 4 + 5 = 10` (wrap around) → `result[1] = 10`.
4. Continue similarly for indices `2` and `3` to obtain `[12,10,16,13]`.
5. When `k = 0`, every element becomes `0`.
6. When `k = -2`, sum the two previous elements using modular indexing.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × |k|) naïve, O(n) with sliding window |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the algorithm to handle very large `k` values efficiently?
- Can you solve the problem in-place without extra output array?

---

## Key Takeaway

> **Circular array sum: use modular indexing `(i+j) % n`. Optimize from O(nk) to O(n) with a sliding window that adds/removes one element per shift.**