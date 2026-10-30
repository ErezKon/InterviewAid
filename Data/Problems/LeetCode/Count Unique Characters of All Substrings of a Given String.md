# 828. Count Unique Characters of All Substrings of a Given String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string](https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string)
**Companies:** Amazon, Forusall, Microsoft

---

## Problem Description

Let's define a function `countUniqueChars(s)` that returns the number of unique characters in `s`.

- For example, calling `countUniqueChars(s)` if `s = "LEETCODE"` then `"L"`, `"T"`, `"C"`, `"O"`, `"D"` are the unique characters since they appear only once in `s`, therefore `countUniqueChars(s) = 5`.

Given a string `s`, return the sum of `countUniqueChars(t)` where `t` is a substring of `s`. The test cases are generated such that the answer fits in a 32-bit integer.

Notice that some substrings can be repeated so in this case you have to count the repeated ones too.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters only.

---

## Examples

```
Example 1:
  Input: s = "ABC"
  Output: 10
  Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
  Every substring is composed with only unique letters.
  Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
```

```
Example 2:
  Input: s = "ABA"
  Output: 8
  Explanation: The same as example 1, except countUniqueChars("ABA") = 1.
```

```
Example 3:
  Input: s = "LEETCODE"
  Output: 92
```

---

## Key Insight

Instead of iterating over substrings, think per character. For each occurrence of character `c` at position `i`, count how many substrings include position `i` as the **only** occurrence of `c`. The answer is `(i - prev_occurrence) × (next_occurrence - i)` — choosing left bound from `(prev+1..i]` and right bound from `[i..next-1)`.

---

## Approach

```
FUNCTION uniqueLetterString(s):
    // For each char, count substrings where it's unique
    // Track previous two positions of each character
    index = defaultdict(lambda: [-1])
    FOR i, c IN enumerate(s): index[c].ADD(i)
    FOR c IN index: index[c].ADD(len(s))

    result = 0
    FOR c, positions IN index.items():
        FOR i ← 1 TO len(positions) - 2:
            result += (positions[i] - positions[i-1]) * (positions[i+1] - positions[i])

    RETURN result
```

---

## Walkthrough

**Input:** `s = "ABC"`

```
Positions: A→[-1,0,3], B→[-1,1,3], C→[-1,2,3]
A at 0: (0-(-1)) × (3-0) = 1 × 3 = 3
B at 1: (1-(-1)) × (3-1) = 2 × 2 = 4
C at 2: (2-(-1)) × (3-2) = 3 × 1 = 3
Total: 10 ✅ (substrings: A(1)+B(1)+C(1)+AB(2)+BC(2)+ABC(3)=10)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Contribution technique: for each character occurrence, count substrings where it's the only instance. Bounded by previous and next occurrence of the same character. Product of left × right choices gives the contribution.**