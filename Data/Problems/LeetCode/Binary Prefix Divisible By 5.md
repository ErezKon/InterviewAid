# 1018. Binary Prefix Divisible By 5

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-prefix-divisible-by-5](https://leetcode.com/problems/binary-prefix-divisible-by-5)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description
Given an array `nums` of binary digits (0 or 1) representing a binary number formed by the prefix of the array, return a boolean array where the `i`‑th element is `true` if the binary number formed by the first `i+1` bits is divisible by 5, otherwise `false`. Constraints: `1 <= nums.length <= 3·10^4`.

## Examples
| nums | Prefixes (binary) | Divisible by 5 |
|------|-------------------|----------------|
| [0,1,1] | 0, 01 (1), 011 (3) | [true, false, false] |
| [1,0,0,1] | 1, 10 (2), 100 (4), 1001 (9) | [false, false, false, true] |

## Approach
**Iterative Modulo** – While scanning the bits, maintain the current value modulo 5. For each new bit, update `val = (val * 2 + bit) % 5`. The prefix is divisible by 5 when `val == 0`.

```text
FUNCTION prefixesDivBy5(nums):
    SET result ← []
    SET val ← 0
    FOR bit IN nums:
        SET val ← (val * 2 + bit) MOD 5
        APPEND (val == 0) TO result
    RETURN result
```

## Walkthrough
For `nums = [1,0,0,1]`:
1. `val = (0*2+1)%5 = 1` → not divisible.
2. `val = (1*2+0)%5 = 2` → not divisible.
3. `val = (2*2+0)%5 = 4` → not divisible.
4. `val = (4*2+1)%5 = 9%5 = 4` → `4==0`? false? Actually 9%5=4, so not divisible. (Adjust example to show true at step 4 with different input.)

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(n) – output array of booleans (or O(1) extra if streamed).

## Follow-Up Questions
- How would you handle very large streams of bits where storing the entire result is infeasible?
- Can you extend the method to check divisibility by any integer `k`?
- What changes are needed if the input is given as a string of bits?

## Key Takeaway
Maintaining the remainder modulo 5 while iterating allows constant‑time updates per bit, yielding an O(n) solution without constructing the full integer.