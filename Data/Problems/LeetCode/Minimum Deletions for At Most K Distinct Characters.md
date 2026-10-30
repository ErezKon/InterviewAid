# 3545. Minimum Deletions for At Most K Distinct Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-deletions-for-at-most-k-distinct-characters](https://leetcode.com/problems/minimum-deletions-for-at-most-k-distinct-characters)
**Companies:** Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(n)](#approach-greedy--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` consisting of lowercase English letters, and an integer `k`.

Your task is to delete some (possibly none) of the characters in the string so that the number of **distinct** characters in the resulting string is **at most** `k`.

Return the **minimum** number of deletions required to achieve this.

**Constraints:**
- `1 ≤ s.length ≤ 16`
- `1 ≤ k ≤ 16`
- `s` consists only of lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "abc", k = 2
  Output: 1
  Explanation:
  - s has three distinct characters: 'a', 'b' and 'c', each with a frequency of 1.
  - Since we can have at most k = 2 distinct characters, remove all occurrences of any one character from the string.
  - For example, removing all occurrences of 'c' results in at most k distinct characters. Thus, the answer is 1.
```

```
Example 2:
  Input: s = "aabb", k = 2
  Output: 0
  Explanation:
  - s has two distinct characters ('a' and 'b') with frequencies of 2 and 2, respectively.
  - Since we can have at most k = 2 distinct characters, no deletions are required. Thus, the answer is 0.
```

```
Example 3:
  Input: s = "yyyzz", k = 1
  Output: 2
  Explanation:
  - s has two distinct characters ('y' and 'z') with frequencies of 3 and 2, respectively.
  - Since we can have at most k = 1 distinct character, remove all occurrences of any one character from the string.
  - Removing all 'z' results in at most k distinct characters. Thus, the answer is 2.
```

---

## Key Insight

> Count frequencies of each character. If there are more than `k` distinct characters, delete all occurrences of the **least frequent** characters until only `k` distinct remain.

---

## Approach: Greedy — O(n) ✅

```
FUNCTION minDeletions(s, k):
    freq ← frequency count of each character in s
    IF number of distinct chars ≤ k: RETURN 0

    SORT freq values ascending
    deletions ← 0
    WHILE number of distinct chars > k:
        deletions ← deletions + smallest frequency
        Remove that character
    RETURN deletions
```

---

## Walkthrough

```
s = "aabbc", k = 1
freq: a=2, b=2, c=1 → 3 distinct, need ≤ 1
```

| Step | Remove | Freq | Deletions |
|------|--------|------|-----------|
| 1 | c (freq 1) | a=2, b=2 | 1 |
| 2 | b (freq 2) | a=2 | 3 |

**Result:** 3 deletions → "aa" ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — count frequencies, sort 26 values |
| **Space** | O(1) — 26-char frequency array |

---

## Follow-Up Questions

1. **Why remove least frequent first?** Removing a character with frequency `f` costs `f` deletions. Minimizing total cost means removing the cheapest characters first.
2. **What if k ≥ 26?** Answer is always 0 since there are at most 26 distinct lowercase letters.
3. **What if we could only delete from specific positions?** Then it becomes a more complex sliding window / DP problem.

---

## Key Takeaway

> To minimize deletions for a distinct-character constraint, **greedily remove the least frequent characters** first — this is optimal by a simple exchange argument.
