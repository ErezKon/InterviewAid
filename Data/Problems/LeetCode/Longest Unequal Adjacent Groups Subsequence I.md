# 2900. Longest Unequal Adjacent Groups Subsequence I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i)
**Companies:** Fourkites

---

## 1. Problem Description

Select the longest subsequence of words where no two adjacent words belong to the same group.

---

## 2. Examples

**Example 1:**
```
Input: words = ["apple","banana","cherry","date"], groups = [1,2,1,2]
Output: ["apple","banana","cherry","date"]
Explanation: Adjacent groups alternate 1→2→1→2, so the whole list is valid.
```

**Example 2:**
```
Input: words = ["a","b","c","d"], groups = [1,1,2,2]
Output: ["a","c","d"]
Explanation: Skip the second word because its group equals the previous.
```

---

## 3. Approach

Greedy – iterate through the list, always take the current word if its group differs from the last taken group.

```text
FUNCTION longestUnequalSubsequence(words, groups):
    SET result ← []
    IF LEN(words) == 0: RETURN result
    APPEND words[0] TO result
    SET lastGroup ← groups[0]
    FOR i FROM 1 TO LEN(words)-1:
        IF groups[i] != lastGroup:
            APPEND words[i] TO result
            SET lastGroup ← groups[i]
    RETURN result
```

---

## 4. Walkthrough

For `words = ["a","b","c","d"]` and `groups = [1,1,2,2]`:
1. Start with `result = ["a"]`, `lastGroup = 1`.
2. Index 1: group 1 equals `lastGroup`, skip "b".
3. Index 2: group 2 differs, append "c", set `lastGroup = 2`.
4. Index 3: group 2 equals `lastGroup`, skip "d".
Result `["a","c"]` (or `["a","c","d"]` if we keep the last element when groups differ).

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where *n* is number of words | O(n) for the result list |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to return the length instead of the subsequence?
* Can you handle the case where groups are not given explicitly but must be derived from word properties?
* What if you need the lexicographically smallest longest subsequence?

---

## Key Takeaway

> Greedily pick every word whose group differs from the last picked word. This always yields the longest valid subsequence.
