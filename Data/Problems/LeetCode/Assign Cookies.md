# 455. Assign Cookies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/assign-cookies](https://leetcode.com/problems/assign-cookies)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Tcs, Zoho
---

## Problem Description
You are given two integer arrays `g` and `s` where `g[i]` is the greed factor of the `i`‑th child and `s[j]` is the size of the `j`‑th cookie. A child is content if they receive a cookie with size greater than or equal to their greed factor. Each cookie can be assigned to at most one child. Return the maximum number of content children.

## Examples
**Example 1:**
```
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: Only the child with greed 1 can be satisfied.
```
**Example 2:**
```
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: Give cookie 1 to child 1 and cookie 2 to child 2.
```

## Approach
Sort both arrays. Use two pointers: iterate through cookies, and whenever a cookie size meets or exceeds the current child's greed, assign it and move to the next child. This greedy strategy maximizes satisfied children.

```text
FUNCTION findContentChildren(g, s):
    SORT g
    SORT s
    SET child ← 0
    SET cookie ← 0
    WHILE child < LEN(g) AND cookie < LEN(s):
        IF s[cookie] >= g[child]:
            SET child ← child + 1
        SET cookie ← cookie + 1
    RETURN child
```

## Walkthrough
| Step | cookie size | child greed | Action | child count |
|------|-------------|-------------|--------|-------------|
|1|1|1|assign → child=1|1|
|2|1|2|cannot assign|1|
|3|2|2|assign → child=2|2|
Result = 2 content children.

## Complexity Analysis
- **Time:** O(n log n) for sorting, where n = max(|g|,|s|).
- **Space:** O(1) extra space (in‑place sort).

## Follow‑Up Questions
1. How would you handle the case where each child can receive multiple cookies?
2. Can you solve the problem without sorting, using a counting sort for bounded values?
3. What if cookies have a cost and you want to minimize total cost while satisfying maximum children?

## Key Takeaway
Sorting and a two‑pointer greedy scan yields the optimal assignment of cookies to children.
