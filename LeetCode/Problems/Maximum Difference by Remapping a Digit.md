# 2566. Maximum Difference by Remapping a Digit

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(d)](#approach-greedy--od-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Remap one digit to another (all occurrences change). Find the maximum difference between the largest and smallest possible numbers after one remap each.

---

## Key Insight

> To maximize: replace the first non-9 digit with 9. To minimize: replace the first digit with 0. Difference = max - min.

---

## Approach: Greedy — O(d) ✅

```
FUNCTION minMaxDifference(num):
    s = str(num)
    // Max: replace first non-9 digit with 9
    maxS = s.replace(next(d for d in s if d != '9'), '9') if any(d!='9' for d in s) else s
    // Min: replace first digit with 0
    minS = s.replace(s[0], '0')
    RETURN int(maxS) - int(minS)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(d)** | O(d) |

---

## Key Takeaway

> **Maximize by mapping first non-9 → 9, minimize by mapping leading digit → 0.** Two independent greedy choices.
