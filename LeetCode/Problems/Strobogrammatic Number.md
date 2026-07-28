# 246. Strobogrammatic Number

**Difficulty:** 🟢 Easy

**Companies:** Google, Meta
---
## Problem Description
Given a string `num` representing a non‑negative integer, determine if it is *strobogrammatic*: the number looks the same when rotated 180° (i.e., each digit maps to its rotated counterpart and the order reverses). Valid digit mappings are 0↔0, 1↔1, 6↔9, 8↔8, 9↔6. The string contains only digits and has length 1‑10⁵.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "69" | true | 6 becomes 9 and 9 becomes 6, order reverses → same. |
| "2"  | false| 2 has no valid rotation. |
| "818"| true | Each digit maps to itself, order unchanged. |

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
