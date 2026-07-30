# 340. Longest Substring with At Most K Distinct Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters)
**Companies:** Amazon, Appdynamics, Apple, Bitgo, Coupang, Goldman Sachs, Google, Meta, Microsoft, Oracle, Tiktok, Yandex

---

## 1. Problem Description

Given a string `s` and an integer `k`, return the length of the longest substring that contains at most `k` distinct characters.

---

## 2. Approach: Sliding Window + Hash Map — O(n) ✅

```text
FUNCTION lengthOfLongestSubstringKDistinct(s, k):
    IF k == 0: RETURN 0
    charCount = {}
    left = 0
    maxLen = 0
    FOR right ← 0 TO len(s) - 1:
        charCount[s[right]] = charCount.get(s[right], 0) + 1
        WHILE len(charCount) > k:
            charCount[s[left]] = charCount[s[left]] - 1
            IF charCount[s[left]] == 0:
                DELETE charCount[s[left]]
            left = left + 1
        maxLen = MAX(maxLen, right - left + 1)
    RETURN maxLen
```

---

## 3. Examples

| Input | k | Output | Explanation |
|-------|---|--------|-------------|
| `"eceba"` | 2 | 3 | Substring `"ece"` has 2 distinct chars.
| `"aa"` | 1 | 2 | Whole string qualifies.
| `"abc"` | 0 | 0 | No characters allowed.

---

## 4. Walkthrough

Take `s = "eceba"`, `k = 2`.
1. Expand right pointer, add `e` → `{e:1}`.
2. Add `c` → `{e:1, c:1}` (size 2 ≤ k).
3. Add `e` → `{e:2, c:1}`.
4. Add `b` → size becomes 3 > k. Shrink left: remove `e` (count 1), still size 3, remove `c` (count 0) → `{e:1, b:1}` size 2.
5. Continue expanding, max window length observed is 3 (`"ece"`).

---

## 5. Complexity Analysis

- **Time:** O(n) – each character is visited at most twice (once by right, once by left).
- **Space:** O(k) – hash map stores at most k distinct characters.

---

## Follow‑Up

- How would you modify the solution for Unicode characters where the alphabet size is large?
- Can you solve the problem in O(n) without a hash map by using an array of size 256 for ASCII?
- What changes are needed for the variant "longest substring with at most k distinct *vowels*"?

---

## Key Takeaway

> Sliding window + hash map for "at most k distinct" is a fundamental template. Expand right, shrink left when the constraint is violated, track maximum window size.
