# 679. 24 Game

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/24-game](https://leetcode.com/problems/24-game)
**Companies:** Bloomberg, Google, Meta, Microsoft, Roku, Tiktok, Uber

---

## Table of Contents

- [679. 24 Game](#679-24-game)
  - [Table of Contents](#table-of-contents)
  - [1. Problem Description](#1-problem-description)
  - [2. Examples](#2-examples)
  - [3. Key Insight](#3-key-insight)
  - [4. Approach: Recursive Enumeration — O(1) ✅](#4-approach-recursive-enumeration--o1-)
  - [5. Walkthrough](#5-walkthrough)
  - [6. Complexity Analysis](#6-complexity-analysis)
  - [7. Follow-Up Questions](#7-follow-up-questions)
    - [7.1 Why use floating-point epsilon?](#71-why-use-floating-point-epsilon)
    - [7.2 How many valid orderings are there for non-commutative ops?](#72-how-many-valid-orderings-are-there-for-non-commutative-ops)
    - [7.3 Can you enumerate all expressions that yield 24?](#73-can-you-enumerate-all-expressions-that-yield-24)
    - [7.4 What if we have N cards instead of 4?](#74-what-if-we-have-n-cards-instead-of-4)
  - [8. Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given four cards, each with a number between 1 and 9, determine if you can use `+`, `-`, `*`, `/` and parentheses to make the result equal to **24**.

Each card must be used **exactly once**. Division is real-valued (not integer).

**Constraints:**
- `cards.length == 4`
- `1 ≤ cards[i] ≤ 9`

---

## 2. Examples

```
Example 1:
  Input:  [4, 1, 8, 7]
  Output: true
  Explanation: (8 - 4) * (7 - 1) = 4 * 6 = 24

Example 2:
  Input:  [1, 2, 1, 2]
  Output: false
  Explanation: No combination of operations yields 24.
```

Visual — the recursion tree for `[4, 1, 8, 7]`:
```
[4, 1, 8, 7]
  pick (8, 4), op = -  →  [1, 7, 4]
    pick (7, 1), op = -  →  [4, 6]
      pick (4, 6), op = *  →  [24]  ✅
```

---

## 3. Key Insight

> There are only 4 cards, so the total search space is bounded and small. Pick any 2 cards, apply any of 4 operations (considering both orderings for `-` and `/`), replace them with the result, and recurse on 3 cards → 2 → 1. Use floating-point epsilon for comparison.

---

## 4. Approach: Recursive Enumeration — O(1) ✅

```
FUNCTION judgePoint24(cards):
    IF len(cards) == 1:
        RETURN ABS(cards[0] - 24) < 1e-6

    FOR i, j (pick 2 cards):
        FOR op IN [+, -, *, /]:
            result = apply op to cards[i], cards[j]
            remaining = other cards + [result]
            IF judgePoint24(remaining): RETURN true

    RETURN false
```

**Important details:**
- For `+` and `*`, order doesn't matter (commutative), but for `-` and `/`, try both `a op b` and `b op a`.
- Skip division by zero (`cards[j] == 0`).

---

## 5. Walkthrough

```
cards = [4, 1, 8, 7]

Pick cards[2]=8, cards[0]=4:
  8 - 4 = 4  →  remaining = [1, 7, 4]

  Pick cards[1]=7, cards[0]=1:
    7 - 1 = 6  →  remaining = [4, 6]

    Pick cards[0]=4, cards[1]=6:
      4 * 6 = 24  →  remaining = [24]
      |24 - 24| < 1e-6  →  RETURN true ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) — bounded: C(4,2)·4 × C(3,2)·4 × C(2,2)·4 = 9216 paths max |
| **Space** | O(1) — recursion depth is at most 3 |

The input is always exactly 4 cards, so complexity is constant.

---

## 7. Follow-Up Questions

### 7.1 Why use floating-point epsilon?

Division produces real numbers (e.g., `8/3 = 2.666...`). Chained operations accumulate floating-point error, so we compare with `|result - 24| < 1e-6` instead of exact equality.

### 7.2 How many valid orderings are there for non-commutative ops?

For each pair `(a, b)`, non-commutative ops need both `a-b` and `b-a`, `a/b` and `b/a`. So effectively 6 operations per pair: `+, -, reverse-, *, /, reverse/`.

### 7.3 Can you enumerate all expressions that yield 24?

Yes — instead of returning on the first `true`, collect all successful expression trees. Useful for generating the "24 game" puzzle solutions.

### 7.4 What if we have N cards instead of 4?

Same approach but complexity becomes O(N! × 4^(N-1)), which grows fast. For N > 6-7, you'd need pruning or memoization.

---

## 8. Key Takeaway

> With a small fixed input size (4 cards), brute-force enumeration of all possible expression trees is both correct and efficient. The key is structuring the recursion as "pick 2, combine, recurse on remainder" and handling non-commutative operations carefully.
