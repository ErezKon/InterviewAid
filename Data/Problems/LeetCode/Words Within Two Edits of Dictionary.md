# 2452. Words Within Two Edits of Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/words-within-two-edits-of-dictionary](https://leetcode.com/problems/words-within-two-edits-of-dictionary)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

You are given two string arrays, `queries` and `dictionary`. All words in each array comprise of lowercase English letters and have the same length.

In one **edit** you can take a word from `queries`, and change any letter in it to any other letter. Find all words from `queries` that, after a **maximum** of two edits, equal some word from `dictionary`.

Return* a list of all words from *`queries`*, **that match with some word from *`dictionary`* after a maximum of **two edits***. Return the words in the **same order** they appear in `queries`.

**Constraints:**
- `1 <= queries.length, dictionary.length <= 100`
- `n == queries[i].length == dictionary[j].length`
- `1 <= n <= 100`
- All `queries[i]` and `dictionary[j]` are composed of lowercase English letters.

## Examples

**Example 1:**
```
Input: queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]
Output: ["word","note","wood"]
Explanation: - Changing the 'r' in "word" to 'o' allows it to equal the dictionary word "wood".
- Changing the 'n' to 'j' and the 't' to 'k' in "note" changes it to "joke".
- It would take more than 2 edits for "ants" to equal a dictionary word.
- "wood" can remain unchanged (0 edits) and match the corresponding dictionary word.
Thus, we return ["word","note","wood"].
```

**Example 2:**
```
Input: queries = ["yes"], dictionary = ["not"]
Output: []
Explanation: Applying any two edits to "yes" cannot make it equal to "not". Thus, we return an empty array.
```

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
