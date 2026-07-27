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

## Key Insight

> For any window `[left, right]` of positions, the minimum steps from `startPos` is `min(2 * leftDist + rightDist, leftDist + 2 * rightDist)` where `leftDist = max(0, startPos - left)` and `rightDist = max(0, right - startPos)`. Slide a window and check if the cost ≤ k.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION maxTotalFruits(fruits, startPos, k):
    n = len(fruits)
    prefixSum = build prefix sum of fruit amounts
    left = 0; result = 0

    FOR right ← 0 TO n - 1:
        // Shrink left until steps fit within k
        WHILE left <= right:
            leftDist = MAX(0, startPos - fruits[left].pos)
            rightDist = MAX(0, fruits[right].pos - startPos)
            steps = MIN(2 * leftDist + rightDist,
                        leftDist + 2 * rightDist)
            IF steps <= k: BREAK
            left += 1
        result = MAX(result, sum of fruits in [left..right])

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window | **O(n)** | O(n) |

---

## Key Takeaway

> **"Go left then right (or vice versa)" with limited steps: sliding window over positions, compute min steps for each window.** The cost formula accounts for doubling back.
