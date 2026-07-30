# 1231. Divide Chocolate

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/divide-chocolate](https://leetcode.com/problems/divide-chocolate)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search on Answer](#approach-binary-search-on-answer)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A chocolate bar is divided into chunks with sweetness values `sweetness[i]`. You want to share it with `k` friends by making `k` cuts (creating `k+1` pieces). You get the piece with **minimum total sweetness**. Maximize your minimum piece.

**Constraints:**
- `0 <= k < sweetness.length <= 10^4`
- `1 <= sweetness[i] <= 10^5`

---

## Examples

```
Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5
Output: 6
Explanation: Cut into [1,2,3], [4,5], [6], [7], [8], [9] → min piece = 6
```

---

## Key Insight

> Binary search on the answer (minimum sweetness you get). For a candidate value `mid`, greedily check if you can make `k+1` pieces each with sweetness ≥ `mid`. If yes, try higher; if no, try lower.

This is the dual of "Split Array Largest Sum" (LC 410) — minimize the maximum vs maximize the minimum.

---

## Approach: Binary Search on Answer ✅

```
FUNCTION maximizeSweetness(sweetness, k):
    lo ← 1
    hi ← SUM(sweetness) / (k + 1)

    WHILE lo <= hi DO
        mid ← (lo + hi) / 2
        IF canSplit(sweetness, k + 1, mid) THEN
            lo ← mid + 1
        ELSE
            hi ← mid - 1

    RETURN hi

FUNCTION canSplit(arr, pieces, minSum):
    count ← 0; current ← 0
    FOR val IN arr DO
        current += val
        IF current >= minSum THEN
            count += 1; current ← 0
    RETURN count >= pieces
END FUNCTION
```

---

## Walkthrough

```
sweetness = [1,2,3,4,5,6,7,8,9], k = 5
We need k+1 = 6 pieces.

lo = 1, hi = SUM/6 = 45/6 = 7

Step 1: mid = 4
  canSplit(arr, 6, 4)?
  [1,2,3]=6≥4 ✓ → piece 1 | [4]=4≥4 ✓ → piece 2 | [5]=5≥4 ✓ → piece 3 |
  [6]=6≥4 ✓ → piece 4 | [7]=7≥4 ✓ → piece 5 | [8]=8≥4 ✓ → piece 6
  count=6 ≥ 6 → YES → lo = 5

Step 2: mid = 6
  canSplit(arr, 6, 6)?
  [1,2,3]=6≥6 ✓ | [4,5]=9≥6 ✓ | [6]=6≥6 ✓ | [7]=7≥6 ✓ | [8]=8≥6 ✓ | [9]=9≥6 ✓
  count=6 ≥ 6 → YES → lo = 7

Step 3: mid = 7
  canSplit(arr, 6, 7)?
  [1,2,3,4]=10≥7 ✓ | [5,6]=11≥7 ✓ | [7]=7≥7 ✓ | [8]=8≥7 ✓ | [9]=9≥7 ✓
  count=5 < 6 → NO → hi = 6

lo=7 > hi=6 → RETURN hi = 6 ✅
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n × log(S)) | S = total sum, binary search × linear scan |
| **Space** | O(1) | Constant extra space |

---

## Follow-Up Questions

**Q1: How does this differ from "Split Array Largest Sum" (LC 410)?**
> LC 410 minimizes the maximum subarray sum (binary search + greedy check for ≤ pieces). This problem maximizes the minimum piece (binary search + greedy check for ≥ pieces). They're duals.

**Q2: Why greedy splitting works for the check?**
> Once a contiguous sum reaches the target, cut immediately. This greedy approach maximizes the number of valid pieces for a given threshold.

---

## Key Takeaway

> **"Maximize the minimum" or "minimize the maximum" over partitions → binary search on the answer + greedy feasibility check. One of the most common binary search patterns.**
