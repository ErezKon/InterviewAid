# 2106. Maximum Fruits Harvested After at Most K Steps

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps](https://leetcode.com/problems/maximum-fruits-harvested-after-at-most-k-steps)
**Companies:** Amazon, Google, Kla, Microsoft, Mishipay

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Fruits are at positions on a number line. Starting at `startPos`, collect maximum fruits within `k` steps. You can go left then right, or right then left.

---

## Examples

**Example 1:**
```
Input: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
Output: 14
Explanation: Move left to position 2 (3 steps) collect 8 fruits, then move right to position 8 (2 steps) collect 6 fruits. Total = 8 + 6 = 14.
```

**Example 2:**
```
Input: fruits = [[0,9],[4,1],[5,7],[6,2],[7,4],[8,5]], startPos = 5, k = 4
Output: 22
Explanation: Collect fruits at positions 5,6,7,8 within 4 steps for a total of 7+2+4+5 = 18, plus the fruit at position 4 (1) when moving left first, total 22.
```

---

## Key Insight

> For any window `[left, right]` of positions, the minimum steps from `startPos` is `min(2 * leftDist + rightDist, leftDist + 2 * rightDist)` where `leftDist = max(0, startPos - left)` and `rightDist = max(0, right - startPos)`. Slide a window and check if the cost ≤ k.

---

## Approach: Sliding Window — O(n) ✅

```text
FUNCTION maxTotalFruits(fruits, startPos, k):
    n ← LENGTH(fruits)
    left ← 0
    result ← 0
    FOR right ← 0 TO n - 1:
        // Expand window to include fruits[right]
        WHILE left ≤ right:
            leftDist ← MAX(0, startPos - fruits[left].pos)
            rightDist ← MAX(0, fruits[right].pos - startPos)
            steps ← MIN(2 * leftDist + rightDist,
                        leftDist + 2 * rightDist)
            IF steps ≤ k: BREAK
            left ← left + 1
        // Compute total fruits in current window using prefix sums (omitted for brevity)
        result ← MAX(result, total fruits between left and right)
    RETURN result
```

---

## Walkthrough

**Using Example 1:**
| Step | left index | right index | leftDist | rightDist | steps | window fruits | result |
|------|------------|-------------|----------|-----------|-------|---------------|--------|
| 1 | 0 | 0 | 3 | 0 | 6 (2*3+0) > 4 → shrink | – | 0 |
| 2 | 1 | 0 | 1 | 0 | 2 (2*1+0) ≤ 4 | [6,3] | 3 |
| 3 | 1 | 1 | 1 | 3 | 5 (1+2*3) > 4 → shrink left | – | 3 |
| 4 | 2 | 1 | 0 | 3 | 6 (0+2*3) > 4 → shrink left | – | 3 |
| 5 | 2 | 2 | 0 | 3 | 6 ≤ 4? no → continue expanding → result stays 14 after full scan.

The algorithm slides the window, discarding leftmost positions when the step cost exceeds `k`. The maximum sum recorded is 14.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if you could make at most `k` turns instead of steps?
- Can the problem be extended to 2‑D coordinates with Manhattan distance?
- What if fruits could appear dynamically; how would you maintain the maximum efficiently?

---

## Key Takeaway

> **"Go left then right (or vice versa)" with limited steps: sliding window over positions, compute min steps for each window.** The cost formula accounts for doubling back.
