# 3442. Maximum Difference Between Even and Odd Frequency I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` consisting of lowercase English letters.

Your task is to find the **maximum** difference `diff = freq(a_1) - freq(a_2)` between the frequency of characters `a_1` and `a_2` in the string such that:

- `a_1` has an **odd frequency** in the string.
- `a_2` has an **even frequency** in the string.

Return this **maximum** difference.

**Constraints:**
- `3 <= s.length <= 100`
- `s` consists only of lowercase English letters.
- `s` contains at least one character with an odd frequency and one with an even frequency.

---

## Examples

**Example 1:**
```
Input: s = "aaaaabbc"
Output: 3
Explanation: - The character 'a' has an odd frequency of 5, and 'b' has an even frequency of 2.
- The maximum difference is 5 - 2 = 3.
```

**Example 2:**
```
Input: s = "abcabcab"
Output: 1
Explanation: - The character 'a' has an odd frequency of 3, and 'c' has an even frequency of 2.
- The maximum difference is 3 - 2 = 1.
```

---

## Approach

**Frequency Count** – Count occurrences of each character, separate counts into odd and even groups, then compute `max(odd) - min(even)`.

```text
FUNCTION maxDifference(s):
    count ← MAP of character → frequency
    FOR ch IN s:
        count[ch] ← count.get(ch, 0) + 1
    odds ← []
    evens ← []
    FOR freq IN count.values():
        IF freq % 2 == 1:
            APPEND freq TO odds
        ELSE:
            APPEND freq TO evens
    RETURN MAX(odds) - MIN(evens)
```

---

## Walkthrough

Consider `s = "aabbc"`:

| Step | char | count | odds | evens |
|------|------|-------|------|-------|
|1|a|{a:1}|[1]|[]|
|2|a|{a:2}|[]|[2]|
|3|b|{a:2,b:1}|[1]|[2]|
|4|b|{a:2,b:2}|[]|[2,2]|
|5|c|{a:2,b:2,c:1}|[1]|[2,2]|

After counting, odds = `[1]`, evens = `[2,2]`. Result = `MAX(odds) - MIN(evens) = 1 - 2 = -1`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Frequency count | **O(n)** | O(σ) where σ is alphabet size |

---

## Follow-Up Questions

- How would you modify the solution for Unicode characters?
- What if you need the maximum absolute difference instead of signed?
- Can you solve it in a single pass without storing the full map?

---

## Key Takeaway

> **Count frequencies, split by parity, then compute max odd minus min even.** Simple counting with constant extra space.
