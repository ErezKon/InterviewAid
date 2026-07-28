# 1535. Find the Winner of an Array Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-winner-of-an-array-game](https://leetcode.com/problems/find-the-winner-of-an-array-game)
**Companies:** Directi, Jpmorgan, Microsoft, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Linear Scan — O(n) ✅](#3-approach-linear-scan--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

In an array game, the first two elements are compared; the larger stays at front and the smaller goes to the end. The game ends when an element wins `k` consecutive rounds. Return the winner.

**Constraints:**
- `2 <= n <= 10⁵`
- `1 <= k <= 10⁹`

---

## 2. Key Insight

> After one full pass through the array, the maximum element is at the front and will never lose. So if k ≥ n, the answer is the max. Otherwise, simulate and return when any element wins k times.

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION getWinner(arr, k):
    // arr is the input array, k is required consecutive wins
    SET current ← arr[0]
    SET wins ← 0
    FOR i ← 1 TO LENGTH(arr) - 1 DO
        IF arr[i] > current THEN
            SET current ← arr[i]
            SET wins ← 1
        ELSE
            SET wins ← wins + 1
        IF wins = k THEN
            RETURN current
    // If loop finishes, the maximum element is current and will eventually win
    RETURN current
```

---

## 4. Examples

| arr | k | Winner |
|-----|---|--------|
| `[2,1,3,5,4]` | `3` | `5` |
| `[1,9,8,2,3,7,6,4,5]` | `7` | `9` |
| `[3,2,1]` | `10` | `3` |

---

## 5. Walkthrough

Take the first example `[2,1,3,5,4]` with `k = 3`:
1. Compare `2` vs `1` → `2` wins (wins=1).
2. Compare `2` vs `3` → `3` wins (wins reset to 1).
3. Compare `3` vs `5` → `5` wins (wins=1).
4. Compare `5` vs `4` → `5` wins (wins=2).
5. Loop back, compare `5` vs `2` → `5` wins (wins=3) → reaches `k`, return `5`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm if the array is presented as a stream?
- Can you compute the winner without storing the entire array in memory?
- What changes if ties are resolved by keeping the earlier element?

---

## 8. Key Takeaway

> No full simulation needed — a linear scan tracks the current champion and its consecutive wins. The maximum element will dominate when `k` is large.
