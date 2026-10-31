# 604. Design Compressed String Iterator

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/design-compressed-string-iterator](https://leetcode.com/problems/design-compressed-string-iterator)
**Companies:** Google

---

## Problem Description

Design and implement a data structure for a compressed string iterator. The given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.

Implement the `StringIterator` class:

- `next()` Returns **the next character** if the original string still has uncompressed characters, otherwise returns a **white space**.
- `hasNext()` Returns true if there is any letter needs to be uncompressed in the original string, otherwise returns `false`.

**Constraints:**

- `1 <= compressedString.length <= 1000`
- `compressedString` consists of lower-case an upper-case English letters and digits.
- The number of a single character repetitions in `compressedString` is in the range `[1, 10^9]`
- At most `100` calls will be made to `next` and `hasNext`.

---

## Examples

```
Example 1:
  Input:
  ["StringIterator", "next", "next", "next", "next", "next", "next", "hasNext", "next", "hasNext"]
  [["L1e2t1C1o1d1e1"], [], [], [], [], [], [], [], [], []]
  Output:
  [null, "L", "e", "e", "t", "C", "o", true, "d", true]
  Explanation:
  StringIterator stringIterator = new StringIterator("L1e2t1C1o1d1e1");
  stringIterator.next(); // return "L"
  stringIterator.next(); // return "e"
  stringIterator.next(); // return "e"
  stringIterator.next(); // return "t"
  stringIterator.next(); // return "C"
  stringIterator.next(); // return "o"
  stringIterator.hasNext(); // return True
  stringIterator.next(); // return "d"
  stringIterator.hasNext(); // return True
```

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

> Parse the run-length encoded string into `(char, count)` pairs and maintain an index plus a remaining-count counter; each `next()` consumes one count and advances the index when the count reaches zero.
