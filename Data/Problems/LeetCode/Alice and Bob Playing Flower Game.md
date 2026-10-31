# 3021. Alice and Bob Playing Flower Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alice-and-bob-playing-flower-game](https://leetcode.com/problems/alice-and-bob-playing-flower-game)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Rubrik

---

## 1. Problem Description

Alice and Bob are playing a turn-based game on a field, with two lanes of flowers between them. There are `x` flowers in the first lane between Alice and Bob, and `y` flowers in the second lane between them.

The game proceeds as follows:

1. Alice takes the first turn.
2. In each turn, a player must choose either one of the lane and pick one flower from that side.
3. At the end of the turn, if there are no flowers left at all in either lane, the **current** player captures their opponent and wins the game.

Given two integers, `n` and `m`, the task is to compute the number of possible pairs `(x, y)` that satisfy the conditions:

- Alice must win the game according to the described rules.
- The number of flowers `x` in the first lane must be in the range `[1,n]`.
- The number of flowers `y` in the second lane must be in the range `[1,m]`.

Return *the number of possible pairs* `(x, y)` *that satisfy the conditions mentioned in the statement*.

**Constraints:**
- `1 ≤ n, m ≤ 10⁵`

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

```
Example 1:
  Input: n = 3, m = 2
  Output: 3
  Explanation: The following pairs satisfy conditions described in the statement: (1,2), (3,2), (2,1).

Example 2:
  Input: n = 1, m = 1
  Output: 0
  Explanation: No pairs satisfy the conditions described in the statement.
```

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

- **Time:** O(1) – only constant-time arithmetic operations.
- **Space:** O(1) – no additional data structures.

---

## 7. Follow-Up Questions

- How would the solution change if the win condition required `x + y` to be even?
- What if Alice could also pick from the right and Bob from the left?
- Can you extend the problem to multiple players taking turns?

---

## Key Takeaway

> Parity counting: when you need "sum is odd," count (odd × even) + (even × odd). Pure math — no iteration needed.
