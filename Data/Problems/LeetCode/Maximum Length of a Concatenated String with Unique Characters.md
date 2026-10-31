# 1239. Maximum Length of a Concatenated String with Unique Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 54.0%
**LeetCode:** https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters
**Companies:** Google, Groww, Honey, Meta, Microsoft, Palo Alto Networks

---

## Problem Description

You are given an array of strings `arr`. A string `s` is formed by the **concatenation** of a **subsequence** of `arr` that has **unique characters**.

Return *the **maximum** possible length* of `s`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= arr.length <= 16`
- `1 <= arr[i].length <= 26`
- `arr[i]` contains only lowercase English letters.

## Examples

**Example 1:**
```
Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All the valid concatenations are:
- ""
- "un"
- "iq"
- "ue"
- "uniq" ("un" + "iq")
- "ique" ("iq" + "ue")
Maximum length is 4.
```

**Example 2:**
```
Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible longest valid concatenations are "chaers" ("cha" + "ers") and "acters" ("act" + "ers").
```

**Example 3:**
```
Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
Explanation: The only string in arr has all 26 characters.
```

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

## Follow-Up 

-    ");
