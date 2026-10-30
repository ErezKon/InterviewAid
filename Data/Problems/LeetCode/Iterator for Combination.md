# 1286. Iterator for Combination

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/iterator-for-combination](https://leetcode.com/problems/iterator-for-combination)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Precompute Combinations — O(C(n,k)) ✅](#4-approach-precompute-combinations--ocnk-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Design the `CombinationIterator` class:

- `CombinationIterator(string characters, int combinationLength)` Initializes the object with a string `characters` of **sorted distinct** lowercase English letters and a number `combinationLength` as arguments.
- `next()` Returns the next combination of length `combinationLength` in **lexicographical order**.
- `hasNext()` Returns `true` if and only if there exists a next combination.

**Constraints:**
- `1 <= combinationLength <= characters.length <= 15`
- All the characters of `characters` are **unique**.
- At most `10^4` calls will be made to `next` and `hasNext`.
- It is guaranteed that all calls of the function `next` are valid.

---

## 2. Examples

**Example 1:**
```
Input
["CombinationIterator", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[["abc", 2], [], [], [], [], [], []]
Output:
[null, "ab", true, "ac", true, "bc", false]
Explanation:
CombinationIterator itr = new CombinationIterator("abc", 2);
itr.next();    // return "ab"
itr.hasNext(); // return True
itr.next();    // return "ac"
itr.hasNext(); // return True
itr.next();    // return "bc"
itr.hasNext(); // return False
```

---

## 3. Key Insight

Since the input string is already sorted, generate all combinations of length `k` in lexicographic order upfront (or lazily via bitmask). Store them in a list and iterate with a pointer.

---

## 4. Approach: Precompute Combinations — O(C(n,k)) ✅

```
CLASS CombinationIterator:
    CONSTRUCTOR(characters, combinationLength):
        combos = []
        backtrack(characters, combinationLength, 0, "", combos)
        idx = 0

    FUNCTION backtrack(chars, k, start, current, result):
        IF len(current) == k:
            result.ADD(current)
            RETURN
        FOR i ← start TO len(chars) - 1:
            backtrack(chars, k, i + 1, current + chars[i], result)

    FUNCTION next():
        result = combos[idx]
        idx += 1
        RETURN result

    FUNCTION hasNext():
        RETURN idx < len(combos)
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Constructor | O(C(n,k)) | Generate all combinations |
| next() | O(1) | Index lookup |
| hasNext() | O(1) | Index comparison |
| Space | O(C(n,k) · k) | Store all combinations |

---

## 6. Key Takeaway

> Precompute all combinations via backtracking, then serve them via an index pointer. For n ≤ 15, this is efficient. Alternative: use a bitmask to lazily generate the next combination on each `next()` call.
