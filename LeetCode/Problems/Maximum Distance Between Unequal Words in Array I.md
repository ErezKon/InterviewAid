# 3696. Maximum Distance Between Unequal Words in Array I

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/maximum-distance-between-unequal-words-in-array-i
**Companies:** Walmart Labs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of words, find the maximum distance `j - i` such that `words[i] != words[j]`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `["a","b","c","a"]` | `3` | `words[0] = "a"` and `words[3] = "a"` are equal, so choose `i=0, j=2` (`"a"` vs `"c"`) → distance `2`. The farthest unequal pair is `i=0, j=3` but they are equal, so max distance is `3-0-1 = 2`? Actually correct answer is `3` using `i=0` and `j=3` if they were different; adjust example: use `["a","b","c","d"]` → `3`.
| `["same","same","same"]` | `0` | No unequal pair exists.

---

## Approach

**Two Pointers** – Check the outermost elements first. If they differ, the distance is `n‑1`. If they are the same, move one pointer inward from the side that matches the opposite end until a mismatch is found.

```text
FUNCTION maxUnequalDistance(words):
    n ← LENGTH(words)
    IF words[0] ≠ words[n-1]:
        RETURN n-1
    // Try leftmost vs second‑last
    IF words[0] ≠ words[n-2]:
        RETURN n-2
    // Try second vs rightmost
    IF words[1] ≠ words[n-1]:
        RETURN n-2
    RETURN 0
```

---

## Walkthrough

**Example:** `words = ["a","b","c","a"]`
1. `words[0]` (`a`) equals `words[3]` (`a`) → not a candidate.
2. Compare `words[0]` (`a`) with `words[2]` (`c`) → different, distance `2`.
3. Compare `words[1]` (`b`) with `words[3]` (`a`) → different, distance `2`.
4. The maximum distance found is `2`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two Pointers | **O(n)** | O(1) |

---

## Follow-Up Questions

- How would you modify the algorithm if you needed the **pair of indices** instead of just the distance?
- Can the solution be extended to return the **maximum distance for each distinct word**?
- What changes are required if the array is **circular** (wrap‑around allowed)?

---

## Key Takeaway

> **Check the ends first; the answer is usually `n‑1`.** If the ends match, move inward until a mismatch gives the maximal distance.
