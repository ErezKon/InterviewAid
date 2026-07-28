# 3314. Construct the Minimum Bitwise Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-i](https://leetcode.com/problems/construct-the-minimum-bitwise-array-i)
**Companies:** Amazon, Aon, Bloomberg, Google, Microsoft

---

## Problem Description
Given an integer array `nums`, create a new array `result` where each element is the smallest possible integer that can be obtained by flipping exactly one bit of the corresponding element in `nums`. If an element is `2`, the operation is impossible and the result should be `-1`.

## Examples
**Example 1:**
```
nums = [5, 2, 7]
result = [4, -1, 6]
Explanation:
- 5 (binary 101) → flip the lowest set bit (2^0) → 100 (4)
- 2 cannot be transformed → -1
- 7 (111) → flip the lowest set bit → 110 (6)
```
**Example 2:**
```
nums = [1, 8]
result = [0, 0]
```

## Approach
For each number:
1. If the number equals `2`, output `-1`.
2. Otherwise find the position of the lowest `0` bit (the first bit that is not set). The answer is obtained by clearing the bit just below it, which is equivalent to `num ^ (1 << (pos-1))`.

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
            // clear the bit just below the first zero bit
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
- **Time:** `O(|nums| * B)` where `B` is the number of bits (≤ 31 for 32‑bit ints). Effectively `O(|nums|)`.
- **Space:** `O(|nums|)` for the output array.

## Follow‑Up Questions
1. How would the solution change if the numbers could be negative (two's complement representation)?
2. Can you compute the result in‑place without extra storage?
3. What if we need to flip **exactly two** bits to obtain the minimum value?

## Key Takeaway
Finding the lowest zero bit and clearing the preceding set bit yields the minimal value achievable by a single‑bit flip.
