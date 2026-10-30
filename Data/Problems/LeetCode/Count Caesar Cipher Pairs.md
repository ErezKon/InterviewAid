# 3805. Count Caesar Cipher Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-caesar-cipher-pairs](https://leetcode.com/problems/count-caesar-cipher-pairs)
**Companies:** Google

---

## 1. Problem Description

You are given an array `words` of `n` strings. Each string has length `m` and contains only lowercase English letters.

Two strings `s` and `t` are **similar** if we can apply the following operation any number of times (possibly zero times) so that `s` and `t` become **equal**.

- Choose either `s` or `t`.
- Replace **every** letter in the chosen string with the next letter in the alphabet cyclically. The next letter after `'z'` is `'a'`.

Count the number of pairs of indices `(i, j)` such that:

- `i < j`
- `words[i]` and `words[j]` are **similar**.

Return an integer denoting the number of such pairs.

**Constraints:**
- `1 <= n == words.length <= 10^5`
- `1 <= m == words[i].length <= 10^5`
- `1 <= n * m <= 10^5`
- `words[i]` consists only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: words = ["fusion","layout"]
  Output: 1
  Explanation: words[0] = "fusion" and words[1] = "layout" are similar because we can apply the
  operation to "fusion" 6 times. The string "fusion" changes as follows.
  "fusion" -> "gvtjpo" -> "hwukqp" -> "ixvlrq" -> "jywmsr" -> "kzxnts" -> "layout"
```

```
Example 2:
  Input: words = ["ab","aa","za","aa"]
  Output: 2
  Explanation: words[0] = "ab" and words[2] = "za" are similar. words[1] = "aa" and words[3] = "aa" are similar.
```

---

## 3. Approach

**Algorithm:** Canonical Form Grouping

> Compute a difference signature for each word (differences between consecutive characters modulo 26). Words with identical signatures belong to the same group; each group of size *c* contributes `c·(c‑1)/2` pairs.

```text
FUNCTION countCaesarPairs(words):
    FUNCTION signature(word):
        diffs ← []
        FOR i ← 1 TO len(word)-1:
            SET diff ← (ord(word[i]) - ord(word[i-1])) % 26
            APPEND diff TO diffs
        RETURN (len(word), tuple(diffs))
    
    groups ← Counter()
    FOR w IN words:
        SET sig ← signature(w)
        groups[sig] += 1
    
    SET total ← 0
    FOR _, cnt IN groups.items():
        SET total ← total + cnt * (cnt - 1) / 2
    RETURN total
```

---

## 4. Walkthrough

Consider `words = ["abc", "bcd", "ace"]`.

| Word | Signature (len, diffs) |
|------|------------------------|
| abc  | (3, [1,1]) |
| bcd  | (3, [1,1]) |
| ace  | (3, [2,2]) |

The first two share the same signature, forming one pair. The third is in a different group, so no additional pairs.

---

## 5. Complexity Analysis

- **Time:** `O(n × L)` where *n* is number of words and *L* average word length.
- **Space:** `O(n × L)` for storing signatures and group counts.

---

## 6. Follow-Up Questions

1. How would you handle Unicode characters beyond the English alphabet?
2. Can you extend the solution to support variable shift amounts per character?
3. What if the input size is massive and cannot fit in memory?

---

## Key Takeaway

> Caesar cipher preserves relative character differences. Normalizing strings by their difference sequence enables grouping and counting pairs in linear time.
