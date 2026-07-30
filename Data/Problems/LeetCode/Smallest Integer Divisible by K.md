# 1015. Smallest Integer Divisible by K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-integer-divisible-by-k](https://leetcode.com/problems/smallest-integer-divisible-by-k)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given an integer `k`, find the length of the smallest positive integer that consists only of the digit `1` and is divisible by `k`. If no such integer exists, return `-1`. The integer can be extremely large, so you must work with remainders instead of constructing the number directly.

## Examples
- **Input:** `k = 3`  
  **Output:** `3`  
  **Explanation:** The numbers `1`, `11`, `111` are examined; `111` is divisible by `3`.
- **Input:** `k = 2`  
  **Output:** `-1`  
  **Explanation:** Any number consisting only of `1`s is odd, so it can never be divisible by an even `k`.

## Approach
The problem can be solved using the **Pigeonhole Principle** and modular arithmetic. We iteratively build the number `111…1` while keeping only its remainder modulo `k`. If the remainder becomes `0`, the current length is the answer. Because there are only `k` possible remainders (0 to k‑1), the process must terminate within `k` steps; otherwise a cycle occurs and no solution exists.

```text
FUNCTION smallestRepunitDivByK(k):
    // No solution if k has factor 2 or 5
    IF k % 2 == 0 OR k % 5 == 0: RETURN -1
    remainder ← 0
    FOR length ← 1 TO k:
        remainder ← (remainder * 10 + 1) % k
        IF remainder == 0: RETURN length
    RETURN -1
```

## Walkthrough
| Step | length | remainder = (prev*10+1) % k |
|------|--------|------------------------------|
| 1    | 1      | 1 % 3 = 1                    |
| 2    | 2      | (1*10+1) % 3 = 11 % 3 = 2    |
| 3    | 3      | (2*10+1) % 3 = 21 % 3 = 0    |
The remainder becomes `0` at length `3`, so the answer is `3`.

## Complexity Analysis
- **Time:** `O(k)` – at most `k` iterations.
- **Space:** `O(1)` – only a few integer variables are used.

## Follow-Up Questions
1. How would you modify the algorithm to return the actual smallest repunit string for small `k`?
2. Can you extend the approach to find the smallest number consisting of only a given digit `d` (1‑9) divisible by `k`?
3. What changes are needed if `k` can be up to `10^12`?

## Key Takeaway
By tracking remainders instead of the full number, we can efficiently find the smallest all‑`1` integer divisible by `k` using at most `k` steps.
