# 3597. Partition String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-string](https://leetcode.com/problems/partition-string)
**Companies:** Google

---

## Problem Description
Given a string `s`, partition it into the fewest possible substrings such that each substring contains no repeating characters. Return the minimum number of substrings.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"abacaba"` | `4` | One optimal partition is `"a"`, `"ba"`, `"ca"`, `"ba"` – each part has unique characters. |
| `"ssssss"` | `6` | Every character repeats, so each character must be its own substring. |
| `"abcdef"` | `1` | All characters are unique, so the whole string is one substring.

## Approach
Use a sliding window to maintain a set of characters in the current substring. When a duplicate character is encountered, start a new substring and clear the set.

```text
FUNCTION partitionString(s):
    SET count ← 0
    SET charSet ← empty set

    FOR ch IN s:
        IF ch IN charSet:
            // duplicate found, start new substring
            INCREMENT count
            CLEAR charSet
        ENDIF
        ADD ch TO charSet
    ENDFOR

    // account for the last substring
    IF charSet IS NOT empty:
        INCREMENT count
    RETURN count
```

## Walkthrough
Consider `s = "abacaba"`.

| Index | ch | charSet before | Duplicate? | Action |
|-------|----|----------------|------------|--------|
| 0 | a | {} | No | add a → {a}
| 1 | b | {a} | No | add b → {a,b}
| 2 | a | {a,b} | Yes | count=1, clear, add a → {a}
| 3 | c | {a} | No | add c → {a,c}
| 4 | a | {a,c} | Yes | count=2, clear, add a → {a}
| 5 | b | {a} | No | add b → {a,b}
| 6 | a | {a,b} | Yes | count=3, clear, add a → {a}
| End | – | {a} | – | count=4 (final increment) |

Result: 4 substrings.

## Complexity Analysis
- **Time:** O(n) – each character processed once.
- **Space:** O(min(n, alphabet)) – the set holds at most the size of the character set (e.g., 26 for lowercase letters).

## Follow‑Up Questions
1. How would the solution change if the string could contain Unicode characters?
2. Can you modify the algorithm to also return the actual substrings, not just the count?
3. What if the constraint was to limit each substring to at most `k` distinct characters?

## Key Takeaway
A sliding‑window with a character set lets you greedily start a new substring whenever a duplicate appears, yielding the minimal partition count.
