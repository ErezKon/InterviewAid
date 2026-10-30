# 1018. Binary Prefix Divisible By 5

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-prefix-divisible-by-5](https://leetcode.com/problems/binary-prefix-divisible-by-5)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

You are given a binary array `nums` (**0-indexed**).

We define `x_i` as the number whose binary representation is the subarray `nums[0..i]` (from most-significant-bit to least-significant-bit).

- For example, if `nums = [1,0,1]`, then `x_0 = 1`, `x_1 = 2`, and `x_2 = 5`.

Return *an array of booleans *`answer`* where *`answer[i]`* is *`true`* if *`x_i`* is divisible by *`5`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: nums = [0,1,1]
Output: [true,false,false]
Explanation: The input numbers in binary are 0, 01, 011; which are 0, 1, and 3 in base-10.
Only the first number is divisible by 5, so answer[0] is true.
```

**Example 2:**
```
Input: nums = [1,1,1]
Output: [false,false,false]
```

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