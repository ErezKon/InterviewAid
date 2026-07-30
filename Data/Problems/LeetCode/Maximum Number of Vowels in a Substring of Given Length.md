# 1456. Maximum Number of Vowels in a Substring of Given Length

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

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

Given a string `s` and an integer `k`, return the **maximum number of vowels** in any substring of length `k`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `1 <= k <= s.length`

---

## Examples

**Example 1:**
```
Input:  s = "abciiidef", k = 3
Output: 3
Explanation: "iii" has 3 vowels.
```

---

## Key Insight

> Classic **fixed-size sliding window**: maintain a count of vowels in the current window of size `k`. Slide right, adding the new character and removing the old one.

---

## Approach: Fixed-Size Sliding Window — O(n) ✅

```
FUNCTION maxVowels(s, k)
    vowels ← SET('aeiou')
    count ← number of vowels in s[0:k]
    maxCount ← count

    FOR i ← k TO len(s) - 1 DO
        IF s[i] IN vowels THEN count ← count + 1
        IF s[i - k] IN vowels THEN count ← count - 1
        maxCount ← MAX(maxCount, count)

    RETURN maxCount
END FUNCTION
```

---

## Walkthrough

```
s = "abciiidef", k = 3
Initial window "abc": count = 1 (a)
```

| i | Add    | Remove | count | maxCount |
|---|--------|--------|-------|----------|
| 3 | 'i' ✅ | 'a' ✅ | 1     | 1        |
| 4 | 'i' ✅ | 'b'    | 2     | 2        |
| 5 | 'i' ✅ | 'c'    | 3     | **3**    |
| 6 | 'd'    | 'i' ✅ | 2     | 3        |
| 7 | 'e' ✅ | 'i' ✅ | 2     | 3        |
| 8 | 'f'    | 'i' ✅ | 1     | 3        |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — vowel set is constant |

---

## Follow-Up Questions

1. **What if k varied per query?**
   Precompute prefix sums of vowel counts, then answer each query in O(1).

2. **What if we needed minimum vowels instead?**
   Same sliding window, track minimum instead of maximum.

---

## Key Takeaway

> **Fixed-size sliding window** — maintain a running count, add/remove at the boundaries. O(n) time, O(1) space. The canonical sliding window problem.
