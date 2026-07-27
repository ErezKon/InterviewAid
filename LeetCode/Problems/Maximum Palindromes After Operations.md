# 3035. Maximum Palindromes After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-palindromes-after-operations](https://leetcode.com/problems/maximum-palindromes-after-operations)
**Companies:** Bloomberg, Expedia, Grammarly, Mathworks, Microsoft, Salesforce, Squarepoint Capital, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of `words`, you can swap any characters between words freely. Return the **maximum number of words** that can be made into palindromes.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 100`

---

## Examples

**Example 1:**
```
Input:  words = ["abbb","ba","aa"]
Output: 3
Explanation: Rearrange chars → all three can become palindromes.
```

---

## Key Insight

> Characters are **freely redistributable** across words. A palindrome of length `L` needs `L/2` character pairs (plus optionally 1 odd center if L is odd). Count total pairs across all words, then greedily fill shortest words first (they need fewer pairs).

---

## Approach: Greedy — O(n log n) ✅

```
FUNCTION maxPalindromesAfterOperations(words)
    totalCount ← Counter of all characters across all words
    pairs ← SUM(count / 2 for each count in totalCount.values())

    lengths ← SORT([len(w) for w in words])

    count ← 0
    FOR each length IN lengths DO
        pairsNeeded ← length / 2
        IF pairs ≥ pairsNeeded THEN
            pairs ← pairs - pairsNeeded
            count ← count + 1
        ELSE
            BREAK

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
words = ["abbb", "ba", "aa"]
All chars: a:4, b:4 → pairs = 4
lengths sorted: [2, 2, 4]
```

| Word len | Pairs needed | Pairs left | Count |
|----------|-------------|------------|-------|
| 2        | 1           | 3          | 1     |
| 2        | 1           | 2          | 2     |
| 4        | 2           | 0          | **3** |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n × m + n log n)** — count chars + sort lengths |
| Space  | **O(26)** — character counter |

---

## Follow-Up Questions

1. **Why fill shortest words first?**
   Shorter words need fewer pairs, so we can satisfy more words with our limited pair budget.

2. **Do odd-length words need a single char for the center?**
   Yes, but singles are always available (leftover from pairs), so we only need to budget pairs.

---

## Key Takeaway

> **Pool all character pairs + greedy shortest-first** — since characters are freely swappable, count total pairs and allocate them to words by ascending length.
