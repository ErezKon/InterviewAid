# 2273. Find Resultant Array After Removing Anagrams

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-resultant-array-after-removing-anagrams](https://leetcode.com/problems/find-resultant-array-after-removing-anagrams)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nextjump

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Stack / Greedy Compare — O(n·k) ✅](#4-approach-stack--greedy-compare--onk-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a 0-indexed string array `words`, repeatedly perform: if `words[i]` is an anagram of `words[i-1]`, delete `words[i]` (shifting left). Repeat until no more deletions can be made. Return the final array.

**Constraints:**
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  words = ["abba","baba","bbaa","cd","cd"]
  Output: ["abba","cd"]
  Reason: "baba" is anagram of "abba" → remove. "bbaa" is anagram of "abba" → remove.
          "cd" is anagram of "cd" → remove second one.

Example 2:
  Input:  words = ["a","b","c","d","e"]
  Output: ["a","b","c","d","e"]
  Reason: No consecutive anagrams.
```

---

## 3. Key Insight

> Instead of simulating repeated deletions, build the result greedily: only add `words[i]` if it is **not** an anagram of the **last word added** to the result. Two words are anagrams iff their sorted characters are equal.

---

## 4. Approach: Stack / Greedy Compare — O(n·k) ✅

```
FUNCTION removeAnagrams(words):
    result = [words[0]]
    FOR i ← 1 TO len(words) - 1:
        IF SORTED(words[i]) != SORTED(result[-1]):
            result.ADD(words[i])
    RETURN result
```

---

## 5. Walkthrough

```
words = ["abba", "baba", "bbaa", "cd", "cd"]

result = ["abba"]

i=1: sorted("baba")="aabb" == sorted("abba")="aabb" → skip
i=2: sorted("bbaa")="aabb" == sorted("abba")="aabb" → skip
i=3: sorted("cd")="cd" != "aabb" → add → result = ["abba", "cd"]
i=4: sorted("cd")="cd" == sorted("cd")="cd" → skip

Final: ["abba", "cd"] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k log k) — n words, each sorted in O(k log k) where k = max word length |
| **Space** | O(n) — result array |

---

## 7. Follow-Up Questions

### 7.1 Can you avoid sorting each word?

Yes — use a character frequency count (26-element array or Counter) instead of sorting. This makes comparison O(k) instead of O(k log k).

### 7.2 Why compare against the last result element, not the previous input element?

After deletions, the "previous" word in the final array is the last kept word, not the original predecessor. Comparing against `result[-1]` correctly simulates all cascading deletions.

### 7.3 What if we need to remove anagrams that are not adjacent?

That's a different problem — you'd need to group all anagrams (like "Group Anagrams" LC 49) and keep only one representative per group.

---

## 8. Key Takeaway

> **Greedy filtering against the last kept element** avoids simulating repeated deletion passes. The sorted-string (or frequency-count) comparison is the standard anagram check.
