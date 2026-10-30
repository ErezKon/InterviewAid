# 1047. Remove All Adjacent Duplicates In String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Deloitte, Fynd, Geico, Google, Grammarly, Meta, Microsoft, Oracle, Paytm, Ripple, Whatnot, Zoho

---

## Problem Description
You are given a string `s` consisting of lowercase English letters. A **duplicate removal** consists of choosing two **adjacent** and **equal** letters and removing them.

We repeatedly make **duplicate removals** on `s` until we no longer can.

Return *the final string after all such duplicate removals have been made*. It can be proven that the answer is **unique**.

**Constraints:**

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters.

## Examples

```
Example 1:
  Input: s = "abbaca"
  Output: "ca"
  Explanation: For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move. The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
```

```
Example 2:
  Input: s = "azxxzy"
  Output: "ay"
```

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
