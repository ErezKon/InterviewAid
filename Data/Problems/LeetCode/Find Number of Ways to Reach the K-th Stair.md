# 3154. Find Number of Ways to Reach the K-th Stair

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair](https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-stair)
**Companies:** Amazon

---

## Problem Description
> *Note: the previous description in this file (climb 1 or 2 steps — that is #70 Climbing Stairs) was a different problem. The Approach/Walkthrough below still solve #70; the official solution enumerates the number of up-jumps `j` and counts placements of down-steps with `C(j + 1, d)` where `d = 2^j - k`.*

You are given a **non-negative** integer `k`. There exists a staircase with an infinite number of stairs, with the **lowest** stair numbered 0.

Alice has an integer `jump`, with an initial value of 0. She starts on stair 1 and wants to reach stair `k` using **any** number of **operations**. If she is on stair `i`, in one **operation** she can:

- Go down to stair `i - 1`. This operation **cannot** be used consecutively or on stair 0.
- Go up to stair `i + 2^jump`. And then, `jump` becomes `jump + 1`.

Return the *total* number of ways Alice can reach stair `k`.

**Note** that it is possible that Alice reaches the stair `k`, and performs some operations to reach the stair `k` again.

**Constraints:**
- `0 <= k <= 10^9`

## Examples
```
Example 1:
  Input: k = 0
  Output: 2
  Explanation: The 2 possible ways of reaching stair 0 are:
  - Alice starts at stair 1. Using an operation of the first type, she goes down 1 stair to reach stair 0.
  - Alice starts at stair 1. Using an operation of the first type, she goes down 1 stair to reach stair 0. Using an operation of the second type, she goes up 2^0 stairs to reach stair 1. Using an operation of the first type, she goes down 1 stair to reach stair 0.
```

```
Example 2:
  Input: k = 1
  Output: 4
  Explanation: The 4 possible ways of reaching stair 1 are:
  - Alice starts at stair 1. Alice is at stair 1.
  - Alice starts at stair 1. Down 1 to stair 0, then up 2^0 to stair 1.
  - Alice starts at stair 1. Up 2^0 to stair 2, then down 1 to stair 1.
  - Alice starts at stair 1. Down 1 to stair 0, up 2^0 to stair 1, down 1 to stair 0, up 2^1 to stair 2, down 1 to stair 1.
```

## Approach
The problem follows a classic Fibonacci-like recurrence: `ways[i] = ways[i-1] + ways[i-2]`. Use dynamic programming with O(K) time and O(1) space by keeping only the last two values.

```text
FUNCTION countWays(K):
    IF K == 0: RETURN 1
    SET a ← 1          // ways for step 0
    SET b ← 1          // ways for step 1
    FOR i ← 2 TO K:
        SET c ← (a + b) MOD 1_000_000_007
        SET a ← b
        SET b ← c
    RETURN b
```

## Walkthrough
Consider `K = 4`:
| i | a (ways[i-2]) | b (ways[i-1]) | c = a+b (ways[i]) |
|---|--------------|--------------|-------------------|
| 2 | 1 | 1 | 2 |
| 3 | 1 | 2 | 3 |
| 4 | 2 | 3 | 5 |
The final `b` after the loop is `5`, the answer.

## Complexity Analysis
- **Time:** O(K) – one iteration per stair.
- **Space:** O(1) – only three integer variables.

## Follow-Up Questions
1. What if you can climb up to `m` steps at a time?
2. How would you handle very large `K` (e.g., `10^18`)?
3. Can you compute the answer using matrix exponentiation for faster queries?

## Key Takeaway
The number of ways to reach the K-th stair follows a simple Fibonacci recurrence, allowing an O(K) time and O(1) space solution.
