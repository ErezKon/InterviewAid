# 464. Can I Win

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-i-win](https://leetcode.com/problems/can-i-win)
**Companies:** Amazon, Google, Linkedin, Meta

---

## Problem Description
In the "100 game" two players take turns adding, to a running total, any integer from `1` to `10`. The player who first causes the running total to **reach or exceed** 100 wins.

What if we change the game so that players **cannot** re-use integers?

For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

Given two integers `maxChoosableInteger` and `desiredTotal`, return `true` if the first player to move can force a win, otherwise, return `false`. Assume both players play **optimally**.

**Constraints:**
- `1 <= maxChoosableInteger <= 20`
- `0 <= desiredTotal <= 300`

## Examples
```
Example 1:
  Input: maxChoosableInteger = 10, desiredTotal = 11
  Output: false
  Explanation:
  No matter which integer the first player choose, the first player will lose.
  The first player can choose an integer from 1 up to 10.
  If the first player choose 1, the second player can only choose integers from 2 up to 10.
  The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
  Same with other integers chosen by the first player, the second player will always win.
```

```
Example 2:
  Input: maxChoosableInteger = 10, desiredTotal = 0
  Output: true
```

```
Example 3:
  Input: maxChoosableInteger = 10, desiredTotal = 1
  Output: true
```

## Approach: Bitmask DP — O(2^n) ✅

```text
FUNCTION canIWin(maxChoosableInteger, desiredTotal):
    // Quick impossibility check
    IF maxChoosableInteger * (maxChoosableInteger + 1) / 2 < desiredTotal:
        RETURN false
    memo ← MAP()

    FUNCTION dfs(usedMask, remaining):
        IF usedMask IN memo:
            RETURN memo[usedMask]
        FOR i FROM 1 TO maxChoosableInteger:
            bit ← 1 << i
            IF usedMask AND bit: CONTINUE
            // If picking i reaches target or forces opponent loss
            IF i >= remaining OR NOT dfs(usedMask OR bit, remaining - i):
                memo[usedMask] ← true
                RETURN true
        memo[usedMask] ← false
        RETURN false

    RETURN dfs(0, desiredTotal)
```

## Walkthrough (first example)
1. Total possible sum = 55, which is ≥ 11, so continue.
2. Start with `usedMask = 0`, `remaining = 11`.
3. Try picking `i = 1` → remaining 10, recurse.
4. Opponent can then pick `10` and win, so branch returns false.
5. All choices lead to opponent win → first player loses → return `false`.

## Complexity Analysis
- **Time:** O(2^n) where n = `maxChoosableInteger` (state space of used masks).
- **Space:** O(2^n) for memoization.

## Follow-Up Questions
1. How would the solution change if numbers could be reused after a certain cooldown?
2. Can you extend the algorithm to return the winning move sequence?
3. What is the impact of increasing `maxChoosableInteger` beyond 20 on performance?

## Key Takeaway
Representing the set of chosen numbers as a bitmask enables memoized recursion to solve the game optimally despite exponential state space.
