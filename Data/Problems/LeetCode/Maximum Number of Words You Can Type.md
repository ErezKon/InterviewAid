# 1935. Maximum Number of Words You Can Type

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-words-you-can-type](https://leetcode.com/problems/maximum-number-of-words-you-can-type)
**Companies:** Amazon, Google, Microsoft, Quora

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a malfunctioning keyboard where some letter keys do not work. All other keys on the keyboard work properly.

Given a string `text` of words separated by a single space (no leading or trailing spaces) and a string `brokenLetters` of all **distinct** letter keys that are broken, return *the **number of words** in* `text` *you can fully type using this keyboard*.

**Constraints:**
- `1 <= text.length <= 10^4`
- `0 <= brokenLetters.length <= 26`
- `text` consists of words separated by a single space without any leading or trailing spaces.
- Each word only consists of lowercase English letters.
- `brokenLetters` consists of **distinct** lowercase English letters.

---

## Examples

```
Example 1:
  Input: text = "hello world", brokenLetters = "ad"
  Output: 1
  Explanation: We cannot type "world" because the 'd' key is broken.
```

```
Example 2:
  Input: text = "leet code", brokenLetters = "lt"
  Output: 1
  Explanation: We cannot type "leet" because the 'l' and 't' keys are broken.
```

```
Example 3:
  Input: text = "leet code", brokenLetters = "e"
  Output: 0
  Explanation: We cannot type either word because the 'e' key is broken.
```

---

## Key Insight

> Put broken letters in a set, then check each word — if no character is broken, it's typable.

---

## Approach

```
FUNCTION canBeTypedWords(text, brokenLetters)
    broken ← SET(brokenLetters)
    RETURN count of words in text.split() where no char is in broken
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — scan all characters |
| Space  | **O(1)** — broken set ≤ 26 |

---

## Key Takeaway

> **Set membership check** — simple string processing: check each word against the broken letter set.
