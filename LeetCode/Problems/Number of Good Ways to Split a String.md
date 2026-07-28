# 1525. Number of Good Ways to Split a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-good-ways-to-split-a-string](https://leetcode.com/problems/number-of-good-ways-to-split-a-string)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Counter Pass — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Split string `s` into left and right non-empty parts. A split is "good" if both parts have the same number of **distinct** characters. Count good splits.

---

## 2. Key Insight

> Maintain left and right distinct counts as you move the split point. Start with everything on the right. Slide characters from right to left, updating both counters.

---

## 3. Approach: Two Counter Pass — O(n) ✅

```text
FUNCTION numSplits(s):
    rightCount ← Counter(s)
    leftCount ← Counter()
    leftDistinct ← 0
    rightDistinct ← SIZE OF rightCount
    result ← 0

    FOR ch IN s:
        leftCount[ch] ← leftCount[ch] + 1
        IF leftCount[ch] == 1:
            leftDistinct ← leftDistinct + 1
        rightCount[ch] ← rightCount[ch] - 1
        IF rightCount[ch] == 0:
            rightDistinct ← rightDistinct - 1
        IF leftDistinct == rightDistinct:
            result ← result + 1

    RETURN result
```

---

## 4. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aacaba"` | `2` | Splits after index 1 (`"a"|"acaba"`) and after index 3 (`"aac"|"aba"`) have equal distinct counts. |
| `"abcd"` | `1` | Only split after index 1 (`"a"|"bcd"`) yields 1 distinct on each side. |
| `"aaaa"` | `3` | Every split results in 1 distinct on both sides.

---

## 5. Walkthrough

Consider `s = "aacaba"`.

1. **Initial state**: `rightCount` holds frequencies of all characters, `rightDistinct = 3` (`a,b,c`). `leftCount` empty, `leftDistinct = 0`.
2. **First character `'a'` moves left**:
   - `leftDistinct` becomes 1, `rightDistinct` stays 3.
   - Not equal.
3. **Second character `'a'` moves left**:
   - `leftDistinct` remains 1, `rightDistinct` remains 3.
   - Not equal.
4. **Third character `'c'` moves left**:
   - `leftDistinct` becomes 2, `rightDistinct` becomes 2 (since `'c'` removed from right).
   - Counts match → good split at index 3.
5. Continue similarly; another good split occurs after index 5.

The algorithm counts these matches, yielding result `2`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(26) = O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if the split must also ensure the left substring is lexicographically smaller than the right?
- Can you adapt the algorithm to handle Unicode characters beyond the English alphabet?
- What if we need to count splits where the number of distinct characters differs by at most one?

---

## 8. Key Takeaway

> **Sliding split with two frequency maps.** Transfer characters from right to left counter. Distinct counts update in O(1) per step.
