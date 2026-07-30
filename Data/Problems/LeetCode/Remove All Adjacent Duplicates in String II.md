# 1209. Remove All Adjacent Duplicates in String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)
**Companies:** Agoda, Amazon, Attentive, Bloomberg, Couchbase, Disney, Factset, Goldman Sachs, Google, Grammarly, Meta, Microsoft, Morgan Stanley, Oracle, Paypal, Salesforce, Tiktok, Walmart Labs

---

## Problem Description
Given a string `s` of lowercase letters and an integer `k`, repeatedly delete any group of `k` adjacent identical characters. Continue until no such group exists and return the final string.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "deeedbbcccbdaa", k=3 | "aa" | Delete `eee` → `ddbbcccbdaa`; delete `bbb` → `ddcccbdaa`; delete `ccc` → `ddbaa`; delete `ddd` → `baa`; delete `bbb` not present; finally delete `aaa` → `aa`. |
| "pbbcggttciiippooaais", k=2 | "ps" | Remove pairs `bb`, `gg`, `tt`, `ii`, `pp`, `oo`, `aa` sequentially, leaving `ps`. |
| "abcd", k=2 | "abcd" | No group of size 2, string unchanged.

## Approach
**Stack of (char, count) Greedy** – Iterate through `s`, maintaining a stack where each entry stores a character and its consecutive count. Increment count when the same character repeats; when count reaches `k`, pop the entry to delete the group.

## Walkthrough
For `"deeedbbcccbdaa"`, k=3:
1. Push `d` (count 1).
2. Next `e`: push `e` (1).
3. Next `e`: increment count → 2.
4. Next `e`: increment count → 3 → pop `e` (delete `eee`).
5. Continue with remaining characters, applying the same rule, ultimately yielding `"aa"`.

## Complexity Analysis
- **Time:** O(n) where n = length of `s`.
- **Space:** O(n) for the stack (worst case when no deletions occur).

## Follow‑Up Questions
- How would you modify the algorithm to delete groups of size ≥ k instead of exactly k?
- Can the solution be extended to handle Unicode characters?
- What is the effect of processing the string in reverse order?

## Key Takeaway
A stack tracking character counts enables single‑pass removal of k‑sized adjacent duplicate groups.
