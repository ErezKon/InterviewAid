# 3199. Count Triplets with Even XOR Set Bits I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i](https://leetcode.com/problems/count-triplets-with-even-xor-set-bits-i)
**Companies:** Amazon

---

## Problem Description

Same as version II but with small constraints, allowing brute force O(n³).

---

## Approach

```
FUNCTION countTriplets(a, b, c):
    count = 0
    FOR x IN a:
        FOR y IN b:
            FOR z IN c:
                IF popcount(x ^ y ^ z) % 2 == 0: count += 1
    RETURN count
```

Or use the O(n) parity trick from version II: count even/odd popcount per array.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) brute force or O(n) with parity |
| **Space** | O(1) |

---

## Key Takeaway

> **Small constraints allow brute force, but the parity-based O(n) solution from version II works here too.**
