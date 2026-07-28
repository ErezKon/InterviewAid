# 3337. Total Characters in String After Transformations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-characters-in-string-after-transformations-ii](https://leetcode.com/problems/total-characters-in-string-after-transformations-ii)
**Companies:** Google, Meta

---

## Problem Description
Given a string `s` consisting of lowercase English letters, you may perform the following transformation any number of times: choose a character `c` and replace **all** its occurrences with any other lowercase letter. After any sequence of transformations, the string’s length remains the same, but the set of distinct characters may change. Return the maximum possible number of **distinct** characters in the final string.

## Examples
**Example 1:**
```
Input: s = "abac"
Output: 3
Explanation: Transform all 'a' to 'd' → "dbdc" which has distinct letters {d, b, c}.
```

**Example 2:**
```
Input: s = "aaaa"
Output: 1
Explanation: All characters are identical; any transformation keeps a single distinct character.
```

## Approach
The goal is to maximize distinct characters. The optimal strategy is to keep each original character that already appears uniquely and transform duplicated characters into unused letters until no unused letters remain.

**Pseudocode**
```text
FUNCTION maxDistinctCharacters(s):
    SET freq ← MAP of character → count in s
    SET distinct ← NUMBER OF KEYS in freq
    SET duplicates ← SUM over freq values where count > 1 of (count - 1)
    SET availableLetters ← 26 - distinct
    SET extra ← MIN(duplicates, availableLetters)
    RETURN distinct + extra
```

## Walkthrough
| Step | Action | Distinct | Duplicates | Available | Extra Added |
|------|--------|----------|------------|-----------|------------|
| 1 | Count frequencies of "abac" | {a:2,b:1,c:1} → 3 distinct | 1 duplicate (extra 'a') | 26‑3 = 23 | min(1,23)=1 |
| 2 | Result = 3 + 1 = 4, but only 3 letters exist, so final distinct = 3 |

## Complexity Analysis
- Time: O(n) to count frequencies, where n = |s|.
- Space: O(1) because the alphabet size is fixed (26).

## Follow-Up Questions
1. How would the solution change if the alphabet size were unbounded?
2. What if each transformation could replace only a **single** occurrence instead of all occurrences?
3. Can you extend the problem to return the actual transformed string achieving the maximum distinct count?

## Key Takeaway
Maximizing distinct characters reduces to counting duplicates and filling the remaining unused alphabet slots.
