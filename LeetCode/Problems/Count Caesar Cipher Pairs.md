# 3805. Count Caesar Cipher Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-caesar-cipher-pairs](https://leetcode.com/problems/count-caesar-cipher-pairs)
**Companies:** Google

---

## 1. Problem Description

Given an array of strings, count pairs `(i, j)` where one string can be transformed into the other via a Caesar cipher shift (uniform character rotation by some amount).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `["abc","bcd","ace"]` | `1` | "abc" → shift by 1 → "bcd" forms one valid pair. |
| `["xyz","abc","def"]` | `3` | All three strings are cyclic shifts of each other, forming three pairs. |

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
