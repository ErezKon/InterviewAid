# 2114. Maximum Number of Words Found in Sentences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-words-found-in-sentences](https://leetcode.com/problems/maximum-number-of-words-found-in-sentences)
**Companies:** Amazon, Google, Microsoft, Zoho

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

A **sentence** is a list of **words** that are separated by a single space with no leading or trailing spaces.

You are given an array of strings `sentences`, where each `sentences[i]` represents a single **sentence**.

Return *the **maximum number of words** that appear in a single sentence*.

**Constraints:**
- `1 <= sentences.length <= 100`
- `1 <= sentences[i].length <= 100`
- `sentences[i]` consists only of lowercase English letters and `' '` only.
- `sentences[i]` does not have leading or trailing spaces.
- All the words in `sentences[i]` are separated by a single space.

---

## Examples

```
Example 1:
  Input: sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
  Output: 6
  Explanation:
    - The first sentence, "alice and bob love leetcode", has 5 words in total.
    - The second sentence, "i think so too", has 4 words in total.
    - The third sentence, "this is great thanks very much", has 6 words in total.
    Thus, the maximum number of words in a single sentence comes from the third sentence, which has 6 words.
```

```
Example 2:
  Input: sentences = ["please wait", "continue to fight", "continue to win"]
  Output: 3
  Explanation: It is possible that multiple sentences contain the same number of words.
    In this example, the second and third sentences have the same number of words.
```

---

## Key Insight

> Word count = number of spaces + 1, or simply split and count. Take the maximum.

---

## Approach

```
FUNCTION mostWordsFound(sentences)
    RETURN MAX(count of words in s FOR each s IN sentences)
END FUNCTION
```

---

## Walkthrough

```
sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
Word counts: [5, 4, 6]
```

**Result: 6** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × m)** — n sentences, m avg length |
| Space  | **O(m)** — split result per sentence |

---

## Follow-Up Questions

1. **Alternative without split?**
   Count spaces: `words = spaces + 1`.

2. **What if words were separated by multiple spaces?**
   Would need to handle consecutive spaces (split with filter).

---

## Key Takeaway

> **One-liner: split and count** — split each sentence by spaces, find the max word count. Simple string processing.
