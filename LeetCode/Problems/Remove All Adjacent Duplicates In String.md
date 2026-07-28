# 1047. Remove All Adjacent Duplicates In String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Deloitte, Fynd, Geico, Google, Grammarly, Meta, Microsoft, Oracle, Paytm, Ripple, Whatnot, Zoho

---

## Problem Description
Given a string `s` consisting of lowercase letters, repeatedly delete any two adjacent identical characters. Continue until no such pair exists and return the final string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "abbaca" | "ca" | Delete `bb` → `aaca`; delete `aa` → `ca`. |
| "azxxzy" | "ay" | Delete `xx` → `azzy`; delete `zz` → `ay`. |
| "a" | "a" | No adjacent duplicates to remove. |

## Approach
**Stack Greedy** – Iterate through characters, maintaining a stack of kept characters. If the current character equals the stack top, pop the top (removing the pair); otherwise push the character.

## Walkthrough
For `"abbaca"`:
1. Push `a` → stack `a`.
2. `b` ≠ top `a` → push → `a b`.
3. Next `b` = top `b` → pop → `a`.
4. `a` = top `a` → pop → empty.
5. `c` → push → `c`.
6. `a` ≠ top `c` → push → `c a`.
Result `"ca"`.

## Complexity Analysis
- **Time:** O(n) where n = length of `s`.
- **Space:** O(n) worst‑case for the stack (can be in‑place with two pointers).

## Follow‑Up Questions
- How to handle removal of k identical adjacent characters (generalized version)?
- Can the algorithm be adapted for Unicode strings?
- What if deletions must be performed only on the leftmost possible pair?

## Key Takeaway
A simple stack (or two‑pointer) scan removes adjacent duplicates in linear time by discarding matching pairs on the fly.
