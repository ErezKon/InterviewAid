# 1647. Minimum Deletions to Make Character Frequencies Unique

**Difficulty:** 🟡 Medium
**Acceptance:** 59.0%
**LeetCode:** [https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique](https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique)
**Companies:** Amazon, American Express, Google, Intuit, Microsoft, Smartnews

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy with Set — O(n)](#approach-greedy-with-set--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A string `s` is called **good** if there are no two different characters in `s` that have the same **frequency**.

Given a string `s`, return *the **minimum** number of characters you need to delete to make* `s` ***good**.*

The **frequency** of a character in a string is the number of times it appears in the string. For example, in the string `"aab"`, the **frequency** of `'a'` is `2`, while the **frequency** of `'b'` is `1`.

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `s` contains only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "aab"
  Output: 0
  Explanation: s is already good.
```

```
Example 2:
  Input: s = "aaabbbcc"
  Output: 2
  Explanation: You can delete two 'b's resulting in the good string "aaabcc".
  Another way it to delete one 'b' and one 'c' resulting in the good string "aaabbc".
```

```
Example 3:
  Input: s = "ceabaacb"
  Output: 2
  Explanation: You can delete both 'c's resulting in the good string "eabaab".
  Note that we only care about characters that are still in the string at the end (i.e. frequency of 0 is ignored).
```

---

## Key Insight

> Greedily reduce each frequency until it's unique. Process frequencies from highest to lowest — when a collision occurs, decrement until you find an unused frequency (or 0).

---

## Approach: Greedy with Set — O(n) ✅

```
FUNCTION minDeletions(s):
    freq = frequency array of s
    SORT freq descending
    usedFreqs = set()
    deletions = 0

    FOR f IN freq:
        IF f == 0: CONTINUE
        WHILE f > 0 AND f IN usedFreqs:
            f -= 1
            deletions += 1
        usedFreqs.ADD(f)

    RETURN deletions
```

---

## Walkthrough

```
s = "aaabbbcc"
freq: a=3, b=3, c=2 → sorted: [3, 3, 2]
```

| Step | f (original) | Collision? | f (final) | Deletions | usedFreqs |
|------|-------------|------------|-----------|-----------|-----------|
| 1 | 3 | No | 3 | 0 | {3} |
| 2 | 3 | 3∈{3} → dec to 2 | 2 | 1 | {3, 2} |
| 3 | 2 | 2∈{3,2} → dec to 1 | 1 | 2 | {3, 2, 1} |

**Result:** **2** deletions ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + 26²) — count frequencies O(n), at most 26 chars each reduced at most 26 times |
| **Space** | O(26) — frequency array and set |

---

## Follow-Up Questions

1. **Why sort descending?** Higher frequencies get priority, reducing total deletions since lower frequencies have more room to drop.
2. **What if we could also add characters?** Then it becomes a different optimization — potentially use a median-based approach.
3. **What's the worst case for deletions?** When all 26 characters have the same frequency `f`, we need frequencies 0,1,...,25 — total deletions = 26f - (0+1+...+25).

---

## Key Takeaway

> Greedily reduce each frequency until it's unique (or zero). Sort frequencies descending to minimize total deletions — each collision is resolved with the fewest possible decrements.
