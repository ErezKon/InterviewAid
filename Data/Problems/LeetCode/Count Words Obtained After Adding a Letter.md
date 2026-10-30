# 2135. Count Words Obtained After Adding a Letter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-words-obtained-after-adding-a-letter](https://leetcode.com/problems/count-words-obtained-after-adding-a-letter)
**Companies:** Google

---

## Problem Description

You are given two **0-indexed** arrays of strings `startWords` and `targetWords`. Each string consists of **lowercase English letters** only.

For each string in `targetWords`, check if it is possible to choose a string from `startWords` and perform a **conversion operation** on it to be equal to that from `targetWords`.

The **conversion operation** is described in the following two steps:

1. **Append** any lowercase letter that is **not present** in the string to its end.
   - For example, if the string is `"abc"`, the letters `'d'`, `'e'`, or `'y'` can be added to it, but not `'a'`. If `'d'` is added, the resulting string will be `"abcd"`.
2. **Rearrange** the letters of the new string in **any** arbitrary order.
   - For example, `"abcd"` can be rearranged to `"acbd"`, `"bacd"`, `"cbda"`, and so on. Note that it can also be rearranged to `"abcd"` itself.

Return *the **number of strings** in* `targetWords` *that can be obtained by performing the operations on **any** string of* `startWords`.

**Note** that you will only be verifying if the string in `targetWords` can be obtained from a string in `startWords` by performing the operations. The strings in `startWords` **do not** actually change during this process.

**Constraints:**
- `1 <= startWords.length, targetWords.length <= 5 * 10^4`
- `1 <= startWords[i].length, targetWords[j].length <= 26`
- Each string of `startWords` and `targetWords` consists of lowercase English letters only.
- No letter occurs more than once in any string of `startWords` or `targetWords`.

---

## Examples

```
Example 1:
  Input: startWords = ["ant","act","tack"], targetWords = ["tack","act","acti"]
  Output: 2
  Explanation:
  - In order to form targetWords[0] = "tack", we use startWords[1] = "act", append 'k' to it, and rearrange "actk" to "tack".
  - There is no string in startWords that can be used to obtain targetWords[1] = "act".
    Note that "act" does exist in startWords, but we must append one letter to the string before rearranging it.
  - In order to form targetWords[2] = "acti", we use startWords[1] = "act", append 'i' to it, and rearrange "acti" to "acti" itself.
```

```
Example 2:
  Input: startWords = ["ab","a"], targetWords = ["abc","abcd"]
  Output: 1
  Explanation:
  - In order to form targetWords[0] = "abc", we use startWords[0] = "ab", add 'c' to it, and rearrange it to "abc".
  - There is no string in startWords that can be used to obtain targetWords[1] = "abcd".
```

---

## Key Insight

Since order doesn't matter, represent each word as a **bitmask** of 26 bits. A target is achievable if removing any one of its set bits yields a mask present in the start set.

---

## Approach

```text
FUNCTION wordCount(startWords, targetWords):
    startSet ← SET()
    FOR w IN startWords:
        startSet.ADD(bitmask(w))

    count ← 0
    FOR w IN targetWords:
        mask ← bitmask(w)
        FOR each set bit b IN mask:
            IF (mask XOR (1 LEFT_SHIFT b)) IN startSet:
                count ← count + 1
                BREAK
    RETURN count
```

---

## Walkthrough

**Using Example 1**
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Build `startSet` | Convert "ant", "act", "tack" to bitmasks and store in a set. |
| 2 | Process target "tack" | Its mask has bits for {a,c,k,t}. Remove each bit:
- Remove 'a' → mask for {c,k,t} not in set
- Remove 'c' → {a,k,t} not in set
- Remove 'k' → {a,c,t} matches mask of "act" → count++ |
| 3 | Process target "act" | Removing any bit never matches a start mask (needs addition), so skip. |
| 4 | Process target "acti" | Mask {a,c,i,t}. Removing 'i' yields {a,c,t} which matches "act" → count++ |
| 5 | Final count | 2 targets are reachable. |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O((n + m) × 26) |
| **Space** | O(n) for start set |

---

## Follow-Up Questions

- How would you modify the solution if you could add **multiple** letters?
- Can this approach be extended to handle deletions instead of additions?
- What if the alphabet size is larger than 26 (e.g., Unicode characters)?

---

## Key Takeaway

> **Bitmask representation for character sets ignores order. To check "add one letter and rearrange", try removing each bit from the target mask and look up in the start set.**