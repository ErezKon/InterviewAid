# 744. Find Smallest Letter Greater Than Target

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-smallest-letter-greater-than-target](https://leetcode.com/problems/find-smallest-letter-greater-than-target)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search — O(log n) ✅](#4-approach-binary-search--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a sorted array of characters `letters` (which wraps around) and a target character, return the **smallest character** in the array that is **strictly larger** than `target`.

If no such character exists, return the first character (wrap around).

**Constraints:**
- `2 <= letters.length <= 10⁴`
- `letters[i]` is a lowercase English letter.
- `letters` is sorted in non-decreasing order.

---

## 2. Examples

```
Example 1:
  Input:  letters = ["c","f","j"], target = "a"
  Output: "c"
  Reason: "c" is the smallest letter > "a".

Example 2:
  Input:  letters = ["c","f","j"], target = "c"
  Output: "f"
  Reason: Strictly greater than "c" → "f".

Example 3:
  Input:  letters = ["c","f","j"], target = "j"
  Output: "c"
  Reason: No letter > "j", so wrap around to "c".
```

---

## 3. Key Insight

> This is a standard **upper bound** binary search: find the first element strictly greater than `target`. If the search goes past the end, wrap around using `lo % len(letters)`.

---

## 4. Approach: Binary Search — O(log n) ✅

```
FUNCTION nextGreatestLetter(letters, target):
    lo, hi = 0, len(letters)
    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF letters[mid] <= target: lo = mid + 1
        ELSE: hi = mid
    RETURN letters[lo % len(letters)]
```

---

## 5. Walkthrough

```
letters = ["c", "f", "j"], target = "c"

lo=0, hi=3
mid=1: letters[1]="f" > "c" → hi=1
mid=0: letters[0]="c" <= "c" → lo=1
lo=1 == hi=1 → RETURN letters[1] = "f" ✅

---
letters = ["c", "f", "j"], target = "j"

lo=0, hi=3
mid=1: "f" <= "j" → lo=2
mid=2: "j" <= "j" → lo=3
lo=3 == hi=3 → RETURN letters[3 % 3] = letters[0] = "c" ✅ (wrap)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) — binary search |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 What if we want the smallest character ≥ target (not strictly greater)?

Change `<=` to `<` in the comparison: `IF letters[mid] < target: lo = mid + 1`.

### 7.2 How does the wrap-around work?

`lo % len(letters)` maps index `n` (past the end) back to `0`, implementing circular behavior.

### 7.3 What if there are duplicates?

The binary search still works — `<=` skips all copies of `target` and finds the next distinct character.

---

## 8. Key Takeaway

> This is the textbook **upper bound binary search** with a modulo wrap-around. The key is using `<=` to find the first element **strictly greater** than the target.
