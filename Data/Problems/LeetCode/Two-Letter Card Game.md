# 3664. Two-Letter Card Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-letter-card-game](https://leetcode.com/problems/two-letter-card-game)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given a deck of cards represented by a string array `cards`, and each card displays two lowercase letters.

You are also given a letter `x`. You play a game with the following rules:

- Start with 0 points.
- On each turn, you must find two **compatible** cards from the deck that both contain the letter `x` in any position.
- Remove the pair of cards and earn **1 point**.
- The game ends when you can no longer find a pair of compatible cards.

Return the **maximum** number of points you can gain with optimal play.

Two cards are **compatible** if the strings differ in **exactly** 1 position.

**Constraints:**
- `2 <= cards.length <= 10^5`
- `cards[i].length == 2`
- Each `cards[i]` is composed of only lowercase English letters between `'a'` and `'j'`.
- `x` is a lowercase English letter between `'a'` and `'j'`.

## Examples

**Example 1:**
```
Input: cards = ["aa","ab","ba","ac"], x = "a"
Output: 2
Explanation:
- On the first turn, select and remove cards "ab" and "ac", which are compatible because they differ at only index 1.
- On the second turn, select and remove cards "aa" and "ba", which are compatible because they differ at only index 0.
Because there are no more compatible pairs, the total score is 2.
```

**Example 2:**
```
Input: cards = ["aa","ab","ba"], x = "a"
Output: 1
Explanation:
- On the first turn, select and remove cards "aa" and "ba".
Because there are no more compatible pairs, the total score is 1.
```

**Example 3:**
```
Input: cards = ["aa","ab","ba","ac"], x = "b"
Output: 0
Explanation: The only cards that contain the character 'b' are "ab" and "ba". However, they differ in both indices, so they are not compatible. Thus, the output is 0.
```

## Approach
Only cards containing `x` matter. Split them into three kinds:

- `"xx"` — count `c`.
- `"x?"` with `? ≠ x` — the **left** side, grouped by the second letter (`L[letter]`).
- `"?x"` with `? ≠ x` — the **right** side, grouped by the first letter (`R[letter]`).

Compatibility (differ in exactly one position):
- Two left cards `"xa"`, `"xb"` are compatible iff `a ≠ b`; same for two right cards.
- A left card and a right card (`"xa"` vs `"bx"`, both letters `≠ x`) differ in both positions — never compatible.
- `"xx"` is compatible with every left and every right card, but not with another `"xx"`.

So each `"xx"` card behaves like an extra letter group on whichever side it is used. For one side with group sizes summing to `s` and largest group `m`, the maximum number of pairs of cards from different groups is the classic `min(⌊s/2⌋, s − m)`.

Enumerate `k` = number of `"xx"` cards assigned to the left side (the other `c − k` go right) and take the best `f(L ∪ {k}) + f(R ∪ {c − k})`.

```text
FUNCTION score(cards, x):
    L ← array[10] of 0;  R ← array[10] of 0;  c ← 0
    FOR each card (a, b) IN cards:
        IF a = x AND b = x: c ← c + 1
        ELSE IF a = x: L[b] ← L[b] + 1
        ELSE IF b = x: R[a] ← R[a] + 1

    FUNCTION pairs(groups):            // max pairs with different groups
        s ← sum(groups);  m ← max(groups)
        RETURN min(s DIV 2, s - m)

    best ← 0
    FOR k ← 0 TO c:
        best ← max(best, pairs(L + [k]) + pairs(R + [c - k]))
    RETURN best
```

## Walkthrough
Example 1: `cards = ["aa","ab","ba","ac"]`, `x = "a"`.

- `"aa"` → `c = 1`; `"ab"`, `"ac"` → left `L = {b:1, c:1}`; `"ba"` → right `R = {b:1}`.

| k (xx to left) | Left groups | pairs(left) | Right groups | pairs(right) | Total |
|---|---|---|---|---|---|
| 0 | {1, 1} | min(1, 2−1) = 1 | {1, xx:1} | min(1, 2−1) = 1 | **2** |
| 1 | {1, 1, xx:1} | min(1, 3−1) = 1 | {1} | min(0, 0) = 0 | 1 |

Maximum = `2` (pairs `"ab"+"ac"` and `"aa"+"ba"`). Output: `2`.

## Complexity Analysis
- **Time:** `O(n + c · σ)` with `σ = 10` letters — one pass to count, then `c + 1` evaluations of `pairs`, each `O(σ)`. (The objective is concave in `k`, so a ternary search or direct greedy would also work, but the linear scan is already fast.)
- **Space:** `O(σ)`.

## Follow-Up Questions
1. Why does `min(⌊s/2⌋, s − m)` give the maximum number of pairs from different groups? (If the largest group exceeds half, each of its partners is used once; otherwise a perfect/near-perfect pairing exists by pairing across a sorted arrangement.)
2. Can you avoid enumerating `k`? (Greedily give `"xx"` cards to the side whose largest group dominates, then split the remainder evenly — the objective is concave in `k`.)
3. How would the solution change if cards had length 3 and compatibility still meant differing in exactly one position?

## Key Takeaway
Classify cards by the position of `x`: left and right cards never interact, each side reduces to "pair items of different colors" with the closed form `min(⌊s/2⌋, s − max)`, and the wildcard `"xx"` cards are just an extra color whose split between the sides is enumerated.
