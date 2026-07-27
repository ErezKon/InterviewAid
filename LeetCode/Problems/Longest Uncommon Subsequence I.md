# 521. Longest Uncommon Subsequence I

**Difficulty:** 🟢 Easy
**Companies:** Google, Meta

---

## 1. Problem Description

Given two strings, find the longest uncommon subsequence (a subsequence of one that is NOT a subsequence of the other).

---

## 2. Approach: Observation — O(n) ✅

```
FUNCTION findLUSlength(a, b):
    RETURN -1 IF a == b ELSE MAX(len(a), len(b))
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> If strings differ, the longer one is never a subsequence of the shorter one. If equal, no uncommon subsequence exists. A deceptively simple problem.
