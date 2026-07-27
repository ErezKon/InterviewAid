# 1520. Maximum Number of Non-Overlapping Substrings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings](https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, find the **maximum number of non-overlapping substrings** such that each substring contains **all occurrences** of every character in it. Among all solutions with maximum count, return the one with **minimum total length**.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

---

## Examples

**Example 1:**
```
Input:  s = "adefaddaccc"
Output: ["e", "f", "ccc"]
Explanation: Each substring contains all occurrences of its characters. "d" can't be isolated (appears in multiple places).
```

---

## Key Insight

> For each character, compute the **tightest valid interval** [first, last] that includes all occurrences of every character within it. Then greedily select the **maximum non-overlapping intervals** sorted by right endpoint (classic interval scheduling).

---

## Approach

```
FUNCTION maxNumOfSubstrings(s)
    // Step 1: For each char, find first and last occurrence
    first, last ← arrays of 26

    // Step 2: Expand intervals — if char c's range contains char d, expand to include all of d
    FOR each char c DO
        i ← first[c]
        WHILE i ≤ last[c] DO
            IF first[s[i]] < first[c] THEN mark invalid OR expand
            last[c] ← MAX(last[c], last[s[i]])
            i ← i + 1

    // Step 3: Collect valid intervals, sort by right endpoint
    // Step 4: Greedy non-overlapping selection (earliest ending first)
    SORT intervals by right endpoint
    result ← [], prevEnd ← -1
    FOR each interval DO
        IF interval.start > prevEnd THEN
            result.ADD(s[interval.start : interval.end + 1])
            prevEnd ← interval.end

    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × 26)** — interval expansion per character |
| Space  | **O(26)** — character ranges |

---

## Follow-Up Questions

1. **Why expand intervals?**
   If character `c`'s range contains `d`, we must include all of `d`'s occurrences too.

2. **How is this like interval scheduling?**
   After computing valid intervals, it's exactly "max non-overlapping intervals sorted by end."

---

## Key Takeaway

> **Character interval expansion + greedy interval scheduling** — compute the tightest valid range for each character, expand as needed, then greedily select non-overlapping intervals by earliest end.
