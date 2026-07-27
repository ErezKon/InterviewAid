# 520. Detect Capital

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/detect-capital](https://leetcode.com/problems/detect-capital)
**Companies:** Bloomberg, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Three Valid Patterns](#approach-three-valid-patterns)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `word`, return `true` if the usage of capitals in it is correct. Capital usage is correct when one of the following rules holds:

1. **All** letters are capitals: `"USA"`
2. **All** letters are lowercase: `"leetcode"`
3. **Only the first** letter is capital: `"Google"`

**Constraints:**
- `1 <= word.length <= 100`
- `word` consists of lowercase and uppercase English letters.

---

## Examples

**Example 1:**
```
Input: word = "USA"
Output: true       → all uppercase ✅
```

**Example 2:**
```
Input: word = "FlaG"
Output: false      → mixed case, doesn't match any rule ✗
```

**Example 3:**
```
Input: word = "Google"
Output: true       → only first letter capitalized ✅
```

---

## Key Insight

> There are exactly **three valid patterns**. Rather than complex logic, simply check if the word matches any of the three: all-upper, all-lower, or title-case (first upper + rest lower).

---

## Approach: Three Valid Patterns ✅

```
FUNCTION detectCapitalUse(word):
    RETURN word.isupper() OR word.islower() OR (word[0].isupper() AND word[1:].islower())
```

Alternatively, using a count-based approach:

```
FUNCTION detectCapitalUse(word):
    upperCount ← count of uppercase letters in word
    
    IF upperCount = length(word) THEN RETURN true     // all caps
    IF upperCount = 0 THEN RETURN true                // all lower
    IF upperCount = 1 AND word[0] is uppercase THEN RETURN true  // title case
    RETURN false
END FUNCTION
```

---

## Walkthrough

| Input      | All Upper? | All Lower? | Title Case? | Result |
|------------|------------|------------|-------------|--------|
| `"USA"`    | ✅          | ✗          | —           | true   |
| `"leetcode"` | ✗       | ✅          | —           | true   |
| `"Google"` | ✗          | ✗          | ✅           | true   |
| `"FlaG"`   | ✗          | ✗          | ✗           | false  |
| `"a"`      | ✗          | ✅          | —           | true   |

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass through the string |
| **Space** | O(1) | No extra storage needed |

---

## Follow-Up Questions

**Q1: Can you do it in a single pass without built-in string methods?**
> Yes — count uppercase letters in one pass, then check the three conditions (count == 0, count == n, or count == 1 and first is upper).

**Q2: What about locale-sensitive capitalization?**
> For ASCII English letters this is straightforward. Unicode capitalization (e.g., German ß → SS) would require locale-aware libraries.

**Q3: How would you extend this for camelCase or snake_case validation?**
> Define rules for each pattern (e.g., camelCase: first char lower, no underscores, uppercase starts each new word) and check similarly.

---

## Key Takeaway

> **When validating against a small fixed set of patterns, enumerate and check each one — simplicity beats cleverness for easy problems.**
