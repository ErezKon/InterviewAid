# 604. Design Compressed String Iterator

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-compressed-string-iterator](https://leetcode.com/problems/design-compressed-string-iterator)
**Companies:** Google

---

## Problem Description

Design an iterator for a run-length encoded string like `"L1e2t1C1o1d1e1"`. `next()` returns the next character, `hasNext()` checks if more characters exist.

---

## Examples

**Example 1:**

```text
Input:
["StringIterator","next","next","next","next","next","hasNext","next"]
[["L1e2t1C1o1d1e1"],[],[],[],[],[],[],[]]

Output:
[null,"L","e","e","t","C",true,"o"]
```

Explanation:
- The iterator expands to the sequence `L e e t C o d e`.
- Calls to `next()` return characters in order; `hasNext()` is true until the last character is consumed.

---

## Approach

```
CLASS StringIterator:
    CONSTRUCTOR(compressedString):
        // Parse the string into (char, count) pairs
        pairs ← []
        i ← 0
        WHILE i < LENGTH(compressedString):
            ch ← compressedString[i]
            i ← i + 1
            numStr ← ""
            WHILE i < LENGTH(compressedString) AND IS_DIGIT(compressedString[i]):
                numStr ← numStr + compressedString[i]
                i ← i + 1
            count ← INTEGER(numStr)
            APPEND (ch, count) TO pairs
        idx ← 0               // index of current pair
        remaining ← IF pairs IS NOT EMPTY THEN pairs[0].count ELSE 0

    FUNCTION next():
        IF NOT hasNext(): RETURN ' '
        ch ← pairs[idx].char
        remaining ← remaining - 1
        IF remaining == 0:
            idx ← idx + 1
            IF idx < LENGTH(pairs):
                remaining ← pairs[idx].count
        RETURN ch

    FUNCTION hasNext():
        RETURN idx < LENGTH(pairs)
```

---

## Walkthrough

Consider the compressed string `"L1e2t1C1o1d1e1"`.

| Step | Action | idx | remaining | Output |
|------|--------|-----|-----------|--------|
| 1 | Constructor parses pairs: `[(L,1),(e,2),(t,1),(C,1),(o,1),(d,1),(e,1)]` | 0 | 1 | – |
| 2 | `next()` → L | 0 | 0 → advance to idx=1 | L |
| 3 | `next()` → e | 1 | 2→1 | e |
| 4 | `next()` → e | 1 | 1→0 → advance to idx=2 | e |
| 5 | `next()` → t | 2 | 1→0 → advance to idx=3 | t |
| 6 | `next()` → C | 3 | 1→0 → advance to idx=4 | C |
| 7 | `hasNext()` → true (idx=4 < 7) |
| 8 | `next()` → o | 4 | 1→0 → advance to idx=5 | o |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | `next()` and `hasNext()` O(1); constructor O(n) where n is length of input string |
| **Space** | O(k) for storing k `(char, count)` pairs (k ≤ n) |

---

## Follow-Up Questions

- How would you modify the iterator to support a `peek()` operation that returns the next character without advancing?
- Can the design be extended to handle Unicode characters where a character may consist of multiple bytes?
- How would you implement the iterator if the input were streamed rather than given as a full string up front?

---

## Key Takeaway

> Parse the run‑length encoded string into `(char, count)` pairs and maintain an index plus a remaining‑count counter; each `next()` consumes one count and advances the index when the count reaches zero.
