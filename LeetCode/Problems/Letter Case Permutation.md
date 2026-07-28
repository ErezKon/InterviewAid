# 784. Letter Case Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/letter-case-permutation](https://leetcode.com/problems/letter-case-permutation)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tiktok, Yelp

---

## 1. Problem Description

Given a string containing letters and digits, return all possible strings by toggling each letter's case while keeping digits unchanged.

---

## 2. Examples

**Example 1:**
```
Input: s = "a1b2"
Output: ["a1b2", "a1B2", "A1b2", "A1B2"]
Explanation: Each letter can be lower or upper case, producing 2^2 = 4 combinations.
```

**Example 2:**
```
Input: s = "3z4"
Output: ["3z4", "3Z4"]
Explanation: Only one letter, so two possibilities.
```

---

## 3. Walkthrough

| Step | Char | Current results | Action |
|------|------|----------------|--------|
| 0 | '' (start) | [""] | initialize |
| 1 | 'a' (letter) | ["a", "A"] | duplicate each string with lower and upper |
| 2 | '1' (digit) | ["a1", "A1"] | append digit to all |
| 3 | 'b' (letter) | ["a1b", "a1B", "A1b", "A1B"] | branch again |
| 4 | '2' (digit) | final list | append digit |

The BFS iteratively expands the result list, handling letters by branching and digits by simple concatenation.

---

## 4. Approach: Iterative BFS — O(2^L · n) ✅

```text
FUNCTION letterCasePermutation(s):
    SET result ← [""]
    FOR char IN s:
        IF IS_DIGIT(char):
            SET result ← [r + char FOR r IN result]
        ELSE:
            SET lowerList ← [r + LOWER(char) FOR r IN result]
            SET upperList ← [r + UPPER(char) FOR r IN result]
            SET result ← lowerList + upperList
    RETURN result
```

---

## 5. Complexity Analysis

- **Time:** O(2^L · n) where L is the number of letters (each letter doubles the result size).
- **Space:** O(2^L · n) to store all generated strings.

---

## 6. Key Takeaway

> Use BFS (or backtracking) to expand each letter into two possibilities while preserving digits, yielding all case permutations.
