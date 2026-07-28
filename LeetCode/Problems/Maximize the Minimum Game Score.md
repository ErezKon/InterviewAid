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

Given game scores, maximize the **minimum score** across all participants through optimal strategy. The exact mechanism varies, but the core pattern is maximizing the minimum.

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
scores = [3, 1, 4, 2]
Output: 2
Explanation: The maximum possible minimum score is 2. Any higher threshold (e.g., 3) cannot be achieved for all participants.
```

**Example 2:**
```
scores = [5, 5, 5]
Output: 5
Explanation: All scores are already equal; the minimum cannot be increased beyond 5.
```

---

## Walkthrough

1. **Initialize bounds:** `lo = 0`, `hi = max(scores)`.
2. **Binary search loop:**
   - Compute `mid = (lo + hi + 1) / 2`.
   - Call `canAchieve(mid)` which checks, using the problem‑specific greedy/DP logic, whether every participant can reach at least `mid`.
   - If feasible, set `lo = mid`; otherwise, set `hi = mid - 1`.
3. **Termination:** When `lo == hi`, the largest achievable minimum score is found.
4. **Return:** Output `lo`.

In Example 1, `hi` starts at 4. The binary search checks mid = 2 (feasible) → lo = 2, then mid = 3 (infeasible) → hi = 2, ending with answer = 2.

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
