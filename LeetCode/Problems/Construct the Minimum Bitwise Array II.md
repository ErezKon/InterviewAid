# 3315. Construct the Minimum Bitwise Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii](https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii)
**Companies:** Amazon, Aon, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, produce a new array `result` where each element is the smallest integer obtainable by flipping exactly one bit of the corresponding element in `nums`. If an element equals `2`, the operation is impossible and the result should be `-1`.

## Examples
**Example 1:**
```
nums = [5, 2, 7]
result = [4, -1, 6]
Explanation:
- 5 (101) → flip lowest set bit → 100 (4)
- 2 cannot be transformed → -1
- 7 (111) → flip lowest set bit → 110 (6)
```
**Example 2:**
```
nums = [1, 8]
result = [0, 0]
```

## Approach
For each number:
1. If the number is `2`, output `-1`.
2. Otherwise locate the first `0` bit (starting from LSB). Clear the bit just below it, which is equivalent to `num XOR (1 << (pos-1))`.

```text
FUNCTION minBitwiseArray(nums):
    SET result ← []
    FOR each num IN nums:
        IF num = 2:
            APPEND -1 TO result
        ELSE:
            SET bit ← 0
            WHILE (num AND (1 << bit)) ≠ 0:
                SET bit ← bit + 1
            SET transformed ← num XOR (1 << (bit - 1))
            APPEND transformed TO result
    RETURN result
```

## Walkthrough
| num | binary | first zero bit index | transformed |
|-----|--------|----------------------|-------------|
| 5   | 101    | 1 (second bit)       | 5 XOR 2 = 4 |
| 7   | 111    | 3 (fourth bit)       | 7 XOR 4 = 3 |
| 1   | 001    | 1                    | 1 XOR 1 = 0 |

## Complexity Analysis
- **Time:** `O(|nums| * B)` where `B` is number of bits (≤ 31). Effectively linear in the array size.
- **Space:** `O(|nums|)` for the output array.

## Follow‑Up Questions
1. How would the algorithm adapt to handle negative integers using two's complement?
2. Can you compute the result in‑place without extra storage?
3. What if we need to flip exactly two bits to achieve the minimum value?

## Key Takeaway
Identifying the lowest zero bit and clearing the preceding set bit yields the minimal value achievable by a single‑bit flip.
