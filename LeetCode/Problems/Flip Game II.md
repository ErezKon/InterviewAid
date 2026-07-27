# 294. Flip Game II

**Difficulty:** 🟡 Medium

**Companies:** Google, Tiktok
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Game Theory / Backtracking ✅](#3-approach-game-theory--backtracking-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a string of `+` and `-`, two players take turns flipping `++` to `--`. The player who cannot move loses. Determine if the first player can guarantee a win.

---

## 2. Key Insight

> A position is a **winning** position if there exists at least one move leading to a **losing** position for the opponent. Use backtracking with memoization.

---

## 3. Approach: Game Theory / Backtracking ✅

```
FUNCTION canWin(currentState):
    FOR i ← 0 TO len(currentState) - 2:
        IF currentState[i:i+2] == '++':
            next = currentState[:i] + '--' + currentState[i+2:]
            IF NOT canWin(next): RETURN true
    RETURN false
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n!) worst case, improved with memoization |
| **Space** | O(n) — recursion depth |

---

## 5. Key Takeaway

> Classic **combinatorial game theory**: if any move leads to a losing state for the opponent, the current player wins. Add memoization on the state string for efficiency.
