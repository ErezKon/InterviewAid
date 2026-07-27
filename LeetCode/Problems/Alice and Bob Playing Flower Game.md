# 3021. Alice and Bob Playing Flower Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alice-and-bob-playing-flower-game](https://leetcode.com/problems/alice-and-bob-playing-flower-game)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Rubrik

---

## 1. Problem Description

Alice and Bob play a game with flowers on a line. Alice picks `x` flowers from the left (1 ≤ x ≤ n), Bob picks `y` from the right (1 ≤ y ≤ m). Alice wins if the total `x + y` is **odd**. Return the number of `(x, y)` pairs where Alice wins.

---

## 2. Key Insight

> `x + y` is odd when exactly one of `x, y` is odd and the other is even. Count: (odd x choices × even y choices) + (even x choices × odd y choices).

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION flowerGame(n, m):
    // Alice wins when total flowers is odd
    // x + y is odd when one is even and one is odd
    RETURN (n / 2) * ((m + 1) / 2) + ((n + 1) / 2) * (m / 2)
```

- Odd numbers in `[1..n]` = `⌈n/2⌉ = (n+1)/2`
- Even numbers in `[1..n]` = `⌊n/2⌋ = n/2`

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Parity counting: when you need "sum is odd," count (odd × even) + (even × odd). Pure math — no iteration needed.
