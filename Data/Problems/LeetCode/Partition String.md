# 3597. Partition String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-string](https://leetcode.com/problems/partition-string)
**Companies:** Google

---

## Problem Description
Given a string `s`, partition it into **unique segments** according to the following procedure:

- Start building a segment beginning at index 0.
- Continue extending the current segment character by character until the current segment has not been seen before.
- Once the segment is unique, add it to your list of segments, mark it as seen, and begin a new segment from the next index.
- Repeat until you reach the end of `s`.

Return an array of strings `segments`, where `segments[i]` is the `i`-th segment created.

**Constraints:**

- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abbccccd"
  Output: ["a","b","bc","c","cc","d"]
  Explanation:
  Index | Segment After Adding | Seen Segments            | Seen Before? | New Segment | Updated Seen Segments
  0     | "a"                  | []                       | No           | ""          | ["a"]
  1     | "b"                  | ["a"]                    | No           | ""          | ["a", "b"]
  2     | "b"                  | ["a", "b"]               | Yes          | "b"         | ["a", "b"]
  3     | "bc"                 | ["a", "b"]               | No           | ""          | ["a", "b", "bc"]
  4     | "c"                  | ["a", "b", "bc"]         | No           | ""          | ["a", "b", "bc", "c"]
  5     | "c"                  | ["a", "b", "bc", "c"]    | Yes          | "c"         | ["a", "b", "bc", "c"]
  6     | "cc"                 | ["a", "b", "bc", "c"]    | No           | ""          | ["a", "b", "bc", "c", "cc"]
  7     | "d"                  | ["a", "b", "bc", "c", "cc"] | No        | ""          | ["a", "b", "bc", "c", "cc", "d"]
  Hence, the final output is ["a", "b", "bc", "c", "cc", "d"].
```

```
Example 2:
  Input: s = "aaaa"
  Output: ["a","aa"]
  Explanation:
  Index | Segment After Adding | Seen Segments | Seen Before? | New Segment | Updated Seen Segments
  0     | "a"                  | []            | No           | ""          | ["a"]
  1     | "a"                  | ["a"]         | Yes          | "a"         | ["a"]
  2     | "aa"                 | ["a"]         | No           | ""          | ["a", "aa"]
  3     | "a"                  | ["a", "aa"]   | Yes          | "a"         | ["a", "aa"]
  Hence, the final output is ["a", "aa"].
```

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
