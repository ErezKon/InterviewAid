# 1858. Longest Word With All Prefixes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-with-all-prefixes](https://leetcode.com/problems/longest-word-with-all-prefixes)
**Companies:** Google

---

## 1. Problem Description

Find the longest word where every prefix is also in the dictionary. Return lexicographically smallest if tie.

---

## 2. Approach: Trie + DFS — O(n·L) ✅

```text
// Build a trie from all words, marking end-of-word nodes.
// Perform DFS from the root, only following children that are end‑of‑word.
// Track the longest (and lexicographically smallest) word encountered.
```

| Time | Space |
|------|-------|
| O(n · L) | O(n · L) |

---

## 3. Examples

**Example 1:**
```
words = ["w","wo","wor","worl","world"]
output = "world"
Explanation: All prefixes of "world" (w, wo, wor, worl) exist in the list.
```

**Example 2:**
```
words = ["a","banana","app","appl","ap","apply","apple"]
output = "apple"
Explanation: Both "apple" and "apply" have all prefixes, but "apple" is lexicographically smaller.
```

---

## 4. Walkthrough

| Step | Word Inserted | Trie Nodes Added | Valid Prefix Path |
|------|---------------|------------------|-------------------|
| 1 | "w" | w (end) | w ✅ |
| 2 | "wo" | o (end) under w | w → wo ✅ |
| 3 | "wor" | r (end) under wo | w → wo → wor ✅ |
| 4 | "worl" | l (end) under wor | w → wo → wor → worl ✅ |
| 5 | "world" | d (end) under worl | w → wo → wor → worl → world ✅ (longest) |

The DFS explores this path and records "world" as the answer.

---

## 5. Complexity Analysis

- **Time:** Building the trie and DFS each visit every character of every word once → O(n·L).
- **Space:** Trie stores each character node → O(n·L).

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return *all* longest words instead of just one?
2. Can you solve the problem without a trie, using sorting and a hash set?
3. What changes are needed if the dictionary is streamed and cannot be stored entirely in memory?

---

## Key Takeaway

Use a trie to enforce the prefix condition and perform a depth‑first search that only follows nodes marked as complete words; this yields the longest word with all prefixes in linear time.
