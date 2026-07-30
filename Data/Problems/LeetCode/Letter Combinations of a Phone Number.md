# 17. Letter Combinations of a Phone Number

**Difficulty:** 🟡 Medium
**Acceptance:** 62.0%
**LeetCode:** [https://leetcode.com/problems/letter-combinations-of-a-phone-number](https://leetcode.com/problems/letter-combinations-of-a-phone-number)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Capital One, Chime, Cisco, Citadel, De Shaw, Dropbox, Epic Systems, Expedia, Flexport, Goldman Sachs, Google, Ibm, Linkedin, Lyft, Meta, Microsoft, Oracle, Phonepe, Pinterest, Servicenow, Snapchat, Societe Generale, Tcs, Tesla, Trexquant, Uber, Visa, Yandex, Zoho, Zopsmart

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Backtracking — O(4ⁿ) ✅](#3-approach-1-backtracking--o4ⁿ-)
4. [Approach 2: Iterative — O(4ⁿ)](#4-approach-2-iterative--o4ⁿ)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given a string containing digits from `2-9`, return all possible **letter combinations** that the number could represent (like on a phone keypad).

Mapping: `2→abc, 3→def, 4→ghi, 5→jkl, 6→mno, 7→pqrs, 8→tuv, 9→wxyz`

**Constraints:**
- `0 <= digits.length <= 4`
- `digits[i]` is a digit in `['2', '9']`.

---

## 2. Examples

```
Example 1:
  Input:  digits = "23"
  Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2:
  Input:  digits = ""
  Output: []

Example 3:
  Input:  digits = "2"
  Output: ["a","b","c"]
```

---

## 3. Approach 1: Backtracking — O(4ⁿ) ✅

```
FUNCTION letterCombinations(digits):
    IF digits is empty: RETURN []

    phoneMap = {'2':"abc", '3':"def", '4':"ghi", '5':"jkl",
                '6':"mno", '7':"pqrs", '8':"tuv", '9':"wxyz"}
    result = []
    backtrack(digits, 0, "", result, phoneMap)
    RETURN result

FUNCTION backtrack(digits, index, current, result, phoneMap):
    IF index == len(digits):
        result.ADD(current)
        RETURN

    letters = phoneMap[digits[index]]
    FOR letter IN letters:
        backtrack(digits, index + 1, current + letter, result, phoneMap)
```

---

## 4. Approach 2: Iterative — O(4ⁿ)

Build combinations level by level using a queue or list.

```
FUNCTION letterCombinations(digits):
    IF digits is empty: RETURN []

    phoneMap = {'2':"abc", '3':"def", ...}
    result = [""]

    FOR digit IN digits:
        newResult = []
        FOR combo IN result:
            FOR letter IN phoneMap[digit]:
                newResult.ADD(combo + letter)
        result = newResult

    RETURN result
```

---

## 5. Walkthrough

```
digits = "23"

Backtracking tree:
  index=0, digit='2', letters="abc"
  ├── 'a' → index=1, digit='3', letters="def"
  │   ├── 'ad' → ADD
  │   ├── 'ae' → ADD
  │   └── 'af' → ADD
  ├── 'b' → ...
  │   ├── 'bd', 'be', 'bf'
  └── 'c' → ...
      ├── 'cd', 'ce', 'cf'

Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(4ⁿ · n) — at most 4 letters per digit, n digits |
| **Space** | O(n) recursion depth |

Where n = length of digits string.

---

## 7. Follow-Up Questions

### 7.1 What if we need to find words from a dictionary?

Combine with a **Trie**: during backtracking, prune branches that don't match any dictionary prefix. This turns it into a T9 predictive text problem.

### 7.2 What about digits 0 and 1?

On a standard phone: `0` → space, `1` → (no letters). Handle as special cases — either skip or add a space.

### 7.3 Phone Number to Words (real T9)?

Given a full phone number, find all valid English words. Use a dictionary + Trie for efficient pruning during backtracking.

---

## Key Takeaway

> This is a **Cartesian product** problem solved with backtracking. Each digit adds a "level" to the decision tree. The pattern generalizes to any problem where you combine choices from multiple independent groups.
