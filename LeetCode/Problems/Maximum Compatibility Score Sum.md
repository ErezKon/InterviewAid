# 1947. Maximum Compatibility Score Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-compatibility-score-sum](https://leetcode.com/problems/maximum-compatibility-score-sum)
**Companies:** Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP — O(m · 2ᵐ)](#approach-bitmask-dp--om--2ᵐ-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `m` students and `m` mentors (each with an answer array), assign each student to exactly one mentor. The compatibility score for a pair = number of matching answers. Maximize total compatibility score.

**Constraints:**
- `m ≤ 8`, `n ≤ 8`

---

## Key Insight

> With m ≤ 8, use **bitmask DP** over mentor assignments. `dp[mask]` = max score assigning the first `popcount(mask)` students to the mentors indicated by the mask.

---

## Approach: Bitmask DP — O(m · 2ᵐ) ✅

```
FUNCTION maxCompatibilitySum(students, mentors):
    m = len(students)
    // Precompute scores
    score = m × m matrix
    FOR i, j: score[i][j] = count matching answers

    dp = [0] * (1 << m)
    FOR mask ← 0 TO (1 << m) - 1:
        student = popcount(mask)
        IF student >= m: CONTINUE
        FOR mentor ← 0 TO m - 1:
            IF NOT (mask & (1 << mentor)):
                newMask = mask | (1 << mentor)
                dp[newMask] = MAX(dp[newMask],
                    dp[mask] + score[student][mentor])

    RETURN dp[(1 << m) - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask DP | **O(m · 2ᵐ)** | O(2ᵐ) |

With m ≤ 8: 8 × 256 = 2048 operations.

---

## Key Takeaway

> **Assignment problems with small n use bitmask DP.** The mask tracks which mentors are assigned; popcount gives the current student index.
