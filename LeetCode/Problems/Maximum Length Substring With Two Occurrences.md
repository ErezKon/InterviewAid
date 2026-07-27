# 3090. Maximum Length Substring With Two Occurrences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-length-substring-with-two-occurrences](https://leetcode.com/problems/maximum-length-substring-with-two-occurrences)
**Companies:** Microsoft, Walmart Labs

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

Given a string `s`, return the **maximum length** of a substring such that it contains **at most two occurrences** of each character.

**Constraints:**
- `2 <= s.length <= 100`
- `s` consists only of lowercase English letters.

---

## Examples

**Example 1:**
```
Input:  s = "bcbbbcba"
Output: 4
Explanation: Substring "bcba" has at most 2 of each char. Length = 4.
```

**Example 2:**
```
Input:  s = "aaaa"
Output: 2
Explanation: Substring "aa" has exactly 2 'a's. Length = 2.
```

---

## Key Insight

> Classic **sliding window** problem: expand the right pointer, and when any character count exceeds 2, shrink from the left until the constraint is restored.

---

## Approach

Use a sliding window with a frequency map:

```
FUNCTION maximumLengthSubstring(s)
    count ← array of 26 zeros
    left ← 0
    result ← 0

    FOR right ← 0 TO len(s) - 1 DO
        count[s[right]] ← count[s[right]] + 1

        WHILE count[s[right]] > 2 DO
            count[s[left]] ← count[s[left]] - 1
            left ← left + 1

        result ← MAX(result, right - left + 1)

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
s = "bcbbbcba"
```

| right | char | Window     | Counts (relevant) | left | Length | result |
|-------|------|------------|-------------------|------|--------|--------|
| 0     | b    | "b"        | b:1               | 0    | 1      | 1      |
| 1     | c    | "bc"       | b:1,c:1           | 0    | 2      | 2      |
| 2     | b    | "bcb"      | b:2,c:1           | 0    | 3      | 3      |
| 3     | b    | "bcbb"     | b:3 → shrink      | 1    |        |        |
|       |      | "cbb"      | b:2,c:1           | 1    | 3      | 3      |
| 4     | b    | "cbbb"     | b:3 → shrink      | 2    |        |        |
|       |      | "bbb"      | b:3 → shrink      | 3    |        |        |
|       |      | "bb"       | b:2               | 3    | 2      | 3      |
| 5     | c    | "bbc"      | b:2,c:1           | 3    | 3      | 3      |
| 6     | b    | "bbcb"     | b:3 → shrink      | 4    |        |        |
|       |      | "bcb"      | b:2,c:1           | 4    | 3      | 3      |
| 7     | a    | "bcba"     | b:2,c:1,a:1       | 4    | **4**  | **4**  |

**Result: 4** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — each character visited at most twice (once by right, once by left) |
| Space  | **O(1)** — fixed-size frequency array (26 letters) |

---

## Follow-Up Questions

1. **What if the limit were K occurrences instead of 2?**
   Replace the `> 2` check with `> K` — same sliding window pattern.

2. **What if we needed the longest substring with exactly 2 occurrences of every character present?**
   More complex — need to verify all chars in the window have exactly count 2.

3. **How is this different from "Longest Substring Without Repeating Characters"?**
   That problem uses limit 1 (at most 1 occurrence). This uses limit 2. Same sliding window template.

---

## Key Takeaway

> **Sliding window with a frequency constraint** is the go-to pattern for "longest substring with at most K of something" — adjust the threshold and the rest of the template stays identical.
