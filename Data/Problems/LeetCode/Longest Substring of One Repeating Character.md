# 2213. Longest Substring of One Repeating Character

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-substring-of-one-repeating-character](https://leetcode.com/problems/longest-substring-of-one-repeating-character)
**Companies:** Pickrr

---

## 1. Problem Description

You are given a **0-indexed** string `s`. You are also given a **0-indexed** string `queryCharacters` of length `k` and a **0-indexed** array of integer **indices** `queryIndices` of length `k`, both of which are used to describe `k` queries.

The `i^th` query updates the character in `s` at index `queryIndices[i]` to the character `queryCharacters[i]`.

Return *an array* `lengths` *of length *`k`* where* `lengths[i]` *is the **length** of the **longest substring** of *`s`* consisting of **only one repeating** character **after** the* `i^th` *query** is performed.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.
- `k == queryCharacters.length == queryIndices.length`
- `1 <= k <= 10^5`
- `queryCharacters` consists of lowercase English letters.
- `0 <= queryIndices[i] < s.length`

---

## 2. Approach: Segment Tree with Merge — O(n + q log n) ✅

```text
// Each segment tree node stores:
//   leftChar, rightChar, leftLen, rightLen, maxLen, totalLen
// Merge: if left.rightChar == right.leftChar, combine the run
// Update: point update, then propagate merge info up
```

| Time | Space |
|------|-------|
| O(n + q · log n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
Output: [3,3,4]
Explanation: - 1^st query updates s = "bbbacc". The longest substring consisting of one repeating character is "bbb" with length 3.
- 2^nd query updates s = "bbbccc".
  The longest substring consisting of one repeating character can be "bbb" or "ccc" with length 3.
- 3^rd query updates s = "bbbbcc". The longest substring consisting of one repeating character is "bbbb" with length 4.
Thus, we return [3,3,4].
```

**Example 2:**
```
Input: s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
Output: [2,3]
Explanation: - 1^st query updates s = "abazz". The longest substring consisting of one repeating character is "zz" with length 2.
- 2^nd query updates s = "aaazz". The longest substring consisting of one repeating character is "aaa" with length 3.
Thus, we return [2,3].
```

---

## 4. Walkthrough

Consider the initial string "aaabbbbcc" and query (3, 'c'):
| Step | Operation | Segment Tree Node Updates | Longest Run |
|------|-----------|---------------------------|------------|
| 0 | Build tree from characters | leaves store each char and length 1 | 4 ("bbbb") |
| 1 | Update index 3 to 'c' | leaf at position 3 changes char, recompute ancestors | New longest run becomes 4 (still "bbbb") |
| 2 | Query result returned as root.maxLen = 4 |

---

## 5. Complexity Analysis

- Building the tree: O(n)
- Each point update: O(log n)
- Querying the answer after each update: O(1) (root stores maxLen)
- Overall for q updates: O(n + q·log n) time, O(n) space.

---

## 6. Follow-Up Questions

- How would you adapt the structure to support range updates (e.g., set a whole segment to a character)?
- Can you achieve similar performance using a balanced binary search tree or rope data structure?
- What changes are needed if queries ask for the longest substring with at most two distinct characters?

---

## 7. Key Takeaway

> Segment tree where each node tracks the longest run, plus prefix/suffix run info for merging across children. Point updates + pushup in O(log n).
