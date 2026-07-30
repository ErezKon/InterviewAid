# 2957. Remove Adjacent Almost-Equal Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-adjacent-almost-equal-characters](https://leetcode.com/problems/remove-adjacent-almost-equal-characters)
**Companies:** Salesforce

---

## Problem Description
Given a string `s`, repeatedly delete any two adjacent characters whose ASCII codes differ by at most one. Perform deletions until no such adjacent pair exists and return the resulting string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "abccba" | "" | Delete `a`‑`b`, then `c`‑`c`, then `b`‑`a`, ending with an empty string. |
| "abc" | "a" | Delete `b`‑`c` (difference 1), left with `a`. |
| "a" | "a" | No adjacent pair to delete.

## Approach
**Two‑Pointers Greedy** – Use a stack‑like pointer to build the result. For each character, if it forms an almost‑equal pair with the previous kept character, discard both; otherwise, keep the character.

## Walkthrough
For `"abccba"`:
1. Keep `a` → result `a`.
2. Next `b`: `|a-b| = 1` → remove both → result ``.
3. Next `c`: result empty, keep `c`.
4. Next `c`: `|c-c| = 0` → remove both → result ``.
5. Next `b`: keep `b`.
6. Next `a`: `|b-a| = 1` → remove both → result `` (empty).

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(n) for the result (can be in‑place with two pointers).

## Follow‑Up Questions
- How would the solution change if the allowed difference threshold were a parameter `k`?
- Can you extend the algorithm to handle Unicode characters?
- What is the effect of processing the string from right to left?

## Key Takeaway
A stack‑like two‑pointer scan efficiently removes adjacent almost‑equal characters in a single pass.
