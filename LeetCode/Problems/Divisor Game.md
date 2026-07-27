# 1025. Divisor Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/divisor-game](https://leetcode.com/problems/divisor-game)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Math / Game Theory](#approach-math--game-theory--o1-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Alice and Bob take turns (Alice first). On each turn, the current player picks `x` with `0 < x < n` and `n % x == 0`, then replaces `n` with `n - x`. The player who cannot move (n becomes 0 or 1 with no valid x) **loses**. Return `true` if Alice wins with optimal play.

**Constraints:**
- `1 <= n <= 1000`

---

## Examples

```
Input: n = 2
Output: true
Explanation: Alice picks 1, n becomes 1, Bob can't move → Alice wins.

Input: n = 3
Output: false
Explanation: Alice must pick 1 (only divisor < 3 dividing 3), n becomes 2, Bob picks 1, n becomes 1, Alice can't move.
```

---

## Key Insight

> **Even → Alice wins. Odd → Alice loses.** Why? An odd number only has odd divisors. Odd − odd = even. So if Alice starts with odd, she hands Bob an even number. Even numbers have 1 as a divisor, so the player with even can always subtract 1 to give opponent odd. The even-player controls the game.

---

## Approach: Math / Game Theory — O(1) ✅

```
FUNCTION divisorGame(n):
    RETURN n % 2 == 0
```

---

## Walkthrough

```
n = 4 (even → Alice wins):
  Alice: pick 1 → n=3 (odd, Bob's turn)
  Bob:   pick 1 → n=2 (even, Alice's turn)
  Alice: pick 1 → n=1 (Bob can't move → Alice wins ✅)

n = 5 (odd → Alice loses):
  Alice: must pick 1 or 5 (but x<n, so only 1) → n=4 (even, Bob's turn)
  Bob:   pick 1 → n=3, Alice: pick 1 → n=2, Bob: pick 1 → n=1
  Alice can't move → Alice loses ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Follow-Up Questions

**Q1: Can you prove this with DP?**
> `dp[1] = false, dp[2] = true`. For `dp[i]`, check all divisors `x` of `i`: if any `dp[i-x] == false` (losing for next player), then `dp[i] = true`. Pattern confirms: even = true, odd = false.

**Q2: Why can't Alice escape the odd/even cycle?**
> Odd numbers only have odd divisors. Subtracting odd from odd = even. Even numbers have 1 as a divisor (odd), so subtracting 1 gives odd. The parity always alternates predictably.

---

## Key Takeaway

> **Game theory + parity: even starts always win because the player with even controls the game by always handing odd to the opponent. Classic Nim-style observation.**
