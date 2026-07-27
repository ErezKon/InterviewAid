# 819. Most Common Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-common-word](https://leetcode.com/problems/most-common-word)
**Companies:** Amazon, Datadog, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a paragraph and a list of banned words, return the **most frequent** word that is not banned. Case-insensitive. Punctuation should be treated as word separators.

**Constraints:**
- `1 <= paragraph.length <= 1000`

---

## 2. Key Insight

> Parse words (ignore punctuation), lowercase everything, filter out banned words, count frequencies, return the max.

---

## 3. Approach: Hash Map — O(n) ✅

```
FUNCTION mostCommonWord(paragraph, banned):
    bannedSet = SET(w.lower() for w in banned)
    words = re.findall(r'[a-zA-Z]+', paragraph.lower())
    count = Counter(w for w in words if w not in bannedSet)
    RETURN count.most_common(1)[0][0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — parse + count |
| **Space** | O(n) — word counts |

---

## 5. Key Takeaway

> **Regex tokenization + Counter** — extract words with regex, filter banned via set, count with hash map. Clean one-liner pattern.
