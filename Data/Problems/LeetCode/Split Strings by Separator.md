# 2788. Split Strings by Separator

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Apple, Coupang
---

## Problem Description
Given an array of strings `words` and a character `separator`, split each string in `words` by the separator and return a flat list of all non‑empty substrings. The order of substrings should follow the original order of words and the order within each word.

## Examples
**Example 1:**
```
words = ["one,two", "three"], separator = ','
output = ["one", "two", "three"]
```
**Example 2:**
```
words = ["a|b|c", "|d|"], separator = '|'
output = ["a", "b", "c", "d"]
```

## Approach
Iterate through each word, split it using the separator, and collect each non‑empty part into the result list.

```text
FUNCTION SplitStringsBySeparator(words, separator):
    SET result ← []
    FOR each word IN words:
        SET parts ← SPLIT(word, separator)
        FOR each part IN parts:
            IF part ≠ "":
                APPEND part TO result
    RETURN result
```

## Walkthrough
| Step | word | parts after split | result after processing |
|------|------|-------------------|--------------------------|
| 1 | "one,two" | ["one", "two"] | ["one", "two"] |
| 2 | "three" | ["three"] | ["one", "two", "three"] |

## Complexity Analysis
*Time:* O(N + L) where N is the total number of characters across all words and L is the total number of produced substrings.
*Space:* O(L) for the output list.

## Follow-Up Questions
1. How would you handle multiple different separators in one call?
2. Can you perform the operation in‑place if the input list can be modified?
3. How would you adapt the solution for very large inputs that do not fit in memory?

## Key Takeaway
A straightforward linear scan combined with string splitting yields an optimal O(N) solution for extracting non‑empty substrings.
