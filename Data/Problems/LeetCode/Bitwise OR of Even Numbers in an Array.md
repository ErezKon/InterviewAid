# 3688. Bitwise OR of Even Numbers in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array](https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array)
**Companies:** Meta, Microsoft

---

## 1. Problem Description

Given an array `nums`, return the bitwise OR of all even numbers. If no even numbers exist, return 0.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3,4]` | `6` | Even numbers are `2` and `4`. `2 | 4 = 6` |
| `[1,3,5]` | `0` | No even numbers, so result is `0` |
| `[0,2,6]` | `6` | `0 | 2 | 6 = 6` |

---

## 2. Approach: Filter + OR — O(n) ✅

```text
FUNCTION bitwiseORofEvenNumbers(nums):
    // accumulate OR of even numbers
    SET result ← 0
    FOR num IN nums:
        IF num % 2 == 0:
            SET result ← result OR num
    RETURN result
```

---

## Walkthrough

Consider the array `[1,2,3,4]`:
1. Initialize `result = 0`.
2. `1` is odd → skip.
3. `2` is even → `result = 0 OR 2 = 2`.
4. `3` is odd → skip.
5. `4` is even → `result = 2 OR 4 = 6`.
6. End of array, return `6`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

* How would you modify the solution to return the bitwise AND of all even numbers?
* Can you solve the problem in a single pass without using extra variables?
* What if the array is extremely large and stored on disk? Discuss streaming approaches.

---

## Key Takeaway

> Simple linear scan: filter even numbers and accumulate their bitwise OR.
