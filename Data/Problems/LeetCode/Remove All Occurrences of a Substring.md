# 1910. Remove All Occurrences of a Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-all-occurrences-of-a-substring](https://leetcode.com/problems/remove-all-occurrences-of-a-substring)
**Companies:** Amazon, Arista Networks, Bloomberg, Geico, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Tcs, Twitter, Zoho

---

## Problem Description
Given two strings `s` and `part`, perform the following operation on `s` until **all** occurrences of the substring `part` are removed:

- Find the **leftmost** occurrence of the substring `part` and **remove** it from `s`.

Return `s` *after removing all occurrences of* `part`.

A **substring** is a contiguous sequence of characters in a string.

**Constraints:**

- `1 <= s.length <= 1000`
- `1 <= part.length <= 1000`
- `s` and `part` consists of lowercase English letters.

## Examples

```
Example 1:
  Input: s = "daabcbaabcbc", part = "abc"
  Output: "dab"
  Explanation: The following operations are done:
    - s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
    - s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
    - s = "dababc", remove "abc" starting at index 3, so s = "dab".
    Now s has no occurrences of "abc".
```

```
Example 2:
  Input: s = "axxxxyyyyb", part = "xy"
  Output: "ab"
  Explanation: The following operations are done:
    - s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
    - s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
    - s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
    - s = "axyb", remove "xy" starting at index 1 so s = "ab".
    Now s has no occurrences of "xy".
```

## Approach
**Stack-Based Greedy** – Scan `s` character by character, pushing each onto a stack. After each push, if the top of the stack matches `part`, pop `len(part)` characters to delete the occurrence.

## Walkthrough
For `s = "daabcbaabcbc"`, `part = "abc"`:
1. Push `d a a b c` → top five form `abc` → pop them → stack `d a`.
2. Continue pushing `b a a b c b c` → when `a b c` appears at the top, pop it.
3. Final stack yields `"dab"`.

## Complexity Analysis
- **Time:** O(n · m) in the worst case where `n` = |s| and `m` = |part| (each push may compare up to `m` characters).
- **Space:** O(n) for the stack.

## Follow-Up Questions
- How would you improve the time complexity using a rolling hash (Rabin-Karp)?
- Can the algorithm be adapted to handle overlapping patterns?
- What changes are needed for Unicode strings?

## Key Takeaway
A stack that checks the recent characters after each push enables incremental removal of a substring in a single left-to-right pass.
