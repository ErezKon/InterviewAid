# 1910. Remove All Occurrences of a Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-occurrences-of-a-substring](https://leetcode.com/problems/remove-all-occurrences-of-a-substring)
**Companies:** Amazon, Arista Networks, Bloomberg, Geico, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Tcs, Twitter, Zoho

---

## Problem Description
Given a string `s` and a non‑empty substring `part`, repeatedly delete every occurrence of `part` from `s` until `s` no longer contains `part`. Return the final string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"daabcbaabcbc"`, `"abc"` | `"dab"` | Delete first `abc` → `"daabcbc"`; delete next `abc` → `"dab"`. |
| `"axxxxy"`, `"xy"` | `"axxx"` | Only the trailing `xy` is removed. |
| `"test"`, `"test"` | `""` | Whole string removed.

## Approach
**Stack‑Based Greedy** – Scan `s` character by character, pushing each onto a stack. After each push, if the top of the stack matches `part`, pop `len(part)` characters to delete the occurrence.

## Walkthrough
For `s = "daabcbaabcbc"`, `part = "abc"`:
1. Push `d a a b c` → top five form `abc` → pop them → stack `d a`.
2. Continue pushing `b a a b c b c` → when `a b c` appears at the top, pop it.
3. Final stack yields `"dab"`.

## Complexity Analysis
- **Time:** O(n · m) in the worst case where `n` = |s| and `m` = |part| (each push may compare up to `m` characters).
- **Space:** O(n) for the stack.

## Follow‑Up Questions
- How would you improve the time complexity using a rolling hash (Rabin‑Karp)?
- Can the algorithm be adapted to handle overlapping patterns?
- What changes are needed for Unicode strings?

## Key Takeaway
A stack that checks the recent characters after each push enables incremental removal of a substring in a single left‑to‑right pass.
