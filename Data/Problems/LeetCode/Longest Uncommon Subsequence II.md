# 522. Longest Uncommon Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uncommon-subsequence-ii](https://leetcode.com/problems/longest-uncommon-subsequence-ii)
**Companies:** Google

---

## 1. Problem Description

Given an array of strings `strs`, return *the length of the **longest uncommon subsequence** between them*. If the longest uncommon subsequence does not exist, return `-1`.

An **uncommon subsequence** between an array of strings is a string that is a **subsequence of one string but not the others**.

A **subsequence** of a string `s` is a string that can be obtained after deleting any number of characters from `s`.

- For example, `"abc"` is a subsequence of `"aebdc"` because you can delete the underlined characters in `"aebdc"` to get `"abc"`. Other subsequences of `"aebdc"` include `"aebdc"`, `"aeb"`, and `""` (empty string).

**Constraints:**
- `2 <= strs.length <= 50`
- `1 <= strs[i].length <= 10`
- `strs[i]` consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: strs = ["aba","cdc","eae"]
Output: 3
```

**Example 2:**
```
Input: strs = ["aaa","aaa","aa"]
Output: -1
```

---

## 3. Approach

Sort the strings by length descending. For each string, check whether it is a subsequence of any other string. The first string that fails this check is the answer.

```text
FUNCTION findLUSlength(strs):
    FUNCTION isSubsequence(s, t):
        SET i ← 0
        FOR c IN t:
            IF i < LEN(s) AND s[i] == c:
                SET i ← i + 1
        RETURN i == LEN(s)

    SORT strs BY LENGTH DESCENDING
    FOR i FROM 0 TO LEN(strs)-1:
        SET candidate ← strs[i]
        SET isUnique ← TRUE
        FOR j FROM 0 TO LEN(strs)-1:
            IF i == j: CONTINUE
            IF isSubsequence(candidate, strs[j]):
                SET isUnique ← FALSE
                BREAK
        IF isUnique:
            RETURN LEN(candidate)
    RETURN -1
```

---

## 4. Walkthrough

Consider `strs = ["aba","cdc","eae"]`.
1. Sort → `["aba","cdc","eae"]` (already sorted by length).
2. Check "aba" against "cdc" and "eae": neither contains "aba" as a subsequence → unique → return length 3.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²·L) where *n* is number of strings and *L* is max length | O(1) |

---

## 6. Follow-Up Questions

* How would you improve the time complexity?
* Could a Trie be used to speed up the subsequence checks?
* What changes if the strings contain only lowercase letters?

---

## Key Takeaway

> Sort by length descending. For each string, check if it is a subsequence of any other. The first one that isn't a subsequence of any other string is the answer.
