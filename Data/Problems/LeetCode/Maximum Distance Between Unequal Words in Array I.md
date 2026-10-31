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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a string array `words`.

Find the **maximum distance** between two **distinct** indices `i` and `j` such that:

- `words[i] != words[j]`, and
- the distance is defined as `j - i + 1`.

Return the maximum distance among all such pairs. If no valid pair exists, return 0.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: words = ["leetcode","leetcode","codeforces"]
Output: 3
Explanation: In this example, words[0] and words[2] are not equal, and they have the maximum distance 2 - 0 + 1 = 3.
```

**Example 2:**
```
Input: words = ["a","b","c","a","a"]
Output: 4
Explanation: In this example words[1] and words[4] have the largest distance of 4 - 1 + 1 = 4.
```

**Example 3:**
```
Input: words = ["z","z","z"]
Output: 0
Explanation: In this example all the words are equal, thus the answer is 0.
```

---

## Approach

**Two Pointers** – Check the outermost elements first. If they differ, the distance is `n-1`. If they are the same, move one pointer inward from the side that matches the opposite end until a mismatch is found.

```text
FUNCTION maxUnequalDistance(words):
    n ← LENGTH(words)
    IF words[0] ≠ words[n-1]:
        RETURN n-1
    // Try leftmost vs second-last
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
- What changes are required if the array is **circular** (wrap-around allowed)?

---

## Key Takeaway

> **Check the ends first; the answer is usually `n-1`.** If the ends match, move inward until a mismatch gives the maximal distance.
