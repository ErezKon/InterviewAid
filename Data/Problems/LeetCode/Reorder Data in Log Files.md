# 937. Reorder Data in Log Files

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reorder-data-in-log-files](https://leetcode.com/problems/reorder-data-in-log-files)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You are given an array of `logs`. Each log is a space-delimited string of words, where the first word is the **identifier**.

There are two types of logs:

- **Letter-logs**: All words (except the identifier) consist of lowercase English letters.
- **Digit-logs**: All words (except the identifier) consist of digits.

Reorder these logs so that:

- The **letter-logs** come before all **digit-logs**.
- The **letter-logs** are sorted lexicographically by their contents. If their contents are the same, then sort them **lexicographically** by their identifiers.
- The **digit-logs** maintain their relative ordering.

Return the **final** order of the logs.

**Constraints:**
- `1 <= logs.length <= 100`
- `3 <= logs[i].length <= 100`
- All the tokens of `logs[i]` are separated by a **single** space.
- `logs[i]` is guaranteed to have an identifier and at least one word after the identifier.

## Examples

**Example 1:**
```
Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
Explanation: The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".
The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".
```

**Example 2:**
```
Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
```

## Approach
Separate logs into two lists based on the first character after the identifier. Sort the letter‑log list using a composite key of content then identifier. Finally concatenate the sorted letter‑logs with the original‑order digit‑logs.

```text
FUNCTION reorderLogFiles(logs):
    SET letters ← []
    SET digits ← []
    FOR log IN logs:
        SPLIT log INTO identifier AND rest AT FIRST SPACE
        IF rest[0] IS ALPHABETIC:
            APPEND (identifier, rest) TO letters
        ELSE:
            APPEND log TO digits
    SORT letters BY (rest, identifier)
    SET orderedLetters ← [identifier + " " + rest FOR (identifier, rest) IN letters]
    RETURN orderedLetters + digits
```

## Walkthrough
| Log | Type | Action |
|-----|------|--------|
| "dig1 8 1 5 1" | digit | added to digits |
| "let1 art can" | letter | stored as ("let1","art can") |
| "dig2 3 6" | digit | added to digits |
| "let2 own kit dig" | letter | stored as ("let2","own kit dig") |
| "let3 art zero" | letter | stored as ("let3","art zero") |
After sorting letters by content then identifier we get: "let1 art can", "let3 art zero", "let2 own kit dig". Concatenate with digits preserves their order.

## Complexity Analysis
- Time: O(n log n) for sorting the *m* letter‑logs (where *m ≤ n*).
- Space: O(n) to store the two separate lists.

## Follow-Up Questions
1. How would you modify the algorithm to sort digit‑logs numerically instead of keeping original order?
2. Can you achieve the same ordering in‑place without extra lists?
3. How would you handle logs where the content may contain a mix of letters and digits?

## Key Takeaway
Separating logs by type and sorting only the letter‑logs by content (with identifier as a tie‑breaker) yields the required order while preserving digit‑log stability.