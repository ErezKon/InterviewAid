# 3185. Count Pairs That Form a Complete Day II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-pairs-that-form-a-complete-day-ii](https://leetcode.com/problems/count-pairs-that-form-a-complete-day-ii)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `hours` representing the duration of tasks, count the number of pairs `(i, j)` where `i < j` and `(hours[i] + hours[j]) % 24 == 0` (i.e., the pair forms a complete day).

**Constraints:**
- `1 <= hours.length <= 5 × 10^5`
- `1 <= hours[i] <= 10^9`

---

## Examples

**Example 1:**
- **Input:** `hours = [12, 12, 30, 24, 24]`
- **Output:** `2`
- **Explanation:** Pairs: (0,1) → 12+12=24 ✅, (3,4) → 24+24=48 ✅.

**Example 2:**
- **Input:** `hours = [72, 48, 24, 3]`
- **Output:** `3`
- **Explanation:** All pairs except those involving 3 sum to a multiple of 24.

---

## Key Insight

We only care about `hours[i] % 24`. Two values `a` and `b` form a complete day if `(a + b) % 24 == 0`, which means `b ≡ (24 - a) % 24 (mod 24)`. Use a frequency array of size 24 (remainders) and apply the two-sum-mod pattern.

---

## Approach

```
FUNCTION countCompleteDayPairs(hours):
    freq = [0] * 24
    count = 0

    FOR h IN hours DO
        r = h % 24
        complement = (24 - r) % 24
        count += freq[complement]
        freq[r] += 1

    RETURN count
```

---

## Walkthrough

**Input:** `hours = [12, 12, 30, 24, 24]`

| h | r = h%24 | complement | freq[complement] | count | freq update |
|---|---|---|---|---|---|
| 12 | 12 | 12 | 0 | 0 | freq[12]=1 |
| 12 | 12 | 12 | 1 | 1 | freq[12]=2 |
| 30 | 6 | 18 | 0 | 1 | freq[6]=1 |
| 24 | 0 | 0 | 0 | 1 | freq[0]=1 |
| 24 | 0 | 0 | 1 | 2 | freq[0]=2 |

**Result:** `2` ✅

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass |
| **Space** | O(1) — fixed array of size 24 |

---

## Follow-Up Questions

**Q1: What's the difference between Part I and Part II?**
Part I has small constraints (n ≤ 100) allowing O(n²) brute force. Part II requires O(n) with the modular hash approach.

**Q2: How does this compare to Two Sum?**
Same hash-map complement lookup pattern, but using modular arithmetic with a fixed-size array instead of a general hash map.

**Q3: Why `(24 - r) % 24` instead of `24 - r`?**
When `r = 0`, the complement is `0` (not `24`). The `% 24` handles this edge case.

---

## Key Takeaway

> **Pair-sum-divisible-by-k problems reduce to modular arithmetic: group by remainder mod k, then match complements. A fixed-size frequency array replaces the hash map when the modulus is small.**
