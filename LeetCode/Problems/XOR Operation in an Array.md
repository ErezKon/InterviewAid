# 1486. XOR Operation in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/xor-operation-in-an-array](https://leetcode.com/problems/xor-operation-in-an-array)
**Companies:** Google, Walmart Labs

---

## Problem Description
Given two integers `n` and `start`, generate an array where the i-th element is `start + 2*i` for `0 ≤ i < n`. Return the bitwise XOR of all elements in the array.

## Examples
- **Example 1:** `n = 5, start = 0` → array `[0,2,4,6,8]`, XOR = `8`.
- **Example 2:** `n = 4, start = 3` → array `[3,5,7,9]`, XOR = `8`.

## Approach
The XOR of a sequence with a constant step of 2 can be derived from patterns of XOR over consecutive integers. Compute XOR of numbers from `start` to `start + 2*(n-1)` stepping by 2 using properties of XOR on even/odd positions.

```text
FUNCTION xorOperation(n, start):
    // Compute XOR of numbers start, start+2, ..., start+2*(n-1)
    SET result ← 0
    FOR i ← 0 TO n-1:
        SET value ← start + 2 * i
        SET result ← result XOR value
    RETURN result
```

## Walkthrough
| i | value (`start + 2*i`) | result after XOR |
|---|----------------------|-----------------|
| 0 | 0                    | 0               |
| 1 | 2                    | 2               |
| 2 | 4                    | 6               |
| 3 | 6                    | 0               |
| 4 | 8                    | 8               |

The final result is `8`.

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(1) – only constant extra variables.

## Follow-Up Questions
- How would you compute the result in O(1) time using XOR patterns?
- What if the step size is not 2 but an arbitrary `k`?
- Can you extend the solution to handle large `n` (up to 10⁹) efficiently?

## Key Takeaway
XOR over a regularly spaced sequence can be simplified by exploiting XOR’s bitwise properties and patterns.
