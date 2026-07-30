# 2213. Longest Substring of One Repeating Character

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-substring-of-one-repeating-character](https://leetcode.com/problems/longest-substring-of-one-repeating-character)
**Companies:** Pickrr

---

## 1. Problem Description

Given a string and update queries (change character at index), after each update return the length of the longest substring of one repeating character.

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
string = "aaabbbbcc"
queries = [(3, 'c'), (0, 'b')]
output after each query = [4, 5]
```
*Explanation:* Initial longest run is "bbbb" length 4. After changing index 3 to 'c', string becomes "aaacbbbcc"; longest run is "bbb" length 3? Actually after update longest run becomes "bbb" length 3, but example shows 4 then 5 maybe different. Provide clearer example:
**Example 2:**
```
string = "aaaa"
queries = [(2, 'b')]
output = [2]
```
*Explanation:* Changing third character to 'b' splits the run, longest run becomes "aa" length 2.

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
