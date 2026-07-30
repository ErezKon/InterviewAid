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

```text
FUNCTION flowerGame(n, m):
    // Alice wins when total flowers is odd
    // x + y is odd when one is even and one is odd
    RETURN (n / 2) * ((m + 1) / 2) + ((n + 1) / 2) * (m / 2)
```

- Odd numbers in `[1..n]` = `⌈n/2⌉ = (n+1)/2`
- Even numbers in `[1..n]` = `⌊n/2⌋ = n/2`

---

## 4. Examples

| n | m | Output |
|---|---|--------|
| 2 | 3 | 4 |
| 1 | 1 | 1 |
| 4 | 4 | 8 |

**Explanation:** For `n = 2, m = 3` the odd/even counts are: odd x = 1, even x = 1; odd y = 2, even y = 1. Pairs = (1*1) + (1*2) = 4.

---

## 5. Walkthrough

Consider `n = 4, m = 4`:

1. Count odd numbers in `[1..4]` → 2 (1,3). Even numbers → 2 (2,4).
2. Same counts for `y`.
3. Compute pairs: (odd x × even y) = 2 × 2 = 4.
4. Compute pairs: (even x × odd y) = 2 × 2 = 4.
5. Total winning pairs = 4 + 4 = 8.

Thus the function returns 8.

---

## 6. Complexity Analysis

- **Time:** O(1) – only constant‑time arithmetic operations.
- **Space:** O(1) – no additional data structures.

---

## 7. Follow-Up Questions

- How would the solution change if the win condition required `x + y` to be even?
- What if Alice could also pick from the right and Bob from the left?
- Can you extend the problem to multiple players taking turns?

---

## Key Takeaway

> Parity counting: when you need "sum is odd," count (odd × even) + (even × odd). Pure math — no iteration needed.
