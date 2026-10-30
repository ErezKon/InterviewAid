# 2900. Longest Unequal Adjacent Groups Subsequence I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i)
**Companies:** Fourkites

---

## 1. Problem Description

You are given a string array `words` and a **binary** array `groups` both of length `n`.

A subsequence of `words` is **alternating** if for any two *consecutive* strings in the sequence, their corresponding elements at the *same* indices in `groups` are **different** (that is, there *cannot* be consecutive 0 or 1).

Your task is to select the **longest alternating** subsequence from `words`.

Return *the selected subsequence. If there are multiple answers, return **any** of them.*

**Note:** The elements in `words` are distinct.

**Constraints:**
- `1 <= n == words.length == groups.length <= 100`
- `1 <= words[i].length <= 10`
- `groups[i]` is either `0` or `1.`
- `words` consists of **distinct** strings.
- `words[i]` consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: words = ["e","a","b"], groups = [0,0,1]
Output: ["e","b"]
Explanation: A subsequence that can be selected is ["e","b"] because groups[0] != groups[2]. Another subsequence that can be selected is ["a","b"] because groups[1] != groups[2]. It can be demonstrated that the length of the longest subsequence of indices that satisfies the condition is 2.
```

**Example 2:**
```
Input: words = ["a","b","c","d"], groups = [1,0,1,1]
Output: ["a","b","c"]
Explanation: A subsequence that can be selected is ["a","b","c"] because groups[0] != groups[1] and groups[1] != groups[2]. Another subsequence that can be selected is ["a","b","d"] because groups[0] != groups[1] and groups[1] != groups[3]. It can be shown that the length of the longest subsequence of indices that satisfies the condition is 3.
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
