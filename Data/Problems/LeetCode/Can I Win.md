# 464. Can I Win

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/can-i-win](https://leetcode.com/problems/can-i-win)
**Companies:** Amazon, Google, Linkedin, Meta

---

## Problem Description
Two players take turns choosing a distinct integer from 1 to `maxChoosableInteger`. The chosen number is added to a running total. The player who makes the total reach or exceed `desiredTotal` wins. Assuming both play optimally, determine whether the first player can force a win.

## Examples
- Input: `maxChoosableInteger = 10`, `desiredTotal = 11`
  Output: `false`
  Explanation: No matter what first player picks, second player can pick a number to reach 11.
- Input: `maxChoosableInteger = 10`, `desiredTotal = 0`
  Output: `true`
  Explanation: Desired total is already met before any move.

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

## Follow‑Up Questions
1. How would the solution change if numbers could be reused after a certain cooldown?
2. Can you extend the algorithm to return the winning move sequence?
3. What is the impact of increasing `maxChoosableInteger` beyond 20 on performance?

## Key Takeaway
Representing the set of chosen numbers as a bitmask enables memoized recursion to solve the game optimally despite exponential state space.
