# 2059. Minimum Operations to Convert Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-convert-number](https://leetcode.com/problems/minimum-operations-to-convert-number)
**Companies:** Google

---

## Problem Description
You are given a **0-indexed** integer array `nums` containing **distinct** numbers, an integer `start`, and an integer `goal`. There is an integer `x` that is initially set to `start`, and you want to perform operations on `x` such that it is converted to `goal`. You can perform the following operation repeatedly on the number `x`:

If `0 <= x <= 1000`, then for any index `i` in the array (`0 <= i < nums.length`), you can set `x` to any of the following:

- `x + nums[i]`
- `x - nums[i]`
- `x ^ nums[i]` (bitwise-XOR)

Note that you can use each `nums[i]` any number of times in any order. Operations that set `x` to be out of the range `0 <= x <= 1000` are valid, but no more operations can be done afterward.

Return *the **minimum** number of operations needed to convert* `x = start` *into* `goal`*, and* `-1` *if it is not possible*.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-10^9 <= nums[i], goal <= 10^9`
- `0 <= start <= 1000`
- `start != goal`
- All the integers in `nums` are distinct.

## Examples

```
Example 1:
  Input: nums = [2,4,12], start = 2, goal = 12
  Output: 2
  Explanation: We can go from 2 → 14 → 12 with the following 2 operations.
  - 2 + 12 = 14
  - 14 - 2 = 12
```

```
Example 2:
  Input: nums = [3,5,7], start = 0, goal = -4
  Output: 2
  Explanation: We can go from 0 → 3 → -4 with the following 2 operations.
  - 0 + 3 = 3
  - 3 - 7 = -4
  Note that the last operation sets x out of the range 0 <= x <= 1000, which is valid.
```

```
Example 3:
  Input: nums = [2,8,16], start = 0, goal = 1
  Output: -1
  Explanation: There is no way to convert 0 into 1.
```

## Approach
The optimal strategy is to always divide by the largest prime factor, which reduces the number most quickly. Compute the prime factorization, then the answer equals the total count of prime factors (with multiplicity).

```text
FUNCTION minOperations(num):
    IF num = 1: RETURN 0
    SET ops ← 0
    SET divisor ← 2
    WHILE divisor * divisor ≤ num:
        WHILE num MOD divisor = 0:
            SET num ← num / divisor
            SET ops ← ops + 1
        SET divisor ← divisor + 1
    IF num > 1: // remaining prime factor
        SET ops ← ops + 1
    RETURN ops
```

## Walkthrough
| Step | num before | divisor | Action | num after | ops |
|------|------------|---------|--------|-----------|-----|
| 1 | 12 | 2 | divide while divisible | 3 | 2 |
| 2 | 3 | 3 | divide once | 1 | 3 |
Result = 3 operations.

## Complexity Analysis
Time: O(√n) for trial division. Space: O(1).

## Follow-Up Questions
- How would you handle very large `num` where trial division is too slow?
- What if you could also multiply by a divisor instead of dividing?
- Can you compute the sequence of divisors used?

## Key Takeaway
The minimum number of operations equals the total number of prime factors (including repeats); dividing by each prime factor reduces the number optimally.
