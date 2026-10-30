# 1858. Longest Word With All Prefixes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-with-all-prefixes](https://leetcode.com/problems/longest-word-with-all-prefixes)
**Companies:** Google

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array of strings `words`, find the **longest** string in `words` such that **every prefix** of it is also in `words`.

- For example, let `words = ["a", "app", "ap"]`. The string `"app"` has prefixes `"ap"` and `"a"`, all of which are in `words`.

Return *the string described above. If there is more than one string with the same length, return the **lexicographically smallest** one, and if no string exists, return *`""`.

**Constraints:**
- `1 <= words.length <= 10^5`
- `1 <= words[i].length <= 10^5`
- `1 <= sum(words[i].length) <= 10^5`
- `words[i]` consists only of lowercase English letters.

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
Input: words = ["k","ki","kir","kira", "kiran"]
Output: "kiran"
Explanation: "kiran" has prefixes "kira", "kir", "ki", and "k", and all of them appear in words.
```

**Example 2:**
```
Input: words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
Output: "apple"
Explanation: Both "apple" and "apply" have all their prefixes in words.
However, "apple" is lexicographically smaller, so we return that.
```

**Example 3:**
```
Input: words = ["abc", "bc", "ab", "qwe"]
Output: ""
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
