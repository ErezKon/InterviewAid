# 484. Find Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-permutation](https://leetcode.com/problems/find-permutation)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Reverse — O(n) ✅](#4-approach-greedy-reverse--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `s` of length `n` consisting only of characters `'D'` (decrease) and `'I'` (increase), find any permutation of integers `[1, 2, ..., n+1]` such that for every `i`:

- If `s[i] == 'D'`, then `perm[i] > perm[i+1]`
- If `s[i] == 'I'`, then `perm[i] < perm[i+1]`

Return the **lexicographically smallest** such permutation.

**Constraints:**
- `1 <= s.length <= 10⁵`
- `s[i]` is either `'D'` or `'I'`

---

## 2. Examples

```
Example 1:
  Input:  s = "I"
  Output: [1, 2]
  Reason: 1 < 2 satisfies 'I'.

Example 2:
  Input:  s = "DI"
  Output: [2, 1, 3]
  Reason: 2 > 1 satisfies 'D', 1 < 3 satisfies 'I'.

Example 3:
  Input:  s = "DDIID"
  Output: [3, 2, 1, 4, 6, 5]
```

---

## 3. Key Insight

> Start with the identity permutation `[1, 2, ..., n+1]`. For each consecutive run of `'D'`s, **reverse** that segment. This keeps the result lexicographically smallest because we only invert the minimum necessary portion.

---

## 4. Approach: Greedy Reverse — O(n) ✅

```
FUNCTION findPermutation(s):
    n ← LENGTH(s)
    result ← [1, 2, 3, ..., n + 1]     // identity permutation

    i ← 0
    WHILE i < n DO
        IF s[i] == 'D' THEN
            j ← i
            WHILE j < n AND s[j] == 'D' DO
                j ← j + 1
            // Reverse result[i..j]
            REVERSE(result, i, j)
            i ← j
        ELSE
            i ← i + 1

    RETURN result
```

---

## 5. Walkthrough

```
s = "DDIID"
n = 5, result = [1, 2, 3, 4, 5, 6]

i=0: s[0]='D' → find run of D's: "DD" from index 0 to 1, j=2
     Reverse result[0..2]: [1,2,3,...] → [3,2,1,4,5,6]
     i=2

i=2: s[2]='I' → skip, i=3
i=3: s[3]='I' → skip, i=4

i=4: s[4]='D' → run of D's: "D" from index 4 to 4, j=5
     Reverse result[4..5]: [...,5,6] → [...,6,5]
     result = [3,2,1,4,6,5]
     i=5

Final: [3, 2, 1, 4, 6, 5] ✅

Verify: D(3>2) D(2>1) I(1<4) I(4<6) D(6>5) ✓
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each element visited at most twice |
| **Space** | O(n) — the result array |

---

## 7. Follow-Up Questions

### 7.1 Why is this lexicographically smallest?

The identity permutation `[1,2,...,n+1]` is the smallest possible. We only disturb it where forced by `'D'` characters, and reversing the minimal segment keeps earlier positions as small as possible.

### 7.2 Can you solve this with a stack?

Yes — push numbers onto a stack and pop whenever you see `'I'` or reach the end. This also produces the lex-smallest permutation in O(n).

### 7.3 What if we want the lexicographically largest permutation?

Start with the reverse identity `[n+1, n, ..., 1]` and reverse segments of `'I'`s instead.

---

## 8. Key Takeaway

> **Reverse segments of the identity permutation** at each run of `'D'`s to build the lexicographically smallest valid permutation. This greedy approach works because it delays using larger numbers until absolutely necessary.
