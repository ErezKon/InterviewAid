# 1209. Remove All Adjacent Duplicates in String II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii)
**Companies:** Agoda, Amazon, Attentive, Bloomberg, Couchbase, Disney, Factset, Goldman Sachs, Google, Grammarly, Meta, Microsoft, Morgan Stanley, Oracle, Paypal, Salesforce, Tiktok, Walmart Labs

---

## Problem Description
You are given a string `s` and an integer `k`, a `k` **duplicate removal** consists of choosing `k` adjacent and equal letters from `s` and removing them, causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make `k` **duplicate removals** on `s` until we no longer can.

Return *the final string after all such duplicate removals have been made*. It is guaranteed that the answer is **unique**.

**Constraints:**

- `1 <= s.length <= 10⁵`
- `2 <= k <= 10⁴`
- `s` only contains lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abcd", k = 2
  Output: "abcd"
  Explanation: There's nothing to delete.
```

```
Example 2:
  Input: s = "deeedbbcccbdaa", k = 3
  Output: "aa"
  Explanation:
    First delete "eee" and "ccc", get "ddbbbdaa"
    Then delete "bbb", get "dddaa"
    Finally delete "ddd", get "aa"
```

```
Example 3:
  Input: s = "pbbcggttciiippooaais", k = 2
  Output: "ps"
```

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
