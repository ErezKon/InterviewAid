# 3527. Find the Most Common Response

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-most-common-response](https://leetcode.com/problems/find-the-most-common-response)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: HashMap Counting — O(n · m) ✅](#3-approach-hashmap-counting--on--m-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a 2D string array `responses` where each `responses[i]` is an array of strings representing survey responses from the `i^th` day.

Return the **most common** response across all days after removing **duplicate** responses within each `responses[i]`. If there is a tie, return the *lexicographically smallest* response.

**Constraints:**
- `1 <= responses.length <= 1000`
- `1 <= responses[i].length <= 1000`
- `1 <= responses[i][j].length <= 10`
- `responses[i][j]` consists of only lowercase English letters

---

## 2. Examples

**Example 1:**
```
Input: responses = [["good","ok","good","ok"],["ok","bad","good","ok","ok"],["good"],["bad"]]
Output: "good"
Explanation: - After removing duplicates within each list, responses = [["good", "ok"], ["ok", "bad", "good"], ["good"], ["bad"]].
- "good" appears 3 times, "ok" appears 2 times, and "bad" appears 2 times.
- Return "good" because it has the highest frequency.
```

**Example 2:**
```
Input: responses = [["good","ok","good"],["ok","bad"],["bad","notsure"],["great","good"]]
Output: "bad"
Explanation: - After removing duplicates within each list we have responses = [["good", "ok"], ["ok", "bad"], ["bad", "notsure"], ["great", "good"]].
- "bad", "good", and "ok" each occur 2 times.
- The output is "bad" because it is the lexicographically smallest amongst the words with the highest frequency.
```

---

## 3. Approach: HashMap Counting — O(n · m) ✅

```text
FUNCTION mostCommonResponse(responses):
    count ← HashMap()
    FOR list IN responses DO
        seen ← SET(list)    // deduplicate within each list
        FOR word IN seen DO
            count[word] ← count.get(word, 0) + 1

    best ← ""
    bestCount ← -1
    FOR word, cnt IN count DO
        IF cnt > bestCount OR (cnt == bestCount AND word < best) THEN
            best ← word
            bestCount ← cnt
    RETURN best
```

---

## 4. Walkthrough

1. **First list** `["a","b"]` → `seen = {a,b}` → counts: a=1, b=1.
2. **Second list** `["b","c"]` → `seen = {b,c}` → update: b=2, c=1.
3. **Third list** `["b","d"]` → `seen = {b,d}` → update: b=3, d=1.
4. Scan `count`: maximum count is `b` with 3 occurrences → return `b`.

---

## 5. Complexity Analysis

- **Time**: O(N·M) where N is number of lists and M is average list length (deduplication + counting).
- **Space**: O(U) for the hashmap storing each unique response.

---

## 6. Follow-Up Questions

- How would you modify the solution if a response could appear multiple times within the same list and each occurrence should be counted?
- Can you solve the problem in a single pass without using an explicit set for deduplication?
- How would you adapt the algorithm for streaming input where lists arrive one by one?

---

## 7. Key Takeaway

> Deduplicate per‑list responses, count globally with a hashmap, and select the highest frequency (lexicographically smallest on ties).
