# 1371. Find the Longest Substring Containing Vowels in Even Counts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts](https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Bitmask + First Occurrence — O(n) ✅](#4-approach-bitmask--first-occurrence--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a string `s`, return the length of the longest substring where every vowel (`a`, `e`, `i`, `o`, `u`) appears an **even** number of times (including zero).

**Constraints:**
- `1 <= s.length <= 5 × 10⁵`
- `s` contains only lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  s = "eleetminicoders"
  Output: 13
  Reason: "leetminicoder" has all vowels in even counts.

Example 2:
  Input:  s = "leetcodeisgreat"
  Output: 5
  Reason: "tcode" has no vowels (0 is even).
```

---

## 3. Key Insight

> Use a 5-bit mask to track the parity (odd/even) of each vowel. XOR toggles the bit on each vowel occurrence. If the same mask appears twice at positions `i` and `j`, then substring `s[i+1..j]` has all vowels in even counts.

---

## 4. Approach: Bitmask + First Occurrence — O(n) ✅

```
FUNCTION findTheLongestSubstring(s):
    mask = 0
    firstSeen = {0: -1}
    maxLen = 0
    vowelBit = {'a': 0, 'e': 1, 'i': 2, 'o': 3, 'u': 4}

    FOR i, c IN enumerate(s):
        IF c IN vowelBit:
            mask ^= 1 << vowelBit[c]
        IF mask IN firstSeen:
            maxLen = MAX(maxLen, i - firstSeen[mask])
        ELSE:
            firstSeen[mask] = i

    RETURN maxLen
```

---

## 5. Walkthrough

```
s = "leetcodeisgreat"

i=0 'l': mask=00000, seen at -1 → len=1
i=1 'e': mask=00010, store i=1
i=2 'e': mask=00000, seen at -1 → len=3
i=3 't': mask=00000, seen at -1 → len=4
i=4 'c': mask=00000, seen at -1 → len=5
...
Max found: "tcode" or similar with all-even vowels.

Result: 5 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(2⁵) = O(1) — at most 32 mask states |

---

## 7. Follow-Up Questions

### 7.1 Why XOR for parity tracking?

XOR toggles a bit: even count → bit 0, odd count → bit 1. Same mask at two positions means all vowels changed an even number of times in between.

### 7.2 Can this be extended to consonants too?

Not directly with a bitmask (26 bits), but the same principle applies with a hash map on a 26-bit mask.

---

## 8. Key Takeaway

> **Bitmask parity + first occurrence** is the canonical pattern for "all characters appear even times" substring problems. XOR tracks parity in O(1), and the hash map stores first occurrences of each state.
