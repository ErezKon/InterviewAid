# 1297. Maximum Number of Occurrences of a Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring](https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring)
**Companies:** Amazon, Hubspot, Meta, Microsoft, Roblox, Salesforce

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

Given a string `s`, return the maximum frequency of any substring that has at most `maxLetters` unique characters and length between `minSize` and `maxSize`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `1 <= minSize <= maxSize <= min(26, s.length)`
- `1 <= maxLetters <= 26`

---

## Examples

**Example 1:**
```
Input:  s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
Output: 2
Explanation: "aab" appears twice and has 2 unique letters.
```

---

## Key Insight

> Only check substrings of length `minSize`. If a substring of length `minSize` appears `k` times, any superstring containing it appears **at most** `k` times. So `maxSize` is a red herring — checking `minSize` alone gives the answer.

---

## Approach

```
FUNCTION maxFreq(s, maxLetters, minSize, maxSize)
    count ← Counter()

    FOR i ← 0 TO len(s) - minSize DO
        sub ← s[i : i + minSize]
        IF number of unique chars in sub ≤ maxLetters THEN
            count[sub] ← count[sub] + 1

    RETURN MAX(count.values()) IF count NOT EMPTY ELSE 0
END FUNCTION
```

---

## Walkthrough

```
s = "aababcaab", maxLetters = 2, minSize = 3
```

| i | sub   | Unique | ≤2? | Count               |
|---|-------|--------|-----|---------------------|
| 0 | "aab" | {a,b}=2| ✅  | {"aab": 1}         |
| 1 | "aba" | {a,b}=2| ✅  | {"aab":1, "aba":1} |
| 2 | "bab" | {a,b}=2| ✅  | +{"bab":1}         |
| 3 | "abc" | {a,b,c}=3| ❌ | skip               |
| 4 | "bca" | 3      | ❌  | skip                |
| 5 | "caa" | {c,a}=2| ✅  | +{"caa":1}         |
| 6 | "aab" | {a,b}=2| ✅  | {"aab": **2**}     |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × minSize)** — n substrings, each takes O(minSize) to hash/count unique |
| Space  | **O(n)** — counter map |

---

## Follow-Up Questions

1. **Why ignore maxSize?**
   Any substring of length > minSize that appears k times contains a minSize substring appearing ≥ k times.

2. **Can we use rolling hash?**
   Yes — rolling hash + sliding window for unique char count → O(n) amortized.

3. **What if we needed the actual most frequent substring?**
   Return the key with max value from the counter.

---

## Key Takeaway

> **Only check the minimum length** — longer substrings can never be more frequent than their shorter sub-parts. This eliminates the need to check all lengths and simplifies to a single sliding window pass.
