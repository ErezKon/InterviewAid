# 2047. Number of Valid Words in a Sentence

**Difficulty:** 🟢 Easy

**Companies:** Cisco, Meta, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Validation — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count valid tokens in a sentence. A token is valid if: no digits, at most one hyphen (not at start/end, surrounded by letters), at most one punctuation (only at end).

---

## 2. Approach: Validation — O(n) ✅

```
// For each word: validate no digits, at most one hyphen (not at edges),
// at most one punctuation (at end)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) total characters |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Careful character validation per token.** Check three rules: no digits, hyphen constraints, punctuation constraints. Split then validate each.
