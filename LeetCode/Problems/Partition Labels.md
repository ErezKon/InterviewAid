# 763. Partition Labels

**Difficulty:** 🟡 Medium
**Acceptance:** 80.0%
**LeetCode:** [https://leetcode.com/problems/partition-labels](https://leetcode.com/problems/partition-labels)
**Companies:** Amazon, Barclays, Bloomberg, Google, Ibm, Inmobi, Linkedin, Meta, Microsoft

---

## 1. Problem Description

Partition string `s` into as many parts as possible so each letter appears in at most one part. Return partition sizes.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"ababcbacadefegdehijhklij"` | `[9,7,8]` | The partitions are `"ababcbaca"`, `"defegde"`, and `"hijhklij"`. |
| `"eccbbbbdec"` | `[10]` | All characters appear within the whole string, so only one partition. |

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION partitionLabels(s):
    // Record last occurrence of each character
    lastIndex ← {}
    FOR i ← 0 TO LENGTH(s) - 1:
        SET lastIndex[s[i]] ← i

    result ← []
    start ← 0
    end ← 0

    FOR i ← 0 TO LENGTH(s) - 1:
        end ← MAX(end, lastIndex[s[i]])
        IF i == end:
            result.ADD(end - start + 1)
            start ← i + 1

    RETURN result
```

## 4. Walkthrough

Consider `"ababcbacadefegdehijhklij"`.

| Index | Char | Last Index of Char | Current End | Action |
|-------|------|-------------------|-------------|--------|
| 0 | a | 8 | 8 | extend end to 8 |
| 1 | b | 5 | 8 | end stays 8 |
| ... | ... | ... | ... | ... |
| 8 | a | 8 | 8 | i == end → cut partition size 9 |
| 9-15 | ... | ... | ... | second partition size 7 |
| 16-23 | ... | ... | ... | third partition size 8 |

The algorithm greedily expands the current partition to the farthest last occurrence of any character seen so far and cuts when the current index reaches that end.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is length of `s` | O(1) (fixed size map for 26 letters) |

## 6. Follow-Up Questions

* How would you modify the algorithm to return the actual substrings instead of their lengths?
* Can this approach be adapted for Unicode strings with many possible characters?
* What if the input string is streamed character by character?

## Key Takeaway

> Precompute each character's last occurrence. Extend the current partition's end to include all occurrences of each character within it. Split when the current index reaches the partition end.
