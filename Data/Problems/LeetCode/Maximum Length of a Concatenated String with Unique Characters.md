# 1239. Maximum Length of a Concatenated String with Unique Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters
**Companies:** Google, Groww, Honey, Meta, Microsoft, Palo Alto Networks

---

## Problem Description
Given an array of strings `arr`, concatenate a subset of them such that the resulting string contains only unique characters. Return the maximum possible length of such a concatenated string.

## Examples
- **Example 1:** `arr = ["un", "iq", "ue"]` → Output: `4` (concatenation "uniq").
- **Example 2:** `arr = ["cha", "r", "act", "ers"]` → Output: `6` ("chaers").

## Approach
**Backtracking with Bitmask — O(2ⁿ)**

```text
FUNCTION maxLength(arr):
    masks ← []
    FOR s IN arr:
        mask ← 0
        FOR ch IN s:
            bit ← 1 << (ORD(ch) - ORD('a'))
            IF mask & bit != 0:
                mask ← -1
                BREAK
            mask ← mask | bit
        IF mask != -1:
            masks.APPEND((mask, LENGTH(s)))
    RETURN backtrack(masks, 0, 0)

FUNCTION backtrack(masks, idx, currentMask):
    IF idx == LENGTH(masks):
        RETURN POPCOUNT(currentMask)
    // Skip current string
    best ← backtrack(masks, idx + 1, currentMask)
    // Include if no overlapping characters
    IF currentMask & masks[idx].mask == 0:
        best ← MAX(best, backtrack(masks, idx + 1, currentMask | masks[idx].mask))
    RETURN best
```
The bitmask encodes character presence, allowing O(1) overlap checks.

## Walkthrough
| idx | currentMask (bits) | action
---
| 0 | 0 | skip "un"
| 1 | mask("iq") | include → newMask = 0b…
| 2 | … | continue ...

## Complexity Analysis
- **Time:** O(2ⁿ) – explores all subsets of filtered strings.
- **Space:** O(n) – recursion stack and masks array.

## Follow‑Up 

-    ");
