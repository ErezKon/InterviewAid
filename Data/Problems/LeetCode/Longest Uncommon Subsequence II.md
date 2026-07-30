# 522. Longest Uncommon Subsequence II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-uncommon-subsequence-ii](https://leetcode.com/problems/longest-uncommon-subsequence-ii)
**Companies:** Google

---

## 1. Problem Description

Find the longest string that is NOT a subsequence of any other string in the array. Return -1 if none exists.

---

## 2. Examples

**Example 1:**
```
Input: strs = ["aba","cdc","eae"]
Output: 3
Explanation: "aba" is not a subsequence of "cdc" or "eae", and its length is 3.
```

**Example 2:**
```
Input: strs = ["aaa","aaa","aa"]
Output: -1
Explanation: Every string is a subsequence of another string.
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
