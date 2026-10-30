# 1898. Maximum Number of Removable Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-removable-characters](https://leetcode.com/problems/maximum-number-of-removable-characters)
**Companies:** Alphonso, Amazon, Snowflake

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two strings `s` and `p` where `p` is a **subsequence** of `s`. You are also given a **distinct 0-indexed** integer array `removable` containing a subset of indices of `s` (`s` is also **0-indexed**).

You want to choose an integer `k` (`0 <= k <= removable.length`) such that, after removing `k` characters from `s` using the **first** `k` indices in `removable`, `p` is still a **subsequence** of `s`. More formally, you will mark the character at `s[removable[i]]` for each `0 <= i < k`, then remove all marked characters and check if `p` is still a subsequence.

Return *the **maximum*** `k` *you can choose such that* `p` *is still a **subsequence** of* `s` *after the removals*.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

**Constraints:**
- `1 <= p.length <= s.length <= 10^5`
- `0 <= removable.length < s.length`
- `0 <= removable[i] < s.length`
- `p` is a **subsequence** of `s`.
- `s` and `p` both consist of lowercase English letters.
- The elements in `removable` are **distinct**.

---

## Examples

```
Example 1:
  Input: s = "abcacb", p = "ab", removable = [3,1,0]
  Output: 2
  Explanation: After removing the characters at indices 3 and 1, "a(b)c(a)cb" becomes "accb".
    "ab" is a subsequence of "accb".
    If we remove the characters at indices 3, 1, and 0, "(a)(b)c(a)cb" becomes "ccb", and "ab" is no longer a subsequence.
    Hence, the maximum k is 2.
```

```
Example 2:
  Input: s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]
  Output: 1
  Explanation: After removing the character at index 3, "abc(b)ddddd" becomes "abcddddd".
    "abcd" is a subsequence of "abcddddd".
```

```
Example 3:
  Input: s = "abcab", p = "abc", removable = [0,1,2,3,4]
  Output: 0
  Explanation: If you remove the first index in the array removable, "abc" is no longer a subsequence.
```

---

## Key Insight

> The "is subsequence" property is **monotonic** — if `p` is a subsequence after removing `k` characters, it's also a subsequence after removing fewer. This enables **binary search on k**.

---

## Approach

```
FUNCTION maximumRemovals(s, p, removable)
    lo ← 0, hi ← len(removable)

    WHILE lo < hi DO
        mid ← (lo + hi + 1) / 2
        IF isSubsequence(s, p, removable[:mid]) THEN
            lo ← mid
        ELSE
            hi ← mid - 1

    RETURN lo
END FUNCTION

FUNCTION isSubsequence(s, p, removed)
    removedSet ← SET(removed)
    j ← 0
    FOR i ← 0 TO len(s) - 1 DO
        IF i IN removedSet THEN CONTINUE
        IF s[i] = p[j] THEN j ← j + 1
        IF j = len(p) THEN RETURN true
    RETURN false
END FUNCTION
```

---

## Walkthrough

```
s = "abcacb", p = "ab", removable = [3,1,0]
```

Binary search: lo=0, hi=3
- mid=2: remove indices {3,1} → "a_c_cb" → "accb". Is "ab" subseq? a✓ at 0, b✓ at 5 → YES. lo=2
- mid=3: remove {3,1,0} → "_bc_cb" → "bccb". Is "ab" subseq? no 'a' → NO. hi=2

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — binary search × O(n) subsequence check |
| Space  | **O(n)** — removed set |

---

## Follow-Up Questions

1. **Why binary search works here?**
   More removals only makes subsequence harder to maintain — monotonic property.

2. **Could we use a different approach?**
   Process removals one by one and check, but that's O(n²) vs O(n log n).

---

## Key Takeaway

> **Binary search on answer + subsequence check** — exploit monotonicity: if valid at k, valid at all k' < k. Binary search finds the maximum k efficiently.
