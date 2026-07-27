# 2024. Maximize the Confusion of an Exam

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-the-confusion-of-an-exam](https://leetcode.com/problems/maximize-the-confusion-of-an-exam)
**Companies:** Amazon, Arcesium, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Window — O(n)](#approach-sliding-window--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an answer key string of `'T'` and `'F'` and an integer `k`, you can change at most `k` answers. Maximize the number of **consecutive identical answers** (longest substring of all T's or all F's after at most k flips).

**Constraints:**
- `1 ≤ n ≤ 5 × 10⁴`
- `1 ≤ k ≤ n`

---

## Examples

**Example 1:**
```
Input:  answerKey = "TTFF", k = 2
Output: 4
Explanation: Change both F's to T's → "TTTT", length 4.
```

**Example 2:**
```
Input:  answerKey = "TFFT", k = 1
Output: 3
Explanation: Change first F → "TTFT" gives 2, or change second F → "TFTT" gives 3.
```

---

## Key Insight

> This is "Max Consecutive Ones III" (LC 1004) applied twice — once for making everything T (flipping F's), once for making everything F (flipping T's). Use a **sliding window** that allows at most k "wrong" characters.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION maxConsecutiveAnswers(answerKey, k):
    FUNCTION maxWith(char):
        left = 0; count = 0; maxLen = 0
        FOR right ← 0 TO n - 1:
            IF answerKey[right] != char: count += 1
            WHILE count > k:
                IF answerKey[left] != char: count -= 1
                left += 1
            maxLen = MAX(maxLen, right - left + 1)
        RETURN maxLen

    RETURN MAX(maxWith('T'), maxWith('F'))
```

---

## Walkthrough

```
answerKey = "TFFT", k = 1, target = 'T'
```

| right | char | count (non-T) | left | window | maxLen |
|-------|------|---------------|------|--------|--------|
| 0     | T    | 0             | 0    | "T"    | 1      |
| 1     | F    | 1             | 0    | "TF"   | 2      |
| 2     | F    | 2 → shrink    | 1    | "FF"→"F" | 2    |
| 3     | T    | 1             | 1    | "FT"→"FFT" | 3  |

maxWith('T') = 3, maxWith('F') = 3

**Result:** 3 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sliding Window (×2) | **O(n)** | O(1) |

---

## Follow-Up Questions

**Q1: How does this relate to LC 1004 (Max Consecutive Ones III)?**
Identical algorithm. LC 1004 has a binary array and flips 0→1. Here we flip T→F or F→T.

**Q2: Can you do it in a single pass?**
Track both counts simultaneously in one window — the window is valid as long as min(countT, countF) ≤ k. This gives the same result in one pass.

**Q3: What if there were more than 2 characters?**
Run the sliding window for each character, or use the "at most k minority characters" approach with a frequency map.

---

## Key Takeaway

> **"Maximize consecutive identical characters with at most k flips" is the classic sliding window problem.** Run it for each target character and take the maximum.
