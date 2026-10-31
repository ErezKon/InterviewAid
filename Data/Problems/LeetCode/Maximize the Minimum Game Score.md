# 3449. Maximize the Minimum Game Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-minimum-game-score](https://leetcode.com/problems/maximize-the-minimum-game-score)
**Companies:** Amazon, Infosys

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer — O(n log V)](#approach-binary-search-on-answer--on-log-v-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below is a generic, unfinished binary-search template written for an older vague description. Correct idea: binary search on the answer `X`; to check it, go left to right. Index `i` needs `ceil(X / points[i])` visits, the step onto `i` gives one, and each extra visit costs a back-and-forth `i → i+1 → i` (2 moves, which also gives `i+1` a visit to carry forward). Sum the moves, stop early once they exceed `m`, and handle the last index separately.*

You are given an array `points` of size `n` and an integer `m`. There is another array `gameScore` of size `n`, where `gameScore[i]` represents the score achieved at the `i^th` game. Initially, `gameScore[i] == 0` for all `i`.

You start at index -1, which is outside the array (before the first position at index 0). You can make **at most** `m` moves. In each move, you can either:

- Increase the index by 1 and add `points[i]` to `gameScore[i]`.
- Decrease the index by 1 and add `points[i]` to `gameScore[i]`.

**Note** that the index must always remain within the bounds of the array after the first move.

Return the **maximum possible minimum** value in `gameScore` after **at most** `m` moves.

**Constraints:**
- `2 <= n == points.length <= 5 * 10^4`
- `1 <= points[i] <= 10^6`
- `1 <= m <= 10^9`

---

## Key Insight

> **"Maximize the minimum"** → binary search on the answer. For each candidate minimum `m`, check if it's achievable with a greedy or DP verification function.

---

## Approach: Binary Search on Answer — O(n log V) ✅

```
FUNCTION maxMinScore(scores, ...):
    lo, hi = 0, MAX(scores)
    
    FUNCTION canAchieve(minScore):
        // Greedy check: can all scores be made >= minScore?
        RETURN feasible
    
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF canAchieve(mid): lo = mid
        ELSE: hi = mid - 1
    
    RETURN lo
```

---

## Examples

**Example 1:**
```
Input: points = [2,4], m = 3
Output: 4
Explanation: Initially, index i = -1 and gameScore = [0, 0].
  Move
  Index
  gameScore
  Increase i
  0
  [2, 0]
  Increase i
  1
  [2, 4]
  Decrease i
  0
  [4, 4]
The minimum value in gameScore is 4, and this is the maximum possible minimum among all configurations. Hence, 4 is the output.
```

**Example 2:**
```
Input: points = [1,2,3], m = 5
Output: 2
Explanation: Initially, index i = -1 and gameScore = [0, 0, 0].
  Move
  Index
  gameScore
  Increase i
  0
  [1, 0, 0]
  Increase i
  1
  [1, 2, 0]
  Decrease i
  0
  [2, 2, 0]
  Increase i
  1
  [2, 4, 0]
  Increase i
  2
  [2, 4, 3]
The minimum value in gameScore is 2, and this is the maximum possible minimum among all configurations. Hence, 2 is the output.
```

---

## Walkthrough

1. **Initialize bounds:** `lo = 0`, `hi = max(scores)`.
2. **Binary search loop:**
   - Compute `mid = (lo + hi + 1) / 2`.
   - Call `canAchieve(mid)` which checks, using the problem-specific greedy/DP logic, whether every participant can reach at least `mid`.
   - If feasible, set `lo = mid`; otherwise, set `hi = mid - 1`.
3. **Termination:** When `lo == hi`, the largest achievable minimum score is found.
4. **Return:** Output `lo`.

In Example 1, `hi` starts at 4. The binary search checks mid = 2 (feasible) → lo = 2, then mid = 3 (infeasible) → hi = 2, ending with answer = 2.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search + Greedy | **O(n log V)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if the scores could be increased only by swapping values between participants?
- Can you extend the approach to maximize the **median** score instead of the minimum?
- What if the scores are updated dynamically; how would you maintain the answer efficiently?

---

## Key Takeaway

> **"Maximize the minimum" is the canonical binary search on answer pattern.** Binary search the threshold, greedily verify feasibility.
