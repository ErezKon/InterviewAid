# 466. Count The Repetitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-repetitions](https://leetcode.com/problems/count-the-repetitions)
**Companies:** Google

---

## Problem Description

Given `str1` repeated `n1` times (forming `S1`) and `str2` repeated `n2` times (forming `S2`), find the max integer `M` such that `S2` repeated `M` times is a subsequence of `S1`.

---

## Key Insight

Simulate matching `s2` as a subsequence within repeated copies of `s1`. After processing each copy of `s1`, track the position within `s2`. Once the position **cycles** (same position in `s2` after a complete `s1` copy), use the cycle to extrapolate without further simulation.

---

## Approach

```
FUNCTION getMaxRepetitions(s1, n1, s2, n2):
    // Track: after processing k copies of s1, how many full s2 matches
    // and position within s2
    recall = {}  // pos_in_s2 → (copy_of_s1, total_s2_matches)

    s2Count = 0; s2Idx = 0
    FOR i ← 0 TO n1 - 1:
        FOR c IN s1:
            IF c == s2[s2Idx]: s2Idx += 1
            IF s2Idx == len(s2): s2Count += 1; s2Idx = 0

        IF s2Idx IN recall:
            // Found cycle
            prevI, prevCount = recall[s2Idx]
            cycleLen = i - prevI
            cycleCount = s2Count - prevCount
            remaining = n1 - 1 - i
            fullCycles = remaining // cycleLen
            s2Count += fullCycles * cycleCount
            // Simulate remaining copies
            FOR j in range(remaining % cycleLen):
                FOR c IN s1:
                    IF c == s2[s2Idx]: s2Idx += 1
                    IF s2Idx == len(s2): s2Count += 1; s2Idx = 0
            RETURN s2Count // n2
        recall[s2Idx] = (i, s2Count)

    RETURN s2Count // n2
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(len(s1) × len(s2)) — cycle found within len(s2) copies |
| **Space** | O(len(s2)) |

---

## Key Takeaway

> **String repetition subsequence counting: simulate and detect cycles based on the position within s2 after each s1 copy. Once a cycle is found, extrapolate to skip O(n1) simulation.**
