# 1535. Find the Winner of an Array Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-winner-of-an-array-game](https://leetcode.com/problems/find-the-winner-of-an-array-game)
**Companies:** Directi, Jpmorgan, Microsoft, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Linear Scan — O(n) ✅](#3-approach-linear-scan--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION getWinner(arr, k):
    current = arr[0]; wins = 0
    FOR i ← 1 TO len(arr) - 1:
        IF arr[i] > current:
            current = arr[i]; wins = 1
        ELSE:
            wins += 1
        IF wins == k: RETURN current
    RETURN current    // max element always wins eventually
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> No simulation needed — scan left to right. The maximum element will always win eventually, so one pass suffices even for k > n.
