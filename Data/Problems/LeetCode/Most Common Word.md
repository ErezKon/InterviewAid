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

Given a paragraph and a list of banned words, return the **most frequent** word that is not banned. The comparison is case‑insensitive and punctuation should be treated as word separators.

**Constraints:**
- `1 <= paragraph.length <= 1000`
- `0 <= banned.length <= 100`

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

**Example 1:**
```
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
```
- After cleaning and lowercasing, words are `[bob, a, ball, the, ball, flew, far, after, it, was, hit]`.
- Excluding "hit", "ball" appears twice, which is the highest frequency.
**Output:** `"ball"`

**Example 2:**
```
paragraph = "Jack and Jill went up the hill."
banned = []
```
- All words appear once; the first word alphabetically after processing is returned.
**Output:** `"jack"`

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
