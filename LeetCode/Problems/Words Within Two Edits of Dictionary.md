# 2452. Words Within Two Edits of Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/words-within-two-edits-of-dictionary](https://leetcode.com/problems/words-within-two-edits-of-dictionary)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given an array `queries` of strings and a `dictionary` of valid words (all strings have the same length), return an array where each element is the first dictionary word that differs from the corresponding query by at most two characters. If no such word exists, keep the query unchanged.

## Examples
**Example 1:**
Input: `queries = ["hello","world"], dictionary = ["hhllo","world","wrrld"]`
Output: `["hhllo","world"]`
Explanation: "hello" differs from "hhllo" by one character; "world" matches exactly.

**Example 2:**
Input: `queries = ["abcd"], dictionary = ["abcf","abef","abdd"]`
Output: `["abcf"]`
Explanation: "abcf" differs by one character, which is ≤2, and is the first such match.

## Approach
Iterate each query and compare it with dictionary words, counting mismatched positions. Stop at the first word with ≤2 mismatches.

```text
FUNCTION twoEditWords(queries, dictionary):
    result ← []
    FOR q IN queries:
        found ← FALSE
        FOR d IN dictionary:
            mismatches ← 0
            FOR i FROM 0 TO LENGTH(q)-1:
                IF q[i] ≠ d[i]:
                    mismatches ← mismatches + 1
                IF mismatches > 2:
                    BREAK
            IF mismatches ≤ 2:
                result.ADD(q)
                found ← TRUE
                BREAK
        IF NOT found:
            result.ADD(q)
    RETURN result
```

## Walkthrough
| Query | Dictionary checked | Mismatches | Result |
|-------|-------------------|------------|--------|
| "hello" | "hhllo" → 1 | ≤2 → select "hhllo" |
| "world" | "world" → 0 | ≤2 → select "world" |

## Complexity Analysis
Time: O(Q·D·L) where Q = #queries, D = #dictionary words, L = word length.
Space: O(1) extra aside from output list.

## Follow-Up Questions
1. How would you improve performance using a pre‑computed index of word patterns?
2. Can you extend the solution to allow up to *k* edits for arbitrary *k*?
3. What changes are needed if dictionary words have varying lengths?

## Key Takeaway
A simple double loop with early termination on mismatches efficiently finds the nearest dictionary word within two edits.
