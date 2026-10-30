# 411. Minimum Unique Word Abbreviation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-unique-word-abbreviation](https://leetcode.com/problems/minimum-unique-word-abbreviation)

**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask Enumeration — O(2ⁿ · m)](#3-approach-bitmask-enumeration)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Follow-Up Questions](#5-follow-up-questions)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A string can be **abbreviated** by replacing any number of **non-adjacent** substrings with their lengths. For example, a string such as `"substitution"` could be abbreviated as (but not limited to):

- `"s10n"` (`"s ubstitutio n"`)
- `"sub4u4"` (`"sub stit u tion"`)
- `"12"` (`"substitution"`)
- `"su3i1u2on"` (`"su bst i t u ti on"`)
- `"substitution"` (no substrings replaced)

Note that `"s55n"` (`"s ubsti tutio n"`) is not a valid abbreviation of `"substitution"` because the replaced substrings are adjacent.

The **length** of an abbreviation is the number of letters that were not replaced plus the number of substrings that were replaced. For example, the abbreviation `"s10n"` has a length of `3` (`2` letters + `1` substring) and `"su3i1u2on"` has a length of `9` (`6` letters + `3` substrings).

Given a target string `target` and an array of strings `dictionary`, return *an **abbreviation** of *`target`* with the **shortest possible length** such that it is **not an abbreviation** of **any** string in *`dictionary`*. If there are multiple shortest abbreviations, return any of them*.

**Constraints:**
- `m == target.length`
- `n == dictionary.length`
- `1 <= m <= 21`
- `0 <= n <= 1000`
- `1 <= dictionary[i].length <= 100`
- `log_2(n) + m <= 21` if `n > 0`
- `target` and `dictionary[i]` consist of lowercase English letters.
- `dictionary` does not contain `target`.

---

## 2. Key Insight

> Use a bitmask over target's characters: `1` = keep character, `0` = abbreviate. For each mask, generate the abbreviation string and check it doesn't match any dictionary word. Find the mask that yields the shortest valid abbreviation.

---

## 3. Approach: Bitmask Enumeration — O(2ⁿ · m) ✅

```text
FUNCTION minAbbreviation(target, dictionary):
    n ← LENGTH(target)
    // Pre‑compute conflict masks for dictionary words of same length
    conflictMasks ← []
    FOR each word IN dictionary:
        IF LENGTH(word) ≠ n: CONTINUE
        mask ← 0
        FOR i ← 0 TO n‑1:
            IF target[i] = word[i]:
                SET mask ← mask OR (1 << i)
        APPEND mask TO conflictMasks

    bestLen ← INFINITY
    bestAbbr ← target
    FOR mask ← 0 TO (1 << n)‑1:
        abbr ← generateAbbr(target, mask)
        IF LENGTH(abbr) ≥ bestLen: CONTINUE
        IF isValid(mask, conflictMasks):
            bestLen ← LENGTH(abbr)
            bestAbbr ← abbr
    RETURN bestAbbr

FUNCTION isValid(mask, conflictMasks):
    FOR cm IN conflictMasks:
        // mask must differ from cm on at least one kept character
        IF (mask AND cm) = mask: RETURN FALSE
    RETURN TRUE

FUNCTION generateAbbr(word, mask):
    result ← ""
    count ← 0
    FOR i ← 0 TO LENGTH(word)‑1:
        IF (mask >> i) AND 1 = 0:
            SET count ← count + 1
        ELSE:
            IF count > 0: APPEND STRING(count) TO result
            APPEND word[i] TO result
            SET count ← 0
    IF count > 0: APPEND STRING(count) TO result
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: target = "apple", dictionary = ["blade"]
Output: "a4"
Explanation: The shortest abbreviation of "apple" is "5", but this is also an abbreviation of "blade".
The next shortest abbreviations are "a4" and "4e". "4e" is an abbreviation of blade while "a4" is not.
Hence, return "a4".
```

**Example 2:**
```
Input: target = "apple", dictionary = ["blade","plain","amber"]
Output: "1p3"
Explanation: "5" is an abbreviation of both "apple" but also every word in the dictionary.
"a4" is an abbreviation of "apple" but also "amber".
"4e" is an abbreviation of "apple" but also "blade".
"1p3", "2p2", and "3l1" are the next shortest abbreviations of "apple".
Since none of them are abbreviations of words in the dictionary, returning any of them is correct.
```

---

## 5. Walkthrough

We walk through **Example 1** (`target = "apple"`, `dictionary = ["blade"]`).

| Step | Mask (binary) | Kept chars | Generated abbreviation | Valid? |
|------|---------------|------------|------------------------|--------|
| 1    | 11111 (31)    | a p p l e  | "apple" (no abbreviation) | Invalid – matches target itself but not a dictionary word, but not minimal |
| 2    | 10000 (16)    | a _ _ _ _  | "a4"                  | Valid – does not match "blade" and length = 2 (best so far) |
| 3    | 01000 (8)     | _ p _ _ _  | "1p3"                 | Valid but length = 3 > 2 |
| ...  | ...           | ...        | ...                    | ... |

The algorithm enumerates all 2⁵ = 32 masks, discarding those that are longer than the current best. The first mask that yields a length‑2 abbreviation and passes the conflict check is `10000`, giving the answer `"a4"`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(2ⁿ · m) — n = target length, m = number of dictionary words of length n |
| **Space** | O(m) for storing conflict masks |

---

## 7. Follow-Up Questions

1. How would you adapt the solution if the dictionary contained words of varying lengths?
2. Can the enumeration be pruned using a BFS over masks to find the shortest abbreviation faster?
3. How would you extend the approach to generate *all* minimal‑length abbreviations instead of just one?

---

## 8. Key Takeaway

> **Bitmask over characters for abbreviation enumeration.** Conflict masks pre‑compute which characters match each dictionary word. A valid abbreviation must keep at least one differing character for every dictionary entry.
