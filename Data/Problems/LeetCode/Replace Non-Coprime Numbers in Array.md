# 2197. Replace Non-Coprime Numbers in Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/replace-non-coprime-numbers-in-array](https://leetcode.com/problems/replace-non-coprime-numbers-in-array)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Uber

---
## Table of Contents

- **[Problem Description](#problem-description)**
- **[Examples](#examples)**
- **[Key Insight](#key-insight)**
- **[Approach](#approach)**
- **[Pseudocode](#pseudocode)**
- **[Walkthrough](#walkthrough)**
- **[Complexity Analysis](#complexity-analysis)**
- **[Follow-Up Questions](#follow-up-questions)**
- **[Key Takeaway](#key-takeaway)**

## Problem Description

You are given an array of integers `nums`. Perform the following steps:

- Find **any** two **adjacent** numbers in `nums` that are **non-coprime**.
- If no such numbers are found, **stop** the process.
- Otherwise, delete the two numbers and **replace** them with their **LCM (Least Common Multiple)**.
- **Repeat** this process as long as you keep finding two adjacent non-coprime numbers.

Return *the **final** modified array.* It can be shown that replacing adjacent non-coprime numbers in **any** arbitrary order will lead to the same result.

The test cases are generated such that the values in the final array are **less than or equal** to `10^8`.

Two values `x` and `y` are **non-coprime** if `GCD(x, y) > 1` where `GCD(x, y)` is the **Greatest Common Divisor** of `x` and `y`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- The test cases are generated such that the values in the final array are **less than or equal** to `10^8`.

## Examples

**Example 1:**
```
Input: nums = [6,4,3,2,7,6,2]
Output: [12,7,6]
Explanation: - (6, 4) are non-coprime with LCM(6, 4) = 12. Now, nums = [12,3,2,7,6,2].
- (12, 3) are non-coprime with LCM(12, 3) = 12. Now, nums = [12,2,7,6,2].
- (12, 2) are non-coprime with LCM(12, 2) = 12. Now, nums = [12,7,6,2].
- (6, 2) are non-coprime with LCM(6, 2) = 6. Now, nums = [12,7,6].
There are no more adjacent non-coprime numbers in nums.
Thus, the final modified array is [12,7,6].
Note that there are other ways to obtain the same resultant array.
```

**Example 2:**
```
Input: nums = [2,2,1,1,3,3,3]
Output: [2,1,1,3]
Explanation: - (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3,3].
- (3, 3) are non-coprime with LCM(3, 3) = 3. Now, nums = [2,2,1,1,3].
- (2, 2) are non-coprime with LCM(2, 2) = 2. Now, nums = [2,1,1,3].
There are no more adjacent non-coprime numbers in nums.
Thus, the final modified array is [2,1,1,3].
Note that there are other ways to obtain the same resultant array.
```

## Key Insight

Use a stack. After pushing a number, keep merging the top two elements while their gcd is greater than 1, replacing them with their lcm. Because the lcm can interact with the previous element, keep checking until the top two are coprime.

## Approach

- Iterate from left to right, pushing each number onto a stack.
- While the top two elements share a gcd > 1:
  - Compute `g = gcd(a, b)` and `l = a / g * b`.
  - Replace the pair with `l` by assigning it to the new top, then continue checking with the next element below.
- Each merge decreases the number of elements or increases the top value to absorb factors, and the process terminates when all adjacent pairs are coprime.

## Pseudocode

```
FUNCTION replaceNonCoprimes(nums):
    stack = []
    FOR num IN nums:
        stack.PUSH(num)
        WHILE len(stack) >= 2:
            g = GCD(stack[-1], stack[-2])
            IF g == 1: BREAK
            stack[-2] = LCM(stack[-2], stack[-1])
            stack.POP()
    RETURN stack
```

Stack-based: keep merging top two elements if GCD > 1.


## Walkthrough

Example: `nums = [6, 4, 3, 2, 7, 6, 2]`

- Push 6 → `[6]`
- Push 4 → `[6,4]`, `gcd(6,4)=2` → merge to `lcm=12` → `[12]`
- Push 3 → `[12,3]`, `gcd(12,3)=3` → merge to `12` → `[12]`
- Push 2 → `[12,2]`, `gcd(12,2)=2` → merge to `12` → `[12]`
- Push 7 → `[12,7]` (coprime)
- Push 6 → `[12,7,6]`, `gcd(7,6)=1` (stop)
- Push 2 → `[12,7,6,2]`, `gcd(6,2)=2` → merge to `6` → `[12,7,6]`

Final: `[12,7,6]`.

## Complexity Analysis

- Time: `O(n log A)` where `A = max(nums)` due to gcd computations; each element is pushed once and merged a limited number of times (amortized linear passes).
- Space: `O(n)` for the stack in the worst case (if few merges happen).

## Follow-Up Questions

- Why LCM when merging?  LCM preserves divisibility of both numbers and matches the problem’s rule.
- How to avoid overflow?  Compute `a / gcd(a,b) * b` and use big integers (e.g., Python). In fixed-width languages, check bounds or use arbitrary precision.
- Does merge order matter?  The stack re-checks neighbors so all necessary adjacent merges occur; the process is confluent under repeated lcm merges.
- In-place variant?  A write-pointer with backtracking gcd checks mimics the stack approach with similar complexity.

## Key Takeaway

A stack with repeated gcd-then-lcm merges produces a final array where all adjacent pairs are coprime, in near-linear time.
