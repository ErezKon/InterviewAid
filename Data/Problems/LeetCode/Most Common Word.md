# 819. Most Common Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-common-word](https://leetcode.com/problems/most-common-word)
**Companies:** Amazon, Datadog, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `paragraph` and a string array of the banned words `banned`, return *the most frequent word that is not banned*. It is **guaranteed** there is **at least one word** that is not banned, and that the answer is **unique**.

The words in `paragraph` are **case-insensitive** and the answer should be returned in **lowercase**.

**Note** that words can not contain punctuation symbols.

**Constraints:**
- `1 <= paragraph.length <= 1000`
- `paragraph` consists of English letters, space `' '`, or one of the symbols: `"!?',;."`.
- `0 <= banned.length <= 100`
- `1 <= banned[i].length <= 10`
- `banned[i]` consists of only lowercase English letters.

---

## 2. Key Insight

> Parse the paragraph into lowercase words, ignore punctuation, filter out banned words using a set, then count frequencies with a hash map and pick the maximum.

---

## 3. Approach: Hash Map — O(n) ✅

```text
FUNCTION mostCommonWord(paragraph, banned):
    // Build set of banned words (lowercase)
    bannedSet ← SET(w.lower() FOR w IN banned)
    // Extract words, ignoring punctuation, and lowercase them
    words ← REGEX_FINDALL('[a-zA-Z]+', paragraph.lower())
    count ← MAP()
    FOR w IN words:
        IF w NOT IN bannedSet:
            count[w] ← count.get(w, 0) + 1
    // Return word with highest frequency
    RETURN ARGMAX(count, key = count[value])
```

---

## 4. Examples

```
Example 1:
  Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
  Output: "ball"
  Explanation:
  "hit" occurs 3 times, but it is a banned word.
  "ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph.
  Note that words in the paragraph are not case sensitive,
  that punctuation is ignored (even if adjacent to words, such as "ball,"),
  and that "hit" isn't the answer even though it occurs more because it is banned.
```

```
Example 2:
  Input: paragraph = "a.", banned = []
  Output: "a"
```

---

## 5. Walkthrough

| Step | Action | State of `count` |
|------|--------|-----------------|
| 1 | Build `bannedSet = {"hit"}` | — |
| 2 | Process word `bob` → not banned | `{bob:1}` |
| 3 | Process `hit` → skipped | `{bob:1}` |
| 4 | Process `ball` → count `{bob:1, ball:1}` |
| 5 | Process second `ball` → `{bob:1, ball:2}` |
| … | Continue for remaining words | `{bob:1, a:1, ball:2, the:1, flew:1, far:1, after:1, it:1, was:1}` |
| Final | Return word with max count → `ball` |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass over words |
| **Space** | O(m) — hash map for distinct non‑banned words |

---

## 7. Follow-Up Questions

1. How would you modify the solution to handle streaming input where the paragraph is received piece‑wise?
2. Can you extend the algorithm to return the top‑k most frequent non‑banned words?
3. What changes are needed if punctuation should be considered part of a word (e.g., "can't")?

---

## 8. Key Takeaway

> **Regex tokenization + hash map** — extract words, filter banned via a set, count frequencies, and pick the maximum. A clean one‑liner pattern for frequency problems.
