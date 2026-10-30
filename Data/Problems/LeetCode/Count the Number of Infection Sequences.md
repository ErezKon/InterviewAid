# 2954. Count the Number of Infection Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-infection-sequences](https://leetcode.com/problems/count-the-number-of-infection-sequences)
**Companies:** Meta, Microsoft, Oracle, Sap, Tekion, Uber

---

## Problem Description

You are given an integer `n` and an array `sick` sorted in increasing order, representing positions of infected people in a line of `n` people.

At each step, **one** uninfected person **adjacent** to an infected person gets infected. This process continues until everyone is infected.

An **infection sequence** is the order in which uninfected people become infected, excluding those initially infected.

Return the number of different infection sequences possible, modulo `10^9 + 7`.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= sick.length <= n - 1`
- `0 <= sick[i] <= n - 1`
- `sick` is sorted in increasing order.

---

## Examples

```
Example 1:
  Input: n = 5, sick = [0,4]
  Output: 4
  Explanation: There is a total of 6 different sequences overall.
  Valid infection sequences are [1,2,3], [1,3,2], [3,2,1] and [3,1,2].
  [2,3,1] and [2,1,3] are not valid infection sequences because the person at index 2 cannot be infected at the first step.
```

```
Example 2:
  Input: n = 4, sick = [1]
  Output: 3
  Explanation: There is a total of 6 different sequences overall.
  Valid infection sequences are [0,2,3], [2,0,3] and [2,3,0].
  [3,2,0], [3,0,2], and [0,3,2] are not valid infection sequences because the infection starts at the person at index 1, then the order of infection is 2, then 3, and hence 3 cannot be infected earlier than 2.
```

---

## Approach

```text
FUNCTION numberOfSequence(n, sick):
    MOD ← 1_000_000_007
    gaps ← []
    // left gap size
    gaps.ADD(sick[0])
    // internal gaps between consecutive sick children
    FOR i ← 1 TO LENGTH(sick) - 1 DO
        gaps.ADD(sick[i] - sick[i-1] - 1)
    // right gap size
    gaps.ADD(n - 1 - sick[-1])

    total ← SUM(gaps)
    // multinomial coefficient for interleaving gap infections
    result ← factorial(total)
    FOR g IN gaps DO
        result ← result / factorial(g)
    // internal gaps contribute 2^(g-1) orderings each
    FOR i ← 1 TO LENGTH(gaps) - 2 DO
        g ← gaps[i]
        IF g > 0 THEN
            result ← result * pow(2, g-1)
    RETURN result MOD MOD
```

---

## Walkthrough

Take `n = 5, sick = [2]`.

1. Gaps: left = 2 (positions 0,1), right = 3 (positions 3,4). No internal gaps.
2. Total = 5. Multinomial(5;2,3) = 5! / (2!·3!) = 10.
3. Since there are no internal gaps, no extra factor of 2.
4. Result = 10 mod MOD = 10. (The example output uses a different initial configuration; this walkthrough shows the counting process.)

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with precomputed factorials |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would the solution change if infection could spread to both neighbors simultaneously?
2. Can we extend the approach to a circular arrangement of children?
3. What if each child has a different infection time delay?

---

## Key Takeaway

> **Infection sequence counting: decompose into independent gaps. Internal gaps have 2^(g-1) orderings (infected from both sides). Combine with multinomial coefficient for interleaving.**
