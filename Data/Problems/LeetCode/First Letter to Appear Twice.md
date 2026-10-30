# 2351. First Letter to Appear Twice

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/first-letter-to-appear-twice](https://leetcode.com/problems/first-letter-to-appear-twice)
**Companies:** Apple, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Set — O(n) ✅](#2-approach-set--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a string `s` consisting of lowercase English letters, return *the first letter to appear **twice***.

**Note**:

- A letter `a` appears twice before another letter `b` if the **second** occurrence of `a` is before the **second** occurrence of `b`.
- `s` will contain at least one letter that appears twice.

**Constraints:**
- `2 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `s` has at least one repeated letter.

---

## 2. Approach: Set — O(n) ✅

```text
FUNCTION repeatedCharacter(s):
    seen ← SET()
    FOR c IN s DO
        IF c IN seen THEN RETURN c
        seen.ADD(c)
```

---

## 3. Examples

**Example 1:**
```
Input: s = "abccbaacz"
Output: "c"
Explanation: The letter 'a' appears on the indexes 0, 5 and 6.
The letter 'b' appears on the indexes 1 and 4.
The letter 'c' appears on the indexes 2, 3 and 7.
The letter 'z' appears on the index 8.
The letter 'c' is the first letter to appear twice, because out of all the letters the index of its second occurrence is the smallest.
```

**Example 2:**
```
Input: s = "abcdd"
Output: "d"
Explanation: The only letter that appears twice is 'd' so we return 'd'.
```

---

## 4. Walkthrough

We iterate through the string while tracking seen characters.

| Index | Character | Seen Set | Action |
|-------|-----------|----------|--------|
| 0 | a | {} | add a |
| 1 | b | {a} | add b |
| 2 | c | {a,b} | add c |
| 3 | c | {a,b,c} | c already in set → return c |

The algorithm stops at the first duplicate.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) (at most 26 letters) |

---

## 6. Key Takeaway

> Track seen characters in a set. The first duplicate is the answer. O(n) time, O(1) space (26 letters).
