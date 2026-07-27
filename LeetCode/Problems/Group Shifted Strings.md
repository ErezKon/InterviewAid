# 249. Group Shifted Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-shifted-strings](https://leetcode.com/problems/group-shifted-strings)
**Companies:** Google, Meta, Uber, Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Normalize by Shift — O(n · k) ✅](#3-approach-normalize-by-shift--on--k-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Group strings that can be shifted to one another (`"abc"` → `"bcd"` → `"xyz"`).

---

## 2. Key Insight

> Normalize each string by computing relative differences mod 26. Strings with the same difference tuple belong to the same shift group.

---

## 3. Approach: Normalize by Shift — O(n · k) ✅

```
FUNCTION groupStrings(strings):
    groups = defaultdict(list)
    FOR s IN strings:
        key = tuple((ord(c) - ord(s[0])) % 26 for c in s)
        groups[key].ADD(s)
    RETURN list(groups.values())
```

---

## 4. Key Takeaway

> **Canonicalize** by shifting the first character to 'a' (relative differences mod 26). Same canonical form = same group.
