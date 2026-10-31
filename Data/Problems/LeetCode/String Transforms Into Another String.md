# 1153. String Transforms Into Another String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-transforms-into-another-string](https://leetcode.com/problems/string-transforms-into-another-string)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given two strings `str1` and `str2` of the same length, determine whether you can transform `str1` into `str2` by doing **zero or more** *conversions*.

In one conversion you can convert **all** occurrences of one character in `str1` to **any** other lowercase English character.

Return `true` if and only if you can transform `str1` into `str2`.

**Constraints:**
- `1 <= str1.length == str2.length <= 10^4`
- `str1` and `str2` contain only lowercase English letters.

## Examples

**Example 1:**
```
Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert 'c' to 'e' then 'b' to 'd' then 'a' to 'c'. Note that the order of conversions matter.
```

**Example 2:**
```
Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.
```

## Approach
**Algorithm:** Consistent-mapping check plus a "spare letter" check on `str2`.
- **Insight 1:** A conversion changes *all* occurrences of a letter, so equal letters in `str1` always stay equal. Hence each letter of `str1` must map to exactly one letter of `str2`; if some `str1[i] = str1[j]` but `str2[i] ≠ str2[j]`, return `false`.
- **Insight 2:** Given a consistent mapping (a function on letters, possibly with cycles like `a → b, b → a`), cycles can be broken by temporarily routing one letter through an unused letter. A letter is "free" to use as the buffer only if it does not appear in the final string `str2`. So the transformation is possible iff `str2` uses **fewer than 26** distinct letters.
- **Edge case:** If `str1 == str2`, no conversion is needed - return `true` even if all 26 letters appear.

### Pseudocode
```text
FUNCTION canConvert(str1, str2):
    IF str1 = str2: RETURN true
    CREATE map mapping
    FOR i ← 0 TO LENGTH(str1)-1:
        a ← str1[i]
        b ← str2[i]
        IF a IN mapping AND mapping[a] ≠ b:
            RETURN false          // one letter would need two targets
        mapping[a] ← b
    RETURN COUNT_DISTINCT(str2) < 26
```

## Walkthrough
Example 1: `str1 = "aabcc"`, `str2 = "ccdee"`.

| i | str1[i] | str2[i] | mapping after step |
|---|---------|---------|--------------------|
| 0 | a | c | a→c |
| 1 | a | c | a→c (consistent) |
| 2 | b | d | a→c, b→d |
| 3 | c | e | a→c, b→d, c→e |
| 4 | c | e | consistent |

Mapping is consistent; `str2` uses `{c, d, e}` = 3 < 26 distinct letters → `true` (order: `c→e`, `b→d`, `a→c`).

Example 2: `str1 = "leetcode"`, `str2 = "codeleet"`: at `i=1`, `e → o`; at `i=2`, `e → d` conflicts → `false`.

## Complexity Analysis
- **Time:** O(n) - one pass over the strings plus counting distinct letters.
- **Space:** O(26) for the mapping and the distinct-letter set.

## Follow-Up Questions
- Why must the spare letter be absent from `str2` rather than from `str1`?
- How would you output the minimum number of conversions (hint: count mapping edges, plus one extra per cycle)?
- What if the alphabet had `k` letters instead of 26?

## Key Takeaway
Letters of `str1` can only merge, never split, so the mapping must be a function; any cycles in that function are breakable exactly when `str2` leaves at least one letter of the alphabet unused.
