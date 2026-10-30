# 246. Strobogrammatic Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/strobogrammatic-number](https://leetcode.com/problems/strobogrammatic-number)
**Companies:** Google, Meta

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a string `num` which represents an integer, return `true` *if* `num` *is a **strobogrammatic number***.

A **strobogrammatic number** is a number that looks the same when rotated `180` degrees (looked at upside down).

**Constraints:**
- `1 <= num.length <= 50`
- `num` consists of only digits.
- `num` does not contain any leading zeros except for zero itself.

## Examples

**Example 1:**
```
Input: num = "69"
Output: true
```

**Example 2:**
```
Input: num = "88"
Output: true
```

**Example 3:**
```
Input: num = "962"
Output: false
```

## Approach
Use a two‑pointer scan from both ends, checking the mapping at each step.

```text
FUNCTION isStrobogrammatic(num):
    SET pairs ← {'0':'0','1':'1','6':'9','8':'8','9':'6'}
    SET lo ← 0
    SET hi ← LENGTH(num) - 1
    WHILE lo ≤ hi:
        IF num[lo] NOT IN pairs OR pairs[num[lo]] ≠ num[hi]:
            RETURN false
        SET lo ← lo + 1
        SET hi ← hi - 1
    RETURN true
```

## Walkthrough
Consider "689":

| Step | lo char | hi char | Condition | Action | lo | hi |
|------|---------|---------|-----------|--------|----|----|
| 1 | '6' | '9' | pairs['6']='9' matches hi | continue | 1 | 1 |
| 2 | '8' | '8' | pairs['8']='8' matches hi | continue | 2 | 0 |
Loop ends, return `true`.

## Complexity Analysis
- **Time:** O(n), where n is the length of `num`.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you generate all strobogrammatic numbers of length `n`?
2. Can the algorithm be adapted to handle very large numbers stored as streams?
3. What changes are needed if the input may contain leading zeros?

## Key Takeaway
A simple two‑pointer scan with a constant‑size mapping table determines strobogrammatic numbers in linear time and constant space.
