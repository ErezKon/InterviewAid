# 294. Flip Game II

**Difficulty:** 🟡 Medium
**Companies:** Google, Tiktok

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

You are given a string consisting only of the characters `+` and `-`. Two players take turns; on each turn a player must choose any occurrence of the substring `"++"` and replace it with `"--"`. The player who cannot make a move loses. Return **true** if the starting player can guarantee a win assuming both play optimally.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"++++"` | `true` | Starting player can flip the middle `++` to `--`, leaving `+--+` where the opponent has no winning move. |
| `"+++++"` | `false` | Any first move leaves a position where the opponent can force a win. |

---

## 3. Approach

Use recursive backtracking with memoization. For each possible move (each `"++"` substring), generate the next state by flipping it to `"--"`. If any resulting state is a losing position for the opponent, the current state is winning.

```text
FUNCTION canWin(state, memo):
    IF state IN memo: RETURN memo[state]
    FOR i ← 0 TO LENGTH(state) - 2:
        IF state[i:i+2] == '++':
            next ← state[0:i] + '--' + state[i+2:]
            IF NOT canWin(next, memo):
                memo[state] ← true
                RETURN true
    END FOR
    memo[state] ← false
    RETURN false
```

---

## 4. Walkthrough

Take the initial state `"++++"`.

| Step | Current State | Action | Resulting State |
|------|---------------|--------|-----------------|
| 1 | `++++` | Flip positions 2‑3 (`++` → `--`) | `+--+` |
| 2 | `+--+` | Opponent has no `++` to flip → loses | — |

Since the first player can force a state with no moves for the opponent, the initial state is winning.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(2^n) worst‑case without memoization; with memoization each unique state is evaluated once, giving O(S) where S is the number of reachable states (≤ 2^n). |
| **Space** | O(S) for memo table plus recursion stack depth O(n). |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return the **minimum number of moves** required for the first player to win?
2. Can the problem be solved in polynomial time using combinatorial game theory (e.g., Grundy numbers)?
3. How does the solution change if flipping `"--"` to `"++"` is also allowed?

---

## 7. Key Takeaway

> Model the game as a recursive state‑space search. If any move leads to a losing position for the opponent, the current player can force a win. Memoization dramatically reduces repeated work.
