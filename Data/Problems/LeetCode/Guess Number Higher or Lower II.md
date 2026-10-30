# 375. Guess Number Higher or Lower II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-number-higher-or-lower-ii](https://leetcode.com/problems/guess-number-higher-or-lower-ii)
**Companies:** Bloomberg, Google, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

We are playing the Guessing Game. The game will work as follows:

- I pick a number between `1` and `n`.
- You guess a number.
- If you guess the right number, **you win the game**.
- If you guess the wrong number, then I will tell you whether the number I picked is **higher or lower**, and you will continue guessing.
- Every time you guess a wrong number `x`, you will pay `x` dollars. If you run out of money, **you lose the game**.

Given a particular `n`, return *the minimum amount of money you need to **guarantee a win regardless of what number I pick***.

**Constraints:**
- `1 <= n <= 200`

---

## 2. Examples

**Example 1:**
```
Input: n = 10
Output: 16
Explanation: The winning strategy is as follows:
- The range is [1,10]. Guess 7.
    - If this is my number, your total is $0. Otherwise, you pay $7.
    - If my number is higher, the range is [8,10]. Guess 9.
        - If this is my number, your total is $7. Otherwise, you pay $9.
        - If my number is higher, it must be 10. Guess 10. Your total is $7 + $9 = $16.
        - If my number is lower, it must be 8. Guess 8. Your total is $7 + $9 = $16.
    - If my number is lower, the range is [1,6]. Guess 3.
        - If this is my number, your total is $7. Otherwise, you pay $3.
        - If my number is higher, the range is [4,6]. Guess 5.
            - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $5.
            - If my number is higher, it must be 6. Guess 6. Your total is $7 + $3 + $5 = $15.
            - If my number is lower, it must be 4. Guess 4. Your total is $7 + $3 + $5 = $15.
        - If my number is lower, the range is [1,2]. Guess 1.
            - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $1.
            - If my number is higher, it must be 2. Guess 2. Your total is $7 + $3 + $1 = $11.
The worst case in all these scenarios is that you pay $16. Hence, you only need $16 to guarantee a win.
```

**Example 2:**
```
Input: n = 1
Output: 0
Explanation: There is only one possible number, so you can guess 1 and not have to pay anything.
```

**Example 3:**
```
Input: n = 2
Output: 1
Explanation: There are two possible numbers, 1 and 2.
- Guess 1.
    - If this is my number, your total is $0. Otherwise, you pay $1.
    - If my number is higher, it must be 2. Guess 2. Your total is $1.
The worst case is that you pay $1.
```

---

## 3. Approach

```
FUNCTION getMoneyAmount(n):
    dp = (n+2) × (n+2) zeros
    FOR length ← 2 TO n:
        FOR lo ← 1 TO n - length + 1:
            hi = lo + length - 1
            dp[lo][hi] = infinity
            FOR k ← lo TO hi:
                cost = k + MAX(dp[lo][k-1], dp[k+1][hi])
                dp[lo][hi] = MIN(dp[lo][hi], cost)
    RETURN dp[1][n]
```

---

## 4. Walkthrough

Consider `n = 4`.

| Step | Guess `k` | Cost paid | Left sub‑range | Right sub‑range | Worst‑case cost |
|------|-----------|-----------|----------------|-----------------|-----------------|
| 1 | 1 | 1 | [] | [2,4] | 1 + dp[2][4]
| 2 | 2 | 2 | [1] | [3,4] | 2 + max(dp[1][1], dp[3][4])
| 3 | 3 | 3 | [1,2] | [4] | 3 + max(dp[1][2], dp[4][4])
| 4 | 4 | 4 | [1,3] | [] | 4 + dp[1][3]

Evaluating the DP values gives `dp[1][4] = 4`, meaning the optimal worst‑case cost is `4`.

---

## 5. Complexity Analysis

- **Time:** `O(n³)` – three nested loops over interval length, start index, and guess position.
- **Space:** `O(n²)` – DP table storing results for each interval.

---

## 6. Follow-Up Questions

- How would the solution change if the cost of a guess were a constant instead of the guessed number?
- Can the DP be optimized to `O(n²)` using monotonicity of the optimal `k`?
- How does this problem relate to the classic “optimal binary search tree” problem?

---

## 7. Key Takeaway

> **Minimax interval DP**: minimize over guesses `k`, maximize over outcomes (left/right). Classic game theory DP pattern.
