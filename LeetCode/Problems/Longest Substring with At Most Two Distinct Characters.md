# 159. Longest Substring with At Most Two Distinct Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok

---

## 1. Problem Description

Find the longest substring containing at most 2 distinct characters.

---

## 2. Approach: Sliding Window — O(n) ✅

Special case of At Most K Distinct Characters (#340) with k=2.

```text
FUNCTION lengthOfLongestSubstringTwoDistinct(s):
    count = {}
    left = 0
    maxLen = 0
    FOR right ← 0 TO len(s) - 1:
        count[s[right]] = count.get(s[right], 0) + 1
        WHILE len(count) > 2:
            count[s[left]] = count[s[left]] - 1
            IF count[s[left]] == 0:
                DELETE count[s[left]]
            left = left + 1
        maxLen = MAX(maxLen, right - left + 1)
    RETURN maxLen
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"eceba"` | 3 | Substring `"ece"` uses only `e` and `c`.
| `"ccaabbb"` | 5 | Substring `"aabbb"` contains `a` and `b`.
| `"abc"` | 2 | Any two‑character substring is valid; longest length is 2.

---

## 4. Walkthrough

Take `s = "eceba"`.
1. Initialize `left=0`, `right=0`, `count={}`.
2. Add `e` → `{e:1}`; window length 1.
3. Add `c` → `{e:1, c:1}`; length 2.
4. Add `e` → `{e:2, c:1}`; length 3 (max).
5. Add `b` → `{e:2, c:1, b:1}` exceeds 2 distinct.
   - Shrink left: remove `e` → `{e:1, c:1, b:1}` still 3 distinct.
   - Shrink left: remove `c` → `{e:1, b:1}` now 2 distinct, `left=2`.
6. Continue adding `a` → `{e:1, b:1, a:1}` exceeds, shrink left removing `e` → `{b:1, a:1}`.
7. Max window observed remains length 3.

---

## 5. Complexity Analysis

- **Time:** O(n) – each character is processed at most twice (once by `right`, once by `left`).
- **Space:** O(1) – the hash map holds at most 2 distinct characters.

---

## 6. Follow‑Up Questions

- How would you extend this solution to the general "at most k distinct characters" problem?
- Can you solve it using an array of size 256 for ASCII characters instead of a hash map?
- What changes are needed if the constraint is "exactly k distinct characters"?

---

## Key Takeaway

> Classic sliding window with a hash map tracking character counts. Shrink left when distinct count exceeds 2. Generalizes to k distinct characters.
