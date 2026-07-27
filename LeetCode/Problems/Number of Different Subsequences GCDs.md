# 1819. Number of Different Subsequences GCDs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-different-subsequences-gcds](https://leetcode.com/problems/number-of-different-subsequences-gcds)
**Companies:** Akuna Capital, Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate GCD Candidates — O(max · log max)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the number of **distinct** GCDs among all non-empty subsequences of `nums`.

---

## 2. Key Insight

> Don't enumerate subsequences. For each candidate GCD `g` from 1 to max(nums), check if there exists a subsequence with GCD = `g`. This is true iff `gcd(all multiples of g present in nums) == g`.

---

## 3. Approach: Enumerate GCD Candidates — O(max · log max) ✅

```
FUNCTION countDifferentSubsequenceGCDs(nums):
    maxVal = MAX(nums)
    present = set(nums)
    count = 0

    FOR g ← 1 TO maxVal:
        currentGCD = 0
        FOR multiple ← g, 2g, 3g, ... ≤ maxVal:
            IF multiple IN present:
                currentGCD = GCD(currentGCD, multiple)
                IF currentGCD == g: BREAK
        IF currentGCD == g: count += 1

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(max · log max) — harmonic series |
| **Space** | O(max) for presence set |

---

## 5. Key Takeaway

> **Enumerate candidate GCDs, verify via multiples.** For each `g`, check all multiples of `g` in the array. The GCD of those multiples equals `g` iff `g` is achievable. Harmonic series gives O(max · log max).
