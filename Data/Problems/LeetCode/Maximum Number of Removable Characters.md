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

Given strings `s` and `p` (where `p` is a subsequence of `s`), and an array `removable` of indices in `s`, return the **maximum** `k` such that after removing the first `k` characters at `removable` indices, `p` is still a subsequence of the remaining `s`.

**Constraints:**
- `1 <= p.length <= s.length <= 10^5`
- `0 <= removable[i] < s.length`

---

## Examples

**Example 1:**
```
Input:  s = "abcacb", p = "ab", removable = [3,1,0]
Output: 2
Explanation: Remove indices 3,1: s→"a_c_cb" → "accb". "ab"? a✓, b✓ → yes. Remove 3,1,0: "_bc_cb". "ab"? no 'a' left → no. Answer: 2.
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
